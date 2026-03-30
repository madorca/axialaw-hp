/**
 * Premium Theme - Design Token System
 * ─────────────────────────────────────────────
 * 법무법인 레미넌트 프리미엄 테마
 * Tailwind CSS 클래스 기반 디자인 토큰
 */

// ─── 색상 팔레트 (원본 HEX) ────────────────
export const colors = {
  // Primary - Navy
  navy900: "#18263f",
  navy800: "#1c2b45",
  navy700: "#223454",
  navy600: "#314057",
  navy500: "#435065",
  navy400: "#516070",

  // Neutral - Warm Gray
  warmGray900: "#5d6778",
  warmGray800: "#5f6979",
  warmGray700: "#667180",
  warmGray600: "#687387",
  warmGray500: "#6f7988",
  warmGray400: "#9aa1ad",

  // Gold Accent
  gold600: "#b08a4a",
  gold500: "#cbb68a",
  gold400: "#d8c19a",

  // Background
  bgPrimary: "#f7f5f0",
  bgSecondary: "#f1ede6",
  bgCard: "#ffffff",
  bgCardAlt: "#f9f7f2",
  bgChip: "#f7f3eb",
  bgHover: "#f2ece0",
  bgConsent: "#faf7f2",

  // Border
  borderPrimary: "#ddd6cb",
  borderSecondary: "#d9d1c4",
  borderInput: "#d7d0c5",
  borderChip: "#d8d0c2",
  borderConsent: "#e3ddd3",
};

// ─── Tailwind 클래스 기반 테마 토큰 ────────
export const theme = {
  // 페이지
  page: "bg-[#f7f5f0] text-[#18263f]",

  // 헤더
  header: "border-[#d9d1c4] bg-[#f7f5f0]/92",
  nav: "text-[#5d6778] hover:text-[#18263f]",
  brandSub: "text-[#687387]",

  // 텍스트
  gold: "text-[#b08a4a]",
  title: "text-[#18263f]",
  body: "text-[#5f6979]",
  bodyStrong: "text-[#435065]",

  // 섹션 배경
  sectionAlt: "bg-[#f1ede6]",
  sectionBase: "bg-[#f7f5f0]",

  // 카드
  card: "bg-white border-[#ddd6cb]",
  cardAlt: "bg-[#f9f7f2] border-[#ddd6cb]",

  // 칩/태그
  chip: "text-[#314057] border-[#d8d0c2] bg-[#f7f3eb]",

  // 버튼
  buttonPrimary: "bg-[#1c2b45] text-white hover:bg-[#223454]",
  buttonSecondary:
    "border border-[#cbb68a] text-[#1c2b45] hover:bg-[#f2ece0]",

  // 인풋
  input:
    "border-[#d7d0c5] bg-white text-[#18263f] placeholder:text-[#9aa1ad]",

  // 이미지 오버레이
  imageOverlay:
    "bg-gradient-to-t from-[#18263f]/45 via-[#18263f]/10 to-transparent",

  // 구분선
  divider: "border-[#ddd6cb]",
};
