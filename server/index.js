/**
 * Express API Server
 * ─────────────────────────────────────
 * - 상담 요청 CRUD + 상태 관리
 * - CMS 컨텐츠 읽기/수정 API
 * - 이미지 업로드
 * - Admin 인증
 *
 * 실행: node server/index.js
 * 포트: 3001 (Vite dev는 3000, proxy로 연결)
 */

import express from "express";
import cors from "cors";
import { randomUUID } from "crypto";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { getContent, updateContent, getConsultations, getConsultation, createConsultation, updateConsultation, deleteConsultation } from "./db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
/* eslint-disable no-undef */
const JWT_SECRET = process.env?.JWT_SECRET || "axia-admin-secret-key-2024";
const ADMIN_ID = process.env?.ADMIN_ID || "admin";
const ADMIN_PASSWORD_HASH = bcrypt.hashSync(process.env?.ADMIN_PASSWORD || "axia2026", 10);
/* eslint-enable no-undef */

// ─── Middleware ─────────────────────────────
app.use(cors());
app.use(express.json());

// ─── Auth Middleware ───────────────────────
function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "인증이 필요합니다." });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded;
    next();
  } catch {
    return res.status(401).json({ error: "유효하지 않은 토큰입니다." });
  }
}

// ─── Vercel & DB 파일 경로 ──────────────────────────
const isVercel = process.env.VERCEL === "1";
const DB_DIR = isVercel ? "/tmp/data" : path.join(__dirname, "data");
const CONSULTATIONS_FILE = path.join(DB_DIR, "consultations.json");
const CONTENT_FILE = path.join(DB_DIR, "content.json");

// ─── 데이터 유지용 (Vercel에서는 읽기 전용 저장소에서 초깃값 로드용) ──
const STATIC_CONTENT_FILE = path.join(__dirname, "data", "content.json");
const STATIC_CONSULTATIONS_FILE = path.join(__dirname, "data", "consultations.json");

// Vercel 환경일 때 초기 데이터 복사
if (isVercel) {
  if (!fs.existsSync(DB_DIR)) fs.mkdirSync(DB_DIR, { recursive: true });
  if (!fs.existsSync(CONTENT_FILE) && fs.existsSync(STATIC_CONTENT_FILE)) {
    fs.copyFileSync(STATIC_CONTENT_FILE, CONTENT_FILE);
  }
  if (!fs.existsSync(CONSULTATIONS_FILE) && fs.existsSync(STATIC_CONSULTATIONS_FILE)) {
    fs.copyFileSync(STATIC_CONSULTATIONS_FILE, CONSULTATIONS_FILE);
  }
}

// ─── 이미지 업로드 설정 ─────────────────────
const UPLOAD_DIR = isVercel ? "/tmp/uploads" : path.join(__dirname, "..", "public", "uploads");
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = `${Date.now()}-${randomUUID().slice(0, 8)}${ext}`;
    cb(null, name);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("이미지 파일만 업로드 가능합니다."));
    }
  },
});

// ─── 이미지 목록 API ─────────────────────────
app.get("/api/uploads", authenticate, (req, res) => {
  const files = fs.readdirSync(UPLOAD_DIR).filter(f => {
    const ext = path.extname(f).toLowerCase();
    return [".jpg", ".jpeg", ".png", ".gif", ".webp"].includes(ext);
  });
  res.json(files.map(f => ({
    name: f,
    url: `/uploads/${f}`,
    uploadedAt: fs.statSync(path.join(UPLOAD_DIR, f)).mtime.toISOString(),
  })));
});

// ─── 이미지 삭제 API ─────────────────────────
app.delete("/api/uploads/:filename", authenticate, (req, res) => {
  const filePath = path.join(UPLOAD_DIR, req.params.filename);
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "파일을 찾을 수 없습니다." });
  }
  fs.unlinkSync(filePath);
  res.json({ success: true });
});

// ─── DB 디렉터리 생성 ───────────────────────
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

// ─── 유틸: JSON 파일 읽기/쓰기 ─────────────
function readJSON(filePath, fallback = []) {
  try {
    if (!fs.existsSync(filePath)) return fallback;
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  } catch {
    return fallback;
  }
}

