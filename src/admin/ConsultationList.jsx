import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { authFetch } from "../utils/api";

export default function ConsultationList() {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [stats, setStats] = useState({ total: 0, new: 0, reply: 0, ongoing: 0, closed: 0 });

  useEffect(() => {
    fetchData();
  }, [filter]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const listRes = await authFetch(`/api/consultations${filter !== 'all' ? `?status=${filter}` : ''}`);
      const listData = await listRes.json();
      setConsultations(listData);

      const statsRes = await authFetch("/api/consultations/stats/summary");
      const statsData = await statsRes.json();
      setStats(statsData);
    } catch (err) {
      console.error("데이터 로딩 중 오류:", err);
    } finally {
      setLoading(false);
    }
  };

  const statusLabel = {
    new: { label: "신규", color: "bg-blue-100 text-blue-700" },
    reply: { label: "회신완료", color: "bg-yellow-100 text-yellow-700" },
    ongoing: { label: "상담중", color: "bg-green-100 text-green-700" },
    closed: { label: "종료", color: "bg-slate-100 text-slate-600" }
  };

  return (
    <div className="max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">상담 요청 관리</h1>
          <p className="text-slate-500 mt-1">홈페이지를 통해 접수된 고객 상담 목록입니다.</p>
        </div>
        <button 
           onClick={fetchData} 
           className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition shadow-sm"
        >
          🔄 새로고침
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-5 gap-6 mb-10">
        {[
          { key: "all", label: "전체", count: stats.total, color: "slate" },
          { key: "new", label: "신규", count: stats.new, color: "blue" },
          { key: "reply", label: "회신완료", count: stats.reply, color: "amber" },
          { key: "ongoing", label: "상담중", count: stats.ongoing, color: "green" },
          { key: "closed", label: "종료", count: stats.closed, color: "gray" },
        ].map(item => (
          <button 
            key={item.key}
            onClick={() => setFilter(item.key)}
            className={`p-5 rounded-2xl border transition-all text-left group ${
              filter === item.key 
                ? 'border-indigo-500 bg-indigo-50 ring-2 ring-indigo-500/20' 
                : 'border-slate-200 bg-white hover:border-slate-300 shadow-sm'
              }`}
          >
            <div className={`text-xs font-bold uppercase tracking-widest mb-2 ${
              filter === item.key ? 'text-indigo-600' : 'text-slate-400'
            }`}>
              {item.label}
            </div>
            <div className={`text-3xl font-bold ${
              filter === item.key ? 'text-indigo-700' : 'text-slate-800'
            }`}>
              {item.count}
            </div>
          </button>
        ))}
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-[28px] border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-200">
              <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">일시</th>
              <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">고객정보</th>
              <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">분야</th>
              <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">상태</th>
              <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">상세보기</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr>
                <td colSpan="5" className="px-8 py-20 text-center text-slate-400">데이터를 불러오는 중입니다...</td>
              </tr>
            ) : consultations.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-8 py-20 text-center text-slate-400">접수된 상담 내역이 없습니다.</td>
              </tr>
            ) : (
              consultations.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="text-sm font-medium text-slate-800">
                      {new Date(c.createdAt).toLocaleDateString('ko-KR')}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">
                      {new Date(c.createdAt).toLocaleTimeString('ko-KR', { hour12: false, hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="text-sm font-bold text-slate-800">{c.name}</div>
                    <div className="text-xs text-slate-500 mt-1">{c.phone}</div>
                  </td>
                  <td className="px-8 py-6 text-sm font-medium text-slate-600">
                    {c.caseField}
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1.5 rounded-full text-[11px] font-bold ${statusLabel[c.status].color}`}>
                      {statusLabel[c.status].label}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <Link 
                      to={`/admin/consultations/${c.id}`}
                      className="inline-flex h-9 px-4 items-center justify-center bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 hover:bg-indigo-600 hover:border-indigo-600 hover:text-white transition shadow-sm"
                    >
                      상세보기 →
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
