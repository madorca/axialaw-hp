import { useState, useEffect } from "react";
import { useContent } from "../contexts/ContentContext";

export default function ContentEditor() {
  const { content: globalContent, loading: globalLoading, refreshContent } = useContent();
  const [content, setContent] = useState(null);
  const [activeTab, setActiveTab] = useState("siteInfo");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (globalContent) {
      setContent(globalContent);
    }
  }, [globalContent]);

  const handleUpdate = (section, field, value) => {
    setContent((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/content", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      if (res.ok) {
        await refreshContent();
        alert("성공적으로 저장되었습니다.");
      }
    } catch (err) {
      alert("오류가 발생했습니다.");
    } finally {
      setSaving(false);
    }
  };

  const handleUpload = async (section, field, e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        handleUpdate(section, field, data.url);
        // Special case: if it's nested (like imageOverlay) handle separately or just use flat map
      }
    } catch (err) {
      alert("업로드 중 오류가 발생했습니다.");
    }
  };

  if (globalLoading || !content) return <div className="p-10 font-bold text-slate-400">Loading Configuration...</div>;

  const tabs = [
    { id: "siteInfo", label: "사이트 설정" },
    { id: "hero", label: "히어로 섹션" },
    { id: "about", label: "로펌 소개" },
    { id: "lawyers", label: "변호사 관리" },
    { id: "footer", label: "푸터 정보" },
  ];

  const renderFields = () => {
    const sectionData = content[activeTab];
    if (!sectionData) return null;

    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
        <div className="grid gap-6">
          {Object.entries(sectionData).map(([field, value]) => {
            if (typeof value === "string") {
              const isImage = value.startsWith("http") || value.includes("/uploads/");
              return (
                <div key={field} className="grid gap-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">{field}</label>
                  {isImage ? (
                    <div className="flex items-start gap-4 p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                      <img src={value} alt={field} className="w-24 h-24 object-cover rounded-xl border border-slate-200" />
                      <div className="flex-1 space-y-3">
                        <input
                          type="text"
                          value={value}
                          onChange={(e) => handleUpdate(activeTab, field, e.target.value)}
                          className="w-full text-xs font-mono bg-white border border-slate-200 p-2 rounded-lg outline-none"
                        />
                        <input 
                          type="file" 
                          id={`file-${field}`}
                          className="hidden" 
                          onChange={(e) => handleUpload(activeTab, field, e)} 
                          accept="image/*"
                        />
                        <label 
                          htmlFor={`file-${field}`}
                          className="inline-block px-4 py-2 bg-indigo-600 text-white text-[11px] font-bold rounded-lg cursor-pointer hover:bg-indigo-700 transition shadow-md shadow-indigo-100"
                        >
                          이미지 업로드
                        </label>
                      </div>
                    </div>
                  ) : field.toLowerCase().includes("desc") || field.toLowerCase().includes("title") || field.toLowerCase().includes("body") || value.length > 50 ? (
                    <textarea
                      value={value}
                      onChange={(e) => handleUpdate(activeTab, field, e.target.value)}
                      rows={4}
                      className="w-full bg-white border border-slate-200 p-4 rounded-2xl text-sm leading-relaxed outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
                    />
                  ) : (
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => handleUpdate(activeTab, field, e.target.value)}
                      className="w-full h-12 bg-white border border-slate-200 px-4 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
                    />
                  )}
                </div>
              );
            }
            // Skip non-string values for now (arrays need special handling)
            return null;
          })}
        </div>

        {/* Special case for stats and lawyers arrays */}
        {Array.isArray(sectionData.stats) && (
          <div className="pt-6 border-t border-slate-100">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-4">통계 데이터 (Stats)</label>
            <div className="grid grid-cols-3 gap-4">
              {sectionData.stats.map((stat, idx) => (
                <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                   <input 
                    placeholder="레이블" 
                    value={stat.label} 
                    className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs outline-none" 
                    onChange={(e) => {
                      const newStats = [...sectionData.stats];
                      newStats[idx].label = e.target.value;
                      handleUpdate(activeTab, "stats", newStats);
                    }}
                  />
                   <input 
                    placeholder="값" 
                    value={stat.value} 
                    className="w-full p-2 bg-white border border-slate-200 rounded-lg text-sm font-bold outline-none" 
                    onChange={(e) => {
                      const newStats = [...sectionData.stats];
                      newStats[idx].value = e.target.value;
                      handleUpdate(activeTab, "stats", newStats);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">컨텐츠 관리 (CMS)</h1>
          <p className="text-slate-500 mt-1">홈페이지의 모든 문구와 이미지를 직접 수정하세요.</p>
        </div>
        <button
          onClick={handleSubmit}
          disabled={saving}
          className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-full shadow-lg shadow-indigo-100 hover:bg-indigo-700 active:scale-95 transition disabled:opacity-50"
        >
          {saving ? "저장 중..." : "전체 변경사항 저장"}
        </button>
      </div>

      <div className="flex gap-1 mb-8 bg-slate-100 p-1.5 rounded-[20px] w-fit border border-slate-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-2.5 rounded-2xl text-xs font-bold transition-all ${
              activeTab === tab.id ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-800"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-[32px] border border-slate-200 p-10 shadow-sm mb-10">
        {renderFields()}
      </div>
    </div>
  );
}
