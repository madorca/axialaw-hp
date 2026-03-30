/**
 * Cases - 주요사례 섹션 (CMS 연동)
 */
import { theme } from "../styles/theme";
import { useContent } from "../contexts/ContentContext";
import SectionTitle from "./SectionTitle";

export default function Cases() {
  const { content, loading } = useContent();

  if (loading || !content || !content.casesSection) return null;

  const { casesSection, cases } = content;

  return (
    <section id="cases" className={`bg-[#faf9f6] py-24 ${theme.sectionBase}`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionTitle
          eyebrow={casesSection.eyebrow}
          title={casesSection.title}
          centered
        />
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {(cases || []).map((item, i) => (
            <div key={i} className="flex flex-col bg-white border border-[#e3ddd3] rounded-[32px] p-8 shadow-sm transition hover:shadow-md hover:border-[#d8c19a]">
               <div className="text-[10px] font-bold text-[#b09a76] tracking-[0.2em] uppercase mb-4 opacity-70">Case Result: {item.result}</div>
               <div className="inline-block bg-[#f4f1ea] text-[#8d7a5b] text-[10px] font-bold px-2.5 py-1 rounded-md mb-6 w-fit">{item.category}</div>
               <h4 className={`text-lg font-bold leading-relaxed flex-grow ${theme.title}`}>
                  {item.title}
               </h4>
               <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400">자세히 보기</span>
                   <span className="text-indigo-400 text-lg">→</span>
               </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
