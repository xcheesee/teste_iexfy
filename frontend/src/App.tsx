import { BrowserRouter as Router, Routes, Route } from "react-router";
import NotFound from "./pages/OtherPage/NotFound";
import OportunidadePage from "./pages/Tables/OportunidadePage";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import { FeedbackModal } from "./components/ui/modal/FeedbackModal";

export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route element={<AppLayout />}>
            <Route index path="/" element={<Home />} />
            <Route path="/oportunidades" element={<OportunidadePage />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <FeedbackModal />
    </>
  );
}
