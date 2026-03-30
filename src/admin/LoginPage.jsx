import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "로그인에 실패했습니다.");
      }

      login(data.token);
      navigate("/admin");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 mb-6">
            <span className="text-3xl">🏛️</span>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">AXIA</h1>
          <p className="text-indigo-300/80 text-sm mt-2">Admin Panel</p>
        </div>

        <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-10 shadow-2xl">
          <h2 className="text-xl font-bold text-white mb-8 text-center">로그인</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-medium text-indigo-300/80 uppercase tracking-wider mb-3">
                아이디
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-indigo-300/50 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition"
                placeholder="아이디를 입력하세요"
                required
                autoComplete="username"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-indigo-300/80 uppercase tracking-wider mb-3">
                비밀번호
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-indigo-300/50 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition"
                placeholder="비밀번호를 입력하세요"
                required
                autoComplete="current-password"
              />
            </div>

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-300 text-sm text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-600/50 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-500/25 active:scale-[0.98]"
            >
              {loading ? "로그인 중..." : "로그인"}
            </button>
          </form>
        </div>

        <p className="text-center text-indigo-300/40 text-xs mt-8">
          © 2025 법무법인엑시아
        </p>
      </div>
    </div>
  );
}
