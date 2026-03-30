/**
 * About - 로펌 소개 섹션 (CMS 연동)
 */
import { theme } from "../styles/theme";
import { useContent } from "../contexts/ContentContext";
import SectionTitle from "./SectionTitle";
import ImageCard from "./ImageCard";

export default function About() {
  const { content, loading } = useContent();

  if (loading || !content || !content.about) return null;

  const { about } = content;

  return (
    <section id="about" className={theme.sectionBase}>
      <div className="mx-auto grid max-w-7xl gap-14 px-6 py-24 lg:grid-cols-2 lg:px-8">
        <ImageCard 
            src={about.image} 
            className="rounded-[40px] shadow-2xl min-h-[500px]"
        />
        <div className="flex flex-col justify-center">
          <SectionTitle 
            eyebrow={about.eyebrow} 
            title={about.title} 
            body={about.description} 
          />
          <div className="mt-12 grid grid-cols-3 gap-6">
            {about.stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col">
                <div className={`text-4xl font-bold tracking-tight mb-2 ${theme.title}`}>
                  {stat.value}
                </div>
                <div className="text-xs font-semibold text-[#8a94a6] uppercase tracking-widest leading-relaxed">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
