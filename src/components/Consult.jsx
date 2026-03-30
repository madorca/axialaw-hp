/**
 * Consult - 상담문의 섹션
 */
import { useState } from "react";
import { theme } from "../styles/theme";
import { useContent } from "../contexts/ContentContext";
import SectionTitle from "./SectionTitle";

export default function Consult() {
  const { content, loading } = useContent();
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    caseField: "조세",
    caseOverview: "",
    privacyConsent: false
  });

  if (loading || !content) return null;

  const { consultSection } = content;
  const { form } = consultSection;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert("이름과 연락처는 필수입니다.");
      return;
    }
    if (!formData.privacyConsent) {
      alert("개인정보 수집 및 이용에 동의해 주세요.");
      return;
    }

    setLoadingSubmit(true);
    setError("");

    try {
      const response = await fetch("/api/consultations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("서버 오류가 발생했습니다.");
      
      setSubmitted(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingSubmit(false);
    }
  };

  if (submitted) {
    return (
      <section id="consult" className={`py-24 text-center ${theme.sectionBase}`}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="rounded-[40px] bg-white p-16 shadow-xl">
            <div className={`text-4xl mb-6 ${theme.gold}`}>✓</div>
            <h2 className={`text-3xl font-semibold mb-4 ${theme.title}`}>상담 요청이 접수되었습니다</h2>
            <p className={theme.body}>검토 후 기재해주신 연락처로 곧 연락드리겠습니다. 감사합니다.</p>
            <button 
              onClick={() => setSubmitted(false)}
              className={`mt-10 rounded-full px-8 py-3 ${theme.buttonPrimary}`}
            >
              확인
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="consult" className={theme.sectionBase}>
      <div className="mx-auto grid max-w-7xl gap-14 px-6 py-24 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div>
          <SectionTitle
            eyebrow={consultSection.eyebrow}
            title={consultSection.title}
            body={consultSection.description}
          />
          <div className="mt-8 space-y-3 text-sm text-[#435065]">
            {consultSection.steps.map((step, idx) => (
              <div key={idx}>• {step}</div>
            ))}
          </div>
        </div>

        <div className="rounded-[32px] border border-[#ddd6cb] bg-white p-8 shadow-[0_25px_70px_rgba(24,38,63,0.08)] sm:p-10">
          <form onSubmit={handleSubmit} className="grid gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className={`grid gap-2 text-sm ${theme.body}`}>
                {form.nameLabel}
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="rounded-2xl border border-[#d7d0c5] bg-white px-4 py-3 text-[#18263f] outline-none placeholder:text-[#9aa1ad]"
                  placeholder={form.namePlaceholder}
                  required
                />
              </label>
              <label className={`grid gap-2 text-sm ${theme.body}`}>
                {form.phoneLabel}
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="rounded-2xl border border-[#d7d0c5] bg-white px-4 py-3 text-[#18263f] outline-none placeholder:text-[#9aa1ad]"
                  placeholder={form.phonePlaceholder}
                  required
                />
              </label>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className={`grid gap-2 text-sm ${theme.body}`}>
                {form.emailLabel}
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="rounded-2xl border border-[#d7d0c5] bg-white px-4 py-3 text-[#18263f] outline-none placeholder:text-[#9aa1ad]"
                  placeholder={form.emailPlaceholder}
                />
              </label>
              <label className={`grid gap-2 text-sm ${theme.body}`}>
                {form.caseFieldLabel}
                <select 
                  name="caseField"
                  value={formData.caseField}
                  onChange={handleChange}
                  className="rounded-2xl border border-[#d7d0c5] bg-white px-4 py-3 text-[#18263f] outline-none"
                >
                  {form.caseFieldOptions.map((opt) => (
                    <option key={opt} value={opt} className="bg-white">
                      {opt}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label className={`grid gap-2 pt-2 text-sm ${theme.body}`}>
              {form.caseOverviewLabel}
              <textarea
                name="caseOverview"
                value={formData.caseOverview}
                onChange={handleChange}
                rows={6}
                className="rounded-[24px] border border-[#d7d0c5] bg-white px-4 py-3 text-[#18263f] outline-none placeholder:text-[#9aa1ad]"
                placeholder={form.caseOverviewPlaceholder}
              />
            </label>

            <label className="mt-2 flex items-start gap-3 rounded-2xl border border-[#e3ddd3] bg-[#faf7f2] p-4 text-sm text-[#5f6979]">
              <input
                name="privacyConsent"
                type="checkbox"
                checked={formData.privacyConsent}
                onChange={handleChange}
                className="mt-1 h-4 w-4 rounded border-[#d7d0c5] bg-transparent"
              />
              <span>{form.privacyConsent}</span>
            </label>

            {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

            <button
              disabled={loadingSubmit}
              className={`mt-4 rounded-full px-7 py-3.5 text-sm font-medium transition ${theme.buttonPrimary} ${loadingSubmit ? 'opacity-50' : ''}`}
            >
              {loadingSubmit ? "처리 중..." : form.submitLabel}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