function writeJSON(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}

// ─── 초기 컨텐츠 시드 (content.json 없으면 생성) ──
function seedContentIfNeeded() {
  if (fs.existsSync(CONTENT_FILE)) return;

  const defaultContent = {
    siteInfo: {
      brandEn: "AXIA",
      brandKo: "법무법인엑시아",
      tagline: "조세 · 형사 · 민사 분야에서 전략적 대응을 제공하는 분쟁 중심 로펌.",
      seoTitle: "법무법인엑시아 | AXIA Law Firm",
      seoDesc: "조세심판, 조세소송, 형사재판 및 기업법무 전문 법무법인 엑시아입니다.",
    },
    navigation: [
      { label: "로펌소개", href: "#about" },
      { label: "구성원", href: "#lawyers" },
      { label: "업무분야", href: "#practice" },
      { label: "주요사례", href: "#cases" },
      { label: "상담문의", href: "#consult" },
    ],
    headerCta: { label: "상담 예약", href: "#consult" },
    hero: {
      eyebrow: "TAX · CRIMINAL · CIVIL",
      titleLine1: "분쟁 해결의",
      titleLine2: "기준이 되는 로펌",
      subtitleStrong: "조세·형사·민사 분야의 경험을 바탕으로\n사건의 구조를 먼저 정리합니다.",
      subtitleNormal: "의뢰인의 상황에 맞는 전략을 설계하고,\n실제 해결로 이어지는 대응 방향을 제시합니다.",
      ctaPrimary: { label: "상담 문의하기", href: "#consult" },
      ctaSecondary: { label: "대표변호사 보기", href: "#lawyers" },
      image: { src: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=1600&q=80", alt: "Premium law office" },
      imageOverlay: { eyebrow: "PREMIUM COUNSEL", line1: "절제된 전략과 명확한 판단으로", line2: "사건의 방향을 설계합니다" },
    },
    about: {
      eyebrow: "ABOUT AXIA",
      title: "절제된 전략과 명확한 판단으로\n사건의 방향을 설계합니다",
      image: { src: "https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=1200&q=80", alt: "Meeting" },
      paragraphs: [
        "대표변호사 중심의 사건 운영을 원칙으로 합니다.\n초기 단계에서 핵심 쟁점과 우선순위를 먼저 정리합니다.",
        "조세 · 형사 · 민사 이슈를 통합적으로 검토해\n필요한 대응의 순서를 명확히 설정합니다.",
        "복잡한 분쟁일수록 많은 설명보다 정확한 구조화가 중요합니다.\n의뢰인이 현재 위치와 다음 대응을 분명히 이해할 수 있도록 사건을 정리하고 전략을 제시합니다.",
      ],
    },
    lawyersSection: { eyebrow: "REPRESENTATIVE LAWYERS", title: "대표변호사", description: "엑시아는 대표변호사 2인이 사건의 핵심 전략을 직접 설계하고, 분쟁의 구조를 끝까지 점검합니다." },
    lawyers: [
      { name: "이경호", role: "대표변호사", field: "조세", desc: "세무조사 대응, 조세 소송, 조세 형사 사건 등 조세 분쟁 전반을 중심으로 전략적 대응을 수행합니다.", focus: ["세무조사 대응", "조세 소송", "조세 형사 사건"], image: { src: "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80", alt: "변호사 이경호" } },
      { name: "김정삼", role: "대표변호사", field: "형사 · 민사", desc: "형사 사건과 민사 분쟁을 중심으로 사실관계와 절차적 리스크를 정리하고 실질적인 해결 전략을 설계합니다.", focus: ["형사 사건 대응", "경제범죄", "민사 분쟁"], image: { src: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80", alt: "변호사 김정삼" } },
    ],
    strengthSection: { eyebrow: "WHY AXIA", title: "엑시아의 기준" },
    strengths: [
      { no: "01", title: "대표변호사 직접 설계", body: "사건의 방향은 초기 전략에서 결정됩니다. 엑시아는 대표변호사가 사건의 핵심 구조를 직접 검토하고 대응 방향을 설계합니다." },
      { no: "02", title: "조세 · 형사 · 민사 통합 검토", body: "복합 분쟁은 단일 분야만으로 설명되지 않습니다. 엑시아는 조세, 형사, 민사 이슈를 유기적으로 연결해 사건 전체를 분석합니다." },
      { no: "03", title: "절제된 전략, 명확한 대응", body: "과도한 수사보다 쟁점 정리와 실행 가능한 전략을 우선합니다. 필요한 대응을 정확하게 제시하는 것이 엑시아의 방식입니다." },
    ],
    practiceSection: { eyebrow: "PRACTICE AREAS", title: "업무분야", description: "조세, 형사, 민사 분야를 중심으로 사건의 성격과 절차적 리스크를 고려한 대응 전략을 제공합니다." },
    practices: [
      { title: "조세", lawyer: "이경호 대표변호사", body: "세무조사 대응부터 조세 불복, 조세 소송, 조세 형사 사건까지 조세 분쟁 전반에 대한 정교한 대응을 제공합니다.", items: ["세무조사 대응", "조세 불복", "조세 소송", "조세 형사 사건"], image: { src: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80", alt: "조세 업무" } },
      { title: "형사", lawyer: "김정삼 대표변호사", body: "수사 초기 대응, 고소·고발, 경제범죄, 기업 형사 사건 등 형사 절차 전반에 대한 전략적 대응을 수행합니다.", items: ["수사 대응", "고소·고발", "경제범죄", "기업 형사 사건"], image: { src: "https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?auto=format&fit=crop&w=1200&q=80", alt: "형사 업무" } },
      { title: "민사", lawyer: "김정삼 대표변호사", body: "계약 분쟁, 손해배상, 부동산 분쟁, 기업 분쟁 등 주요 민사 사건에서 실질적인 해결 방향을 제시합니다.", items: ["손해배상", "계약 분쟁", "부동산 분쟁", "기업 분쟁"], image: { src: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80", alt: "민사 업무" } },
    ],
    caseSection: { eyebrow: "CASE EXPERIENCE", title: "주요 수행 영역", description: "실제 사건은 비밀유지 원칙에 따라 공개 가능한 범위에서만 소개됩니다." },
    cases: [
      { id: "case-tax", title: "세무조사 대응 및 조세 불복 사건", category: "조세", summary: "납세자에 대한 세무조사를 앞두고, 초기 대응부터 심사, 불복 절차까지 체계적인 전략을 수립하여 최선의 결과를 이끌어냈습니다.", description: "세무조사는 단순히 세금 문제를 넘어 기업의 신뢰와 생존에 직결되는 중요한 사안입니다.\n\n1. 조사 대상 및 범위 파악\n2. 핵심 쟁점 선별 및 대응 전략 수립\n3. 자료 제출 및 소명 준비\n4. 심사·불복 절차 진행", points: ["세무조사 전 초기 컨설팅", "조사 대응 전략 수립", "심사청구 및 조세불복소송", "체납·압류 대응"], result: "고객의 부담을 최소화하면서도 적법한 절차를 통해 최선의 결과를 달성", image: { src: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80", alt: "세무조사" } },
      { id: "case-criminal", title: "기업 관련 형사 사건 대응", category: "형사", summary: "기업 경영자가 수사 단계에서부터 변호사 선임과 함께 적절한 대응을 함으로써, 불기소 처분을 이끌어낸 사례입니다.", description: "기업 관련 형사 사건은 단순한 개인의 문제가 아니라 기업 전체의 존속과 이해관계자에게 영향을 미칩니다.\n\n1. 사실관계 조사 및 증거 분석\n2. 핵심 방어 선 정리\n3. 공정조사 대응\n4. 처벌 최소화 전략 수립", points: ["수사 단계 조기 대응", "보석 신청 및 법정 대응", "불기소·기소 유예 획득", "기업 정상화 지원"], result: "불기소 처분 달성 및 기업 경영 정상화", image: { src: "https://images.unsplash.com/photo-1453945619913-79ec89a82c51?auto=format&fit=crop&w=1200&q=80", alt: "기업 형사" } },
      { id: "case-civil", title: "계약 분쟁 및 손해배상 사건", category: "민사", summary: "복잡한 계약 관계에서 당사자 간 분쟁을 조정 및 소송을 통해 합리적으로 해결한 사례입니다.", description: "계약 분쟁의 핵심은 계약서의 해석과 사실관계의 입증에 있습니다.\n\n1. 계약서 및 관련 서류 분석\n2. 사실관계 조사 및 증거 수집\n3. 쟁점 정리 및 소송 전략 수립\n4. 협상·조정·소송 진행", points: ["계약 위반 사실관계 분석", "손해액 산정 및 입증", "협상 및 조정 진행", "민사소송 수행"], result: "고객에게 유리한 판결 및 손해배상액 확보", image: { src: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80", alt: "계약 분쟁" } },
      { id: "case-realestate", title: "부동산 관련 민사 분쟁", category: "민사", summary: "부동산 매매 및 개발 과정에서의 분쟁을 효율적으로 해결하여 고객의 부동산 권익을 보호한 사례입니다.", description: "부동산 분쟁은 그 가치와 복잡성으로 인해 신중한 접근이 필요합니다.\n\n1. 부동산 권리관계 분석\n2. 등기 및 규제 검토\n3. 분쟁 유형별 전략 수립\n4. 매매·개발 관련 분쟁 해결", points: ["부동산 매매 분쟁", "임대차 분쟁", "개발사업 관련 분쟁", "공유물 분할 소송"], result: "부동산 권리 보호 및 분쟁 원활한 해결", image: { src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80", alt: "부동산 분쟁" } },
    ],
    consultSection: {
      eyebrow: "CONSULTATION",
      title: "사건의 방향을 먼저 정리하고\n전화 상담으로 이어집니다",
      description: "온라인으로 기본 내용을 남겨주시면 검토 후 전화로 연락드립니다. 사건 분야와 현재 상황을 간단히 남겨주시면, 상담 이전에 핵심 쟁점을 빠르게 확인할 수 있습니다.",
      steps: ["온라인 상담 접수 후 검토", "담당 변호사 또는 실무진 전화 회신", "조세 / 형사 / 민사 사건 우선 분류"],
      form: {
        nameLabel: "이름", namePlaceholder: "성함을 입력해 주세요",
        phoneLabel: "연락처", phonePlaceholder: "연락 가능한 번호",
        emailLabel: "이메일", emailPlaceholder: "선택 입력",
        caseFieldLabel: "사건 분야", caseFieldOptions: ["조세", "형사", "민사", "기타"],
        caseOverviewLabel: "사건 개요", caseOverviewPlaceholder: "사건 개요와 현재 상황을 간단히 작성해 주세요",
        privacyConsent: "개인정보 수집 및 이용에 동의합니다. 상담 검토 및 회신 목적으로만 사용됩니다.",
        submitLabel: "상담 요청 보내기",
      },
    },
    footer: {
      brandEn: "AXIA", brandKo: "법무법인엑시아", description: "조세 · 형사 · 민사 분야에서 전략적 대응을 제공하는 분쟁 중심 로펌.",
      lawyersTitle: "대표변호사", lawyersList: ["이경호 (조세)", "김정삼 (형사 · 민사)"],
      contactTitle: "Contact", address: "서울특별시 강남구 논현로 340 2층 203호",
      phone: "대표전화 02-6205-4620", email: "contact@axialaw.co.kr",
      copyright: "© 2025 법무법인엑시아. All rights reserved.",
    },
  };
  writeJSON(CONTENT_FILE, defaultContent);
}
seedContentIfNeeded();

// ═══════════════════════════════════════════
// 인증 API
// ═══════════════════════════════════════════

app.post("/api/auth/login", async (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ error: "아이디와 비밀번호를 입력해주세요." });
  }
  
  if (username !== ADMIN_ID || !bcrypt.compareSync(password, ADMIN_PASSWORD_HASH)) {
    return res.status(401).json({ error: "아이디 또는 비밀번호가 올바르지 않습니다." });
  }
  
  const token = jwt.sign({ username, role: "admin" }, JWT_SECRET, { expiresIn: "24h" });
  res.json({ success: true, token });
});

app.get("/api/auth/verify", authenticate, (req, res) => {
  res.json({ success: true, user: req.admin });
});

// ═══════════════════════════════════════════
// 상담 요청 API (인증 필요)
// ═══════════════════════════════════════════

// POST /api/consultations — 새 상담 요청 (프론트 폼 제출)
app.post("/api/consultations", (req, res) => {
  const { name, phone, email, caseField, caseOverview, privacyConsent } =
    req.body;

  if (!name || !phone) {
    return res.status(400).json({ error: "이름과 연락처는 필수입니다." });
  }

  const consultation = {
    id: randomUUID(),
    name,
    phone,
    email: email || "",
    caseField: caseField || "기타",
    caseOverview: caseOverview || "",
    privacyConsent: !!privacyConsent,
    status: "new",
    memo: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  createConsultation(consultation);
  res.status(201).json({ success: true, data: consultation });
});

// GET /api/consultations — 전체 목록 (어드민용)
app.get("/api/consultations", authenticate, (req, res) => {
  const consultations = getConsultations();
  const { status } = req.query;

  if (status && status !== "all") {
    return res.json(consultations.filter((c) => c.status === status));
  }

  res.json(consultations);
});

// GET /api/consultations/:id — 단건 조회
app.get("/api/consultations/:id", authenticate, (req, res) => {
  const item = getConsultation(req.params.id);
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json(item);
});

// PATCH /api/consultations/:id — 상태/메모 수정
app.patch("/api/consultations/:id", authenticate, (req, res) => {
  const updated = updateConsultation(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: "Not found" });
  res.json({ success: true, data: updated });
});

// DELETE /api/consultations/:id — 삭제
app.delete("/api/consultations/:id", authenticate, (req, res) => {
  deleteConsultation(req.params.id);
  res.json({ success: true });
});

// GET /api/consultations/stats/summary — 상태별 카운트
app.get("/api/consultations/stats/summary", authenticate, (req, res) => {
  const consultations = getConsultations();
  const stats = { total: consultations.length, new: 0, reply: 0, ongoing: 0, closed: 0 };
  for (const c of consultations) {
    if (stats[c.status] !== undefined) stats[c.status]++;
  }
  res.json(stats);
});

// ═══════════════════════════════════════════
// CMS 컨텐츠 API
// ═══════════════════════════════════════════

// GET /api/content — 전체 컨텐츠 읽기
app.get("/api/content", (req, res) => {
  const content = getContent();
  res.json(content || {});
});

// PATCH /api/content — 컨텐츠 부분 수정 (인증 필요)
app.patch("/api/content", authenticate, (req, res) => {
  // Deep merge
  for (const [section, values] of Object.entries(req.body)) {
    if (typeof values === "object" && !Array.isArray(values)) {
      updateContent(section, values);
    }
  }
  const content = getContent();
  res.json({ success: true, data: content });
});

// POST /api/upload — 이미지 업로드 (인증 필요)
app.post("/api/upload", authenticate, upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "파일이 없습니다." });
  }
  res.json({
    success: true,
    url: `/uploads/${req.file.filename}`,
    filename: req.file.filename,
  });
});

// ─── 프로덕션: 정적 파일 서빙 ─────────────
const possiblePaths = [
  path.resolve(__dirname, "..", "dist"),
  path.resolve(__dirname, "..", "..", "dist"),
  path.resolve(__dirname, "..", "..", "..", "dist"),
  path.resolve(process.cwd(), "dist"),
  path.resolve(process.cwd(), "..", "dist"),
];
let distPath = "";
for (const p of possiblePaths) {
  if (fs.existsSync(p)) {
    distPath = p;
    break;
  }
}
if (distPath) {
  app.use(express.static(distPath));
  app.use((req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

// Vercel 환경에서 /tmp/uploads 정적 파일 서빙
if (isVercel) {
  app.use("/uploads", express.static("/tmp/uploads"));
}

// ─── 서버 시작 ─────────────────────────────
if (!isVercel) {
  app.listen(PORT, () => {
    console.log(`\n  🏛️  AXIA CMS API Server`);
    console.log(`  ─────────────────────────`);
    console.log(`  API:   http://localhost:${PORT}/api`);
    console.log(`  Admin: http://localhost:3000/admin (dev)`);
    console.log(`         http://localhost:${PORT}/admin (prod)\n`);
  });
}

export default app;
