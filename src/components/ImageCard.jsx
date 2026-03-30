/**
 * ImageCard - 이미지 + 오버레이 카드 컴포넌트
 */
import { theme } from "../styles/theme";

export default function ImageCard({
  src,
  alt,
  className = "",
  overlay = true,
  children,
  overlayClass,
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover"
      />
      {overlay ? (
        <div
          className={`absolute inset-0 ${overlayClass || theme.imageOverlay}`}
        />
      ) : null}
      {children ? (
        <div className="relative z-10 h-full">{children}</div>
      ) : null}
    </div>
  );
}
