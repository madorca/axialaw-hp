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
import ConsultationList from "./admin/ConsultationList";
import ConsultationDetail from "./admin/ConsultationDetail";
import ContentEditor from "./admin/ContentEditor";
import { ContentProvider } from "./contexts/ContentContext";

function Home() {
  return (
    <div className={`min-h-screen ${theme.page}`}>
      <Header />
      <main>
        <Hero />
        <About />
        <Lawyers />
        <Strength />
        <Practice />
        <Cases />
        <Consult />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ContentProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<ConsultationList />} />
            <Route path="consultations/:id" element={<ConsultationDetail />} />
            <Route path="content" element={<ContentEditor />} />
          </Route>
        </Routes>
      </Router>
    </ContentProvider>
  );
}
