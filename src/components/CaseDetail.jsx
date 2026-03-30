import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { theme } from "../styles/theme";

export default function CaseDetail() {
  const { id } = useParams();
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/content")
      .then((res) => res.json())
      .then((data) => {
        setCases(data.cases || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f7f5f0] flex items-center justify-center">
        <div className="text-slate-400">로딩 중...</div>
      </div>
    );
  }

  const currentIndex = cases.findIndex((c) => c.id === id);
  const caseData = cases[currentIndex];
  const prevCase = currentIndex > 0 ? cases[currentIndex - 1] : null;
  const nextCase = currentIndex < cases.length - 1 ? cases[currentIndex + 1] : null;

  if (!caseData) {
    return (
      <div className="min-h-screen bg-[#f7f5f0] flex flex-col items-center justify-center">
        <div className="text-slate-400 mb-4">사건을 찾을 수 없습니다.</div>
        <Link to="/#cases" className={`px-6 py-3 rounded-full text-sm font-medium ${theme.buttonPrimary}`}>
          목록으로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f5f0]">
      <div className="relative h-[50vh] min-h-[400px]">
        <img
          src={caseData.image.src}
          alt={caseData.image.alt}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#18263f]/80 via-[#18263f]/40 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-6 pb-12 w-full lg:px-8">
            <div className="flex items-center gap-4 mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${theme.gold} bg-[#18263f]/50`}>
                {caseData.category}
              </span>
              <span className="text-white/60 text-sm">
                Case {currentIndex + 1} / {cases.length}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-semibold text-white tracking-[-0.02em]">
              {caseData.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 lg:px-8">
        <div className="grid lg:grid-cols-[1fr,340px] gap-16">
          <div>
            <div className="mb-10">
              <p className="text-lg text-[#314057] leading-relaxed whitespace-pre-line">
                {caseData.summary}
              </p>
            </div>

            <div className="prose prose-lg max-w-none">
              <h2 className={`text-xl font-semibold mb-4 ${theme.title}`}>사건 개요</h2>
              <div className={`text-[#5f6979] leading-8 whitespace-pre-line ${theme.body}`}>
                {caseData.description}
              </div>
            </div>

            <div className="mt-12 pt-10 border-t border-[#ddd6cb]">
              <h2 className={`text-xl font-semibold mb-6 ${theme.title}`}>수행 내용</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {caseData.points.map((point, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className={`mt-1 w-2 h-2 rounded-full shrink-0 ${theme.gold.replace("text-", "bg-")}`} />
                    <span className={`${theme.body}`}>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 p-8 rounded-[24px] bg-white border border-[#ddd6cb]">
              <div className={`text-xs font-medium ${theme.gold} uppercase tracking-wider mb-3`}>결과</div>
              <p className={`text-lg ${theme.bodyStrong}`}>{caseData.result}</p>
            </div>
          </div>

          <div className="lg:sticky lg:top-8 h-fit">
            <div className="bg-white rounded-[24px] border border-[#ddd6cb] p-8">
              <h3 className={`text-lg font-semibold mb-6 ${theme.title}`}>상담 문의</h3>
              <p className={`text-sm leading-7 mb-6 ${theme.body}`}>
                유사한 사건에 대한 상담이 필요하시면 언제든지 문의해 주세요.
              </p>
              <Link
                to="/#consult"
                className={`block w-full text-center py-4 rounded-full font-medium transition ${theme.buttonPrimary}`}
              >
                상담 신청하기
              </Link>
              <div className="mt-6 pt-6 border-t border-[#ddd6cb]">
                <div className={`text-xs ${theme.gold} uppercase tracking-wider mb-2`}>Contact</div>
                <div className={`text-sm ${theme.body}`}>
                  <div>전화: 02-6205-4620</div>
                  <div className="mt-1">이메일: contact@axialaw.co.kr</div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Link
                to="/#cases"
                className={`flex items-center gap-2 text-sm ${theme.body} hover:${theme.title} transition`}
              >
                <span>←</span>
                <span>사례 목록으로</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-10 border-t border-[#ddd6cb]">
          <div className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-6">다른 사례 보기</div>
          <div className="grid sm:grid-cols-2 gap-6">
            {prevCase && (
              <Link
                to={`/cases/${prevCase.id}`}
                className="group flex items-center gap-4 p-6 rounded-[20px] bg-white border border-[#ddd6cb] hover:border-[#cbb68a] transition"
              >
                <span className={`text-sm ${theme.gold}`}>←</span>
                <div>
                  <div className={`text-xs ${theme.gold} mb-1`}>{prevCase.category}</div>
                  <div className={`font-medium group-hover:${theme.gold} transition ${theme.title}`}>
                    {prevCase.title}
                  </div>
                </div>
              </Link>
            )}
            {nextCase && (
              <Link
                to={`/cases/${nextCase.id}`}
                className="group flex items-center justify-end gap-4 p-6 rounded-[20px] bg-white border border-[#ddd6cb] hover:border-[#cbb68a] transition text-right"
              >
                <div>
                  <div className={`text-xs ${theme.gold} mb-1`}>{nextCase.category}</div>
                  <div className={`font-medium group-hover:${theme.gold} transition ${theme.title}`}>
                    {nextCase.title}
                  </div>
                </div>
                <span className={`text-sm ${theme.gold}`}>→</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
