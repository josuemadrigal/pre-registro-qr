import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PreRegistroForm from "./pages/PreRegistroForm";
import QrScanner from "./pages/QrScanner";

function App() {

  return (
    <Router>
      <div>
        <div className="fixed top-0 w-full z-10">
        </div>
        <Routes>
          <Route path="/" element={<PreRegistroForm />} />
          <Route path="/qr" element={<QrScanner />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
