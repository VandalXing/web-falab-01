import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import LabManagement from './sections/LabManagement';
import Equipment from './sections/Equipment';
import FunctionsCases from './sections/FunctionsCases';
import SRAMReference from './sections/SRAMReference';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

export default function App() {
  return (
    <div className="min-h-[100dvh] bg-[#0a0e17]">
      <Navigation />
      <main>
        <Hero />
        <LabManagement />
        <Equipment />
        <FunctionsCases />
        <SRAMReference />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
