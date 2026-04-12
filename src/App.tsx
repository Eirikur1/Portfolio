import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, type Variants } from 'framer-motion';
import Lenis from 'lenis';
import Navigation from './components/Navigation';
import HiredEasterEgg from './components/HiredEasterEgg';
import GameModal from './components/GameModal';
import Home from './pages/Home';
import Projects from './pages/Projects';
import About from './pages/About';

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const pageVariants: Variants = {
  initial: { opacity: 0, y: 16 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.25, ease: 'easeIn' } },
};

function AppInner() {
  const location = useLocation();
  const [gameOpen, setGameOpen] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const id = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <Navigation />
      <HiredEasterEgg onGameTrigger={() => setGameOpen(true)} />
      {gameOpen && <GameModal onClose={() => setGameOpen(false)} />}
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          variants={pageVariants}
          initial="initial"
          animate="enter"
          exit="exit"
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects onNameTripleClick={() => setGameOpen(true)} />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  );
}
