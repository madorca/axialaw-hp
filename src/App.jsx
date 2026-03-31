import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { theme } from "./styles/theme";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Lawyers from "./components/Lawyers";
import Strength from "./components/Strength";
import Practice from "./components/Practice";
import Cases from "./components/Cases";
import Consult from "./components/Consult";
import Footer from "./components/Footer";
import AdminLayout from "./admin/AdminLayout";
import LoginPage from "./admin/LoginPage";
import ConsultationList from "./admin/ConsultationList";
import ConsultationDetail from "./admin/ConsultationDetail";
import ContentEditor from "./admin/ContentEditor";
import { ContentProvider } from "./contexts/ContentContext";
import { AuthProvider } from "./contexts/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <ContentProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<LoginPage />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<ConsultationList />} />
              <Route path="consultations/:id" element={<ConsultationDetail />} />
              <Route path="content" element={<ContentEditor />} />
            </Route>
          </Routes>
        </Router>
      </ContentProvider>
    </AuthProvider>
  );
}
