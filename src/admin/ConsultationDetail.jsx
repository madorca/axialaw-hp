import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { authFetch } from "../utils/api";

const statusConfig = {
  new: { label: "신규 접수", bg: "bg-blue-100", border: "border-blue-500", text: "text-blue-700" },
  reply: { label: "회신 완료", bg: "bg-amber-100", border: "border-amber-500", text: "text-amber-700" },
  ongoing: { label: "상담 진행중", bg: "bg-green-100", border: "border-green-500", text: "text-green-700" },
  closed: { label: "상담 종료", bg: "bg-slate-100", border: "border-slate-500", text: "text-slate-700" },
};

export default function ConsultationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [memo, setMemo] = useState("");
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchDetail();
  }, [id]);

  const fetchDetail = async () => {
    try {
      const res = await authFetch(`/api/consultations/${id}`);
      if (!res.ok) throw new Error("Not Found");
      const json = await res.json();
      setData(json);
      setMemo(json.memo || "");
      setStatus(json.status);
    } catch {
      console.error("Failed to fetch");
      navigate("/admin");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    setSaving(true);
    try {
      const res = await authFetch(`/api/consultations/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, memo }),
      });
      if (res.ok) {
        alert("성공적으로 저장되었습니다.");
        fetchDetail();
      }
    } catch {
      alert("오류가 발생했습니다.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("이 상담 기록을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.")) return;
    try {
      const res = await authFetch(`/api/consultations/${id}`, { method: "DELETE" });
      if (res.ok) navigate("/admin");
    } catch {
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  if (loading) return <div className="p-10 text-slate-400">데이터를 불러오는 중입니다...</div>;
  if (!data) return <div className="p-10 text-red-500">데이터를 찾을 수 없습니다.</div>;

  return (
    <div className="max-w-4xl">
      <div className="mb-8 flex items-center gap-4">
        <Link to="/admin" className="text-slate-400 hover:text-slate-800 transition">← 목록으로</Link>
        <span className="text-slate-300">/</span>
        <h1 className="text-2xl font-bold text-slate-800">상담 상세 정보</h1>
      </div>

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2 space-y-8">
          <div className="bg-white rounded-[32px] border border-slate-200 p-10 shadow-sm">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">고객 접수 내용</h3>
            <div className="grid grid-cols-2 gap-y-8 gap-x-12">
              <div>
                <label className="text-[11px] font-bold text-slate-400 uppercase block mb-2">고객성함</label>
                <div className="text-lg font-bold text-slate-800">{data.name}</div>
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-400 uppercase block mb-2">연락처</label>
                <div className="text-lg font-bold text-indigo-600 font-mono tracking-tight">{data.phone}</div>
              </div>
              <div className="col-span-2">
                <label className="text-[11px] font-bold text-slate-400 uppercase block mb-2">사건분야</label>
                <span className="px-3 py-1 rounded-lg bg-indigo-50 text-indigo-600 text-xs font-bold">{data.caseField}</span>
              </div>
              <div className="col-span-2 pt-4 border-t border-slate-100">
                <label className="text-[11px] font-bold text-slate-400 uppercase block mb-4">사건 개요</label>
                <div className="bg-slate-50 rounded-2xl p-6 text-sm leading-8 text-slate-700 whitespace-pre-wrap min-h-[160px]">
                  {data.caseOverview || "입력된 개요가 없습니다."}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[32px] border border-slate-200 p-10 shadow-sm">
             <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">내부 관리 메모</h3>
             <textarea 
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
                placeholder="상담 결과나 특이사항을 기록하세요..."
                className="w-full h-40 bg-slate-50 border border-slate-200 rounded-2xl p-6 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
             />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-[32px] border border-slate-200 p-8 shadow-sm">
            <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-6 text-center">진행 상태 변경</h3>
            <div className="space-y-3">
              {Object.entries(statusConfig).map(([key, cfg]) => (
                <button
                  key={key}
                  onClick={() => setStatus(key)}
                  className={`w-full py-4 rounded-2xl text-xs font-bold transition-all border-2 ${
                    status === key ? `${cfg.bg} ${cfg.border} ${cfg.text}` : 'bg-white border-transparent text-slate-400 hover:bg-slate-50'
                  }`}
                >
                  {cfg.label}
                </button>
              ))}
            </div>
            <div className="mt-10 space-y-3">
              <button 
                onClick={handleUpdate}
                disabled={saving}
                className="w-full py-4 rounded-full bg-indigo-600 text-white text-sm font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 active:scale-95 transition disabled:opacity-50"
              >
                {saving ? "저장 중..." : "변경 내용 저장"}
              </button>
              <button onClick={handleDelete} className="w-full py-4 rounded-full border border-red-100 text-red-500 text-sm font-medium hover:bg-red-50 transition">삭제하기</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
