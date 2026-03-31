/**
 * Hero - 메인 히어로 섹션 (Premium 테마 + CMS 연동)
 */
import { theme } from "../styles/theme";
import { useContent } from "../contexts/ContentContext";
import ImageCard from "./ImageCard";

export default function Hero() {
  const { content, loading } = useContent();

  if (loading || !content || !content.hero) {
    return (
        <section className="bg-[#f7f5f0] h-[600px] flex items-center justify-center">
            <div className="animate-pulse text-slate-300">Loading...</div>
        </section>
    );
  }

  const { hero } = content;

  return (
    <section className="border-b border-[#ddd6cb] bg-[#f7f5f0]">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:py-28">
        <div className="flex flex-col justify-center">
          <div className={`text-xs tracking-[0.12em] font-bold ${theme.gold}`}>
            {hero.eyebrow}
          </div>
          <h1 className={`mt-8 text-[clamp(2.5rem,5vw,4rem)] font-semibold leading-[1.1] tracking-[-0.02em] ${theme.title}`}>
            <span className="block">{hero.titleLine1}</span>
            <span className="block">{hero.titleLine2}</span>
          </h1>
          <div className={`mt-10 max-w-3xl space-y-4 ${theme.body}`}>
            <p className="text-base font-medium leading-7 tracking-[-0.01em] text-[#314057] whitespace-pre-wrap">
              {hero.subtitleStrong}
            </p>
            <p className="max-w-2xl text-base leading-7 tracking-[-0.01em] text-[#667180] whitespace-pre-wrap">
              {hero.subtitleNormal}
            </p>
          </div>
          <div className="mt-14 flex flex-col gap-4 sm:flex-row">
            <button
               onClick={() => document.getElementById('consult')?.scrollIntoView({ behavior: 'smooth' })}
               className={`rounded-full px-7 py-3.5 text-center text-sm font-medium transition ${theme.buttonPrimary}`}
            >
              {hero.ctaPrimaryLabel}
            </button>
            <button
               onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
               className={`rounded-full px-7 py-3.5 text-center text-sm font-medium transition ${theme.buttonSecondary}`}
            >
              {hero.ctaSecondaryLabel}
            </button>
          </div>
        </div>

        <ImageCard
          src={hero.image}
          alt={hero.titleLine1}
          className="min-h-[420px] rounded-[36px] border border-[#ddd6cb] shadow-[0_30px_80px_rgba(24,38,63,0.08)] overflow-hidden"
          overlayClass={theme.imageOverlay}
        >
          <div className="flex h-full items-end p-8 sm:p-10">
            <div>
              <div className="text-sm text-[#d8c19a]">
                {hero.imageOverlay.eyebrow}
              </div>
              <div className="mt-3 max-w-md text-[28px] font-semibold leading-[1.2] tracking-[-0.03em] text-white">
                <span className="block">{hero.imageOverlay.line1}</span>
                <span className="block">{hero.imageOverlay.line2}</span>
              </div>
            </div>
          </div>
        </ImageCard>
      </div>
    </section>
  );
}
