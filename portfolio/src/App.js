import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home.jsx";
import CvDocument from "./components/CvDocument/CvDocument.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/cv-german-navarrete" element={<CvDocument />} />
      </Routes>
    </BrowserRouter>
  );
}
