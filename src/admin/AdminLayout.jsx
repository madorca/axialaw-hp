import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: "consultations", path: "/admin", icon: "📋", label: "상담 관리" },
    { id: "content", path: "/admin/content", icon: "📝", label: "컨텐츠 수정" },
  ];

  return (
    <div className="flex h-screen bg-[#f8faff] text-[#334155]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1e293b] text-white flex flex-col shadow-xl">
        <div className="p-6 border-b border-slate-700">
          <Link to="/" className="text-lg font-bold tracking-tight text-white hover:text-indigo-300 transition-colors">
             AXIA <span className="text-sm font-normal opacity-70">ADMIN</span>
          </Link>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map(item => (
            <Link 
              key={item.id}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition font-medium ${
                location.pathname === item.path || (item.id === 'consultations' && location.pathname.startsWith('/admin/consultations'))
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20" 
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <span className="text-xl">{item.icon}</span> {item.label}
            </Link>
          ))}
          
          <div className="pt-4 pb-2 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">System</div>
          <button 
            onClick={() => {
              if(confirm("로그아웃 하시겠습니까?")) {
                navigate("/");
              }
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white transition"
          >
            <span>🚪</span> 로그아웃
          </button>
        </nav>
        
        <div className="p-6 text-xs text-slate-500 border-t border-slate-800">
          AXIA Law Firm CMS v1.1
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-10 shadow-sm z-10">
          <h2 className="text-lg font-semibold text-slate-800">Operational Tool</h2>
          <div className="flex items-center gap-4">
             <div className="flex flex-col text-right">
                <span className="text-sm font-medium text-slate-700">Administrator</span>
                <span className="text-[10px] text-slate-400">Master Access</span>
             </div>
             <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold border border-indigo-200">
                A
             </div>
          </div>
        </header>
        
        <div className="flex-1 overflow-y-auto p-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
