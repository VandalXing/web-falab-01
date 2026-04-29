import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import FABasics from './sections/FABasics';
import CoreTools from './sections/CoreTools';
import CaseStudies from './sections/CaseStudies';
import LessonLearning from './sections/LessonLearning';
import SRAMReference from './sections/SRAMReference';
import Footer from './sections/Footer';

export default function App() {
  return (
    <div className="min-h-[100dvh] bg-[#0a0e17]">
      <Navigation />
      <main>
        <Hero />
        <FABasics />
        <CoreTools />
        <CaseStudies />
        <LessonLearning />
        <SRAMReference />
      </main>
      <Footer />
    </div>
  );
}
