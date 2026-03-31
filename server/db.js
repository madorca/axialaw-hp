import Database from "better-sqlite3";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, "data.db");
const db = new Database(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS content (
    id INTEGER PRIMARY KEY,
    data TEXT NOT NULL,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS consultations (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    caseField TEXT,
    caseOverview TEXT,
    privacyConsent INTEGER DEFAULT 0,
    status TEXT DEFAULT 'new',
    memo TEXT DEFAULT '',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

const contentPath = path.join(__dirname, "data", "content.json");
if (fs.existsSync(contentPath)) {
  const content = JSON.parse(fs.readFileSync(contentPath, "utf-8"));
  const existing = db.prepare("SELECT id FROM content WHERE id = 1").get();
  if (!existing) {
    db.prepare("INSERT INTO content (id, data) VALUES (1, ?)").run(JSON.stringify(content));
    console.log("✅ Content migrated to SQLite");
  }
}

const consultPath = path.join(__dirname, "data", "consultations.json");
if (fs.existsSync(consultPath)) {
  const consultations = JSON.parse(fs.readFileSync(consultPath, "utf-8"));
  const insert = db.prepare(`
    INSERT OR REPLACE INTO consultations (id, name, phone, email, caseField, caseOverview, privacyConsent, status, memo, created_at, updated_at)
    VALUES (@id, @name, @phone, @email, @caseField, @caseOverview, @privacyConsent, @status, @memo, @createdAt, @updatedAt)
  `);
  for (const c of consultations) {
    insert.run({ ...c, privacyConsent: c.privacyConsent ? 1 : 0 });
  }
  console.log(`✅ ${consultations.length} consultations migrated to SQLite`);
}

export function getContent() {
  const row = db.prepare("SELECT data FROM content WHERE id = 1").get();
  return row ? JSON.parse(row.data) : null;
}

export function updateContent(section, data) {
  const current = getContent();
  current[section] = data;
  db.prepare("UPDATE content SET data = ?, updated_at = CURRENT_TIMESTAMP WHERE id = 1").run(JSON.stringify(current));
  return { success: true, data: current };
}

export function getConsultations() {
  return db.prepare("SELECT * FROM consultations ORDER BY created_at DESC").all();
}

export function getConsultation(id) {
  return db.prepare("SELECT * FROM consultations WHERE id = ?").get(id);
}

export function createConsultation(data) {
  const stmt = db.prepare(`
    INSERT INTO consultations (id, name, phone, email, caseField, caseOverview, privacyConsent, status, memo, created_at, updated_at)
    VALUES (@id, @name, @phone, @email, @caseField, @caseOverview, @privacyConsent, @status, @memo, @createdAt, @updatedAt)
  `);
  stmt.run({ ...data, privacyConsent: data.privacyConsent ? 1 : 0, status: "new", memo: "" });
  return data;
}

export function updateConsultation(id, data) {
  const fields = [];
  const values = { id };
  for (const [key, value] of Object.entries(data)) {
    if (key !== "id") {
      fields.push(`${key} = @${key}`);
      values[key] = value;
    }
  }
  fields.push("updated_at = CURRENT_TIMESTAMP");
  db.prepare(`UPDATE consultations SET ${fields.join(", ")} WHERE id = @id`).run(values);
  return getConsultation(id);
}

export function deleteConsultation(id) {
  db.prepare("DELETE FROM consultations WHERE id = ?").run(id);
  return { success: true };
}

export default db;