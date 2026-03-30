/**
 * Header - 상단 헤더 섹션 (CMS 연동)
 */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { theme } from "../styles/theme";
import { useContent } from "../contexts/ContentContext";

export default function Header() {
  const { content, loading } = useContent();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (loading || !content) return null;

  const { siteInfo } = content;

  const navigateTo = (targetId) => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { label: "로펌소개", id: "about" },
    { label: "구성원", id: "lawyers" },
    { label: "업무분야", id: "practice" },
    { label: "주요사례", id: "cases" },
    { label: "상담문의", id: "consult" },
  ];

  return (
    <header className={`fixed top-0 z-50 w-full transition-all duration-300 ${isScrolled ? "bg-white/95 backdrop-blur-md shadow-md py-4" : "bg-transparent py-6"}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8">
        <div className="flex shrink-0 items-center">
          <Link to="/" className="text-xl font-bold tracking-tight flex items-baseline gap-2 group">
            <span className={`${isScrolled ? "text-[#18263f]" : "text-[#18263f]"} group-hover:text-indigo-600 transition-colors`}>{siteInfo.brandEn}</span>
            <span className={`text-[11px] font-normal tracking-normal transition-colors ${isScrolled ? "text-[#b09a76]" : "text-[#b09a76]"} group-hover:text-indigo-400`}>{siteInfo.brandKo}</span>
          </Link>
        </div>
        <nav className="hidden items-center gap-10 lg:flex">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => navigateTo(item.id)}
              className={`text-[13px] font-semibold transition-colors hover:text-indigo-600 ${isScrolled ? 'text-[#18263f]' : 'text-[#18263f]'}`}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-5">
           <Link to="/admin" className="text-[10px] font-bold text-slate-400 hover:text-indigo-500 tracking-tighter transition opacity-50 uppercase">Master</Link>
           <button 
              onClick={() => navigateTo('consult')}
              className={`rounded-full px-6 py-2.5 text-xs font-bold transition shadow-sm ${theme.buttonPrimary}`}
           >
             상담 예약
           </button>
        </div>
      </div>
    </header>
  );
}
