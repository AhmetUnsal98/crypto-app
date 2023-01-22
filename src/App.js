import { BrowserRouter, Routes, Route } from "react-router-dom";
import CoinDetailPage from "./pages/CoinDetailPage";
import HomePage from "./pages/HomePage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:id" element={<CoinDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
