import "./App.css";
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import WatchHistory from "./pages/WatchHistory";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* / means base url */}
        <Route path="/home" element={<Home />} />
        <Route path="/watch-history" element={<WatchHistory />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
