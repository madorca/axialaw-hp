/**
 * Lawyers - 구성원 섹션 (CMS 연동)
 */
import { theme } from "../styles/theme";
import { useContent } from "../contexts/ContentContext";
import SectionTitle from "./SectionTitle";

export default function Lawyers() {
  const { content, loading } = useContent();

  if (loading || !content || !content.lawyers) return null;

  const { lawyers } = content;

  return (
    <section id="lawyers" className={theme.sectionBase}>
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <SectionTitle eyebrow={lawyers.eyebrow} title={lawyers.title} centered />
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
          {lawyers.members.map((member) => (
            <div key={member.id} className="group relative flex flex-col md:flex-row overflow-hidden rounded-[32px] bg-white border border-[#e3ddd3] p-8 shadow-sm transition-all hover:shadow-xl hover:border-[#d8c19a]">
              <div className="w-full md:w-1/3 aspect-[4/5] relative overflow-hidden rounded-2xl">
                <img src={member.image} alt={member.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
              </div>
              <div className="flex-1 mt-6 md:mt-0 md:ml-8 flex flex-col justify-center">
                <div className="text-xs font-bold text-[#b09a76] tracking-widest uppercase mb-1">{member.specialty}</div>
                <h3 className={`text-2xl font-bold ${theme.title}`}>{member.name} {member.role}</h3>
                <p className={`mt-4 text-sm leading-relaxed ${theme.body}`}>{member.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
