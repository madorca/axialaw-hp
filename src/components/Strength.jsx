/**
 * Strength - 엑시아의 기준 섹션 (CMS 연동)
 */
import { theme } from "../styles/theme";
import { useContent } from "../contexts/ContentContext";
import SectionTitle from "./SectionTitle";

export default function Strength() {
  const { content, loading } = useContent();

  if (loading || !content || !content.strengthSection) return null;

  const { strengthSection, strengths } = content;

  return (
    <section id="strength" className={`border-b ${theme.divider} ${theme.sectionAlt}`}>
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <SectionTitle
          eyebrow={strengthSection.eyebrow}
          title={strengthSection.title}
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {(strengths || []).map((item, i) => (
            <div
              key={i}
              className="rounded-[28px] border border-[#ddd6cb] bg-white p-8 shadow-[0_20px_60px_rgba(24,38,63,0.06)] lg:p-10 transition hover:shadow-xl hover:border-[#d8c19a]"
            >
              <div className={`text-sm font-bold ${theme.gold}`}>{item.no}</div>
              <h3
                className={`mt-6 text-2xl font-semibold leading-tight tracking-[-0.03em] ${theme.title}`}
              >
                {item.title}
              </h3>
              <p className={`mt-6 text-sm leading-8 ${theme.body}`}>
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
