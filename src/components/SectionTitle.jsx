/**
 * SectionTitle - 섹션 공통 제목 컴포넌트
 */
import { theme } from "../styles/theme";

export default function SectionTitle({ eyebrow, title, body, className = "" }) {
  const lines = String(title).split("\n");
  return (
    <div className={className}>
      <div className={`text-xs tracking-[0.12em] ${theme.gold}`}>{eyebrow}</div>
      <h2
        className={`mt-5 text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-[1.2] tracking-[-0.02em] ${theme.title}`}
      >
        {lines.map((line, idx) => (
          <span key={`${line}-${idx}`} className="block">
            {line}
          </span>
        ))}
      </h2>
      {body ? (
        <p className={`mt-5 max-w-2xl text-base leading-8 ${theme.body}`}>
          {body}
        </p>
      ) : null}
    </div>
  );
}
