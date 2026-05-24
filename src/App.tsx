import { Routes, Route } from 'react-router';
import Navigation from './sections/Navigation';
import Footer from './sections/Footer';
import Home from './pages/Home';
import ToolsOverview from './pages/ToolsOverview';
import ToolDetail from './pages/ToolDetail';
import SubTechDetail from './pages/SubTechDetail';
import ResolutionCalc from './pages/ResolutionCalc';
import Cases from './pages/Cases';
import Fundamentals from './pages/Fundamentals';
import BestPractices from './pages/BestPractices';
import ResolutionCenter from './pages/ResolutionCenter';
import SlantedEdgeMTF from './pages/SlantedEdgeMTF';
import ResolutionCalculator from './pages/ResolutionCalculator';

export default function App() {
  return (
    <div className="min-h-[100dvh] bg-[#0a0e17]">
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tools" element={<ToolsOverview />} />
        <Route path="/tools/:toolId" element={<ToolDetail />} />
        <Route path="/subtech/:subTechId" element={<SubTechDetail />} />
        <Route path="/resolution" element={<ResolutionCalc />} />
        <Route path="/resolution-center" element={<ResolutionCenter />} />
        <Route path="/resolution-center/mtf" element={<SlantedEdgeMTF />} />
        <Route path="/resolution-center/calculator" element={<ResolutionCalculator />} />
        <Route path="/cases" element={<Cases />} />
        <Route path="/fundamentals" element={<Fundamentals />} />
        <Route path="/best-practices" element={<BestPractices />} />
      </Routes>
      <Footer />
    </div>
  );
}
