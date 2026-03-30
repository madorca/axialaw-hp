/**
 * Practice - 업무분야 섹션 (CMS 연동)
 */
import { theme } from "../styles/theme";
import { useContent } from "../contexts/ContentContext";
import SectionTitle from "./SectionTitle";

export default function Practice() {
  const { content, loading } = useContent();

  if (loading || !content || !content.practiceSection) return null;

  const { practiceSection, practices } = content;

  return (
    <section id="practice" className={theme.sectionBase}>
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <SectionTitle
          eyebrow={practiceSection.eyebrow}
          title={practiceSection.title}
          centered
        />
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {(practices || []).map((item, i) => (
            <div
              key={i}
              className="group relative flex flex-col justify-end overflow-hidden rounded-[32px] bg-slate-900 aspect-square p-10 transition-transform duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-200"
            >
              {/* Overlay with subtle gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent z-10" />
              
              <div className="relative z-20">
                <h3 className="text-xl font-bold text-white mb-4 transition-colors group-hover:text-[#d8c19a]">
                    {item.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    {item.body}
                </p>
                <div className="mt-6 h-0.5 w-8 bg-[#d8c19a] transition-all duration-500 group-hover:w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
