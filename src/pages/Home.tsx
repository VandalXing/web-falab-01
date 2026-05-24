import Hero from '@/sections/Hero';
import FABasics from '@/sections/FABasics';
import CaseStudies from '@/sections/CaseStudies';
import LessonLearning from '@/sections/LessonLearning';
import SRAMReference from '@/sections/SRAMReference';

export default function Home() {
  return (
    <>
      <Hero />
      <FABasics />
      <CaseStudies />
      <LessonLearning />
      <SRAMReference />
    </>
  );
}
