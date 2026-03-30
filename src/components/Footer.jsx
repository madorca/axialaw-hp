/**
 * Footer - 푸터 섹션 (CMS 연동)
 */
import { theme } from "../styles/theme";
import { useContent } from "../contexts/ContentContext";

export default function Footer() {
  const { content, loading } = useContent();

  if (loading || !content) return null;

  const { siteInfo, footer, lawyers } = content;

  return (
    <footer className="bg-[#18263f] pt-20 pb-10 text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-3">
          <div>
             <div className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
               {siteInfo.brandEn} <span className="text-xs font-normal text-[#d8c19a]">{siteInfo.brandKo}</span>
             </div>
             <p className="mt-6 text-sm leading-relaxed text-[#8a94a6] max-w-xs">
                {siteInfo.tagline}
             </p>
          </div>
          <div className="lg:col-span-2 grid gap-10 sm:grid-cols-3">
             <div className="flex flex-col">
                <div className="text-xs font-bold uppercase tracking-widest text-[#d8c19a] mb-6">Expertise</div>
                <ul className="space-y-4 text-sm text-[#8a94a6]">
                   <li><a href="#" className="hover:text-white transition">조세 포탈 및 소송</a></li>
                   <li><a href="#" className="hover:text-white transition">기업 형사 및 강력 범죄</a></li>
                   <li><a href="#" className="hover:text-white transition">상속 · 증여 · 가사</a></li>
                   <li><a href="#" className="hover:text-white transition">민사 및 분쟁 해결</a></li>
                </ul>
             </div>
             <div className="flex flex-col">
                <div className="text-xs font-bold uppercase tracking-widest text-[#d8c19a] mb-6">Contact</div>
                <div className="space-y-4 text-sm text-[#8a94a6]">
                   <div>{footer.address}</div>
                   <div className="font-bold text-white text-base">{footer.phone}</div>
                   <div>{footer.email}</div>
                </div>
             </div>
             <div className="flex flex-col">
                <div className="text-xs font-bold uppercase tracking-widest text-[#d8c19a] mb-6">Partners</div>
                <div className="space-y-3 text-sm text-[#8a94a6]">
                   {lawyers.members.map(m => (
                      <div key={m.id}>{m.name} 변호사</div>
                   ))}
                </div>
             </div>
          </div>
        </div>
        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#5f6979]">
           <div>{footer.copyright}</div>
           <div className="flex gap-6">
              <a href="#" className="hover:text-white transition underline decoration-white/10 underline-offset-4">개인정보처리방침</a>
              <a href="#" className="hover:text-white transition">법적고지</a>
           </div>
        </div>
      </div>
    </footer>
  );
}
