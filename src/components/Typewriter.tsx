import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TypewriterProps {
  words: string[];
  typingSpeed?: number;
  holdMs?: number;
  color?: string;
  className?: string;
}

const SWEEP_EASE: [number, number, number, number] = [0.2, 0, 0.3, 0.3];
const FADE_MS = 250;

const gradient = `
  linear-gradient(in oklch 90deg,
    #f6e8dd 0%, #f6e8dd 30%,
    #dc3c24 38%,
    #e6bf98 46%,
    #5182bc 54%,
    #f6e8dd 60%,
    #193564 66%, #193564 100%
  )
`;

type Phase = 'typing' | 'holding' | 'fading';

export default function Typewriter({ words, typingSpeed = 80, holdMs = 2000, color = 'var(--color-text)', className }: TypewriterProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [phase, setPhase] = useState<Phase>('typing');
  const timer = useRef<number | null>(null);

  const currentWord = words[wordIndex % words.length] ?? '';

  // Clear timer helper
  const clear = () => { if (timer.current) window.clearTimeout(timer.current); };

  useEffect(() => {
    clear();

    if (phase === 'typing') {
      if (displayed.length < currentWord.length) {
        timer.current = window.setTimeout(() => {
          setDisplayed(currentWord.slice(0, displayed.length + 1));
        }, typingSpeed);
      } else {
        timer.current = window.setTimeout(() => setPhase('holding'), holdMs);
      }
    } else if (phase === 'holding') {
      timer.current = window.setTimeout(() => setPhase('fading'), 100);
    } else if (phase === 'fading') {
      timer.current = window.setTimeout(() => {
        setDisplayed('');
        setWordIndex((i) => (i + 1) % words.length);
        setPhase('typing');
      }, FADE_MS + 80);
    }

    return clear;
  }, [phase, displayed, currentWord, typingSpeed, holdMs, words.length]);

  // Sweep duration tracks how long typing takes
  const sweepDuration = (currentWord.length * typingSpeed) / 1000 + 0.2;

  return (
    <span
      aria-live="polite"
      className={className}
      style={{ position: 'relative', display: 'inline-block', whiteSpace: 'nowrap' }}
    >
      {/* Underlay: typed text in normal colour, fades out */}
      <AnimatePresence mode="wait">
        <motion.span
          key={`under-${wordIndex}`}
          style={{ color }}
          initial={{ opacity: 0 }}
          animate={{ opacity: phase === 'fading' ? 0 : 1 }}
          transition={
            phase === 'fading'
              ? { duration: FADE_MS / 1000, ease: 'easeOut' }
              : { duration: 0.05 }
          }
        >
          {displayed}
          {/* Blinking cursor while typing */}
          {phase === 'typing' && (
            <motion.span
              style={{
                display: 'inline-block',
                width: '3px',
                height: '0.8em',
                background: 'var(--color-green)',
                borderRadius: '2px',
                marginLeft: '4px',
                verticalAlign: 'middle',
              }}
              animate={{ opacity: [1, 1, 0, 0] }}
              transition={{ duration: 0.9, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
            />
          )}
        </motion.span>
      </AnimatePresence>

      {/* Overlay: gradient sweep plays once per word as it types */}
      <AnimatePresence>
        {phase === 'typing' && (
          <motion.span
            key={`sweep-${wordIndex}`}
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: '-0.30em',
              bottom: '-0.30em',
              paddingTop: '0.30em',
              paddingBottom: '0.30em',
              lineHeight: 'inherit',
              pointerEvents: 'none',
              backgroundOrigin: 'padding-box',
              backgroundImage: gradient,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              color: 'transparent',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '400% 100%',
              willChange: 'background-position, opacity',
            } as React.CSSProperties}
            initial={{ backgroundPositionX: '100%', opacity: 1 }}
            animate={{ backgroundPositionX: '0%', opacity: [1, 1, 0] }}
            transition={{
              backgroundPositionX: { duration: sweepDuration, ease: SWEEP_EASE },
              opacity: { duration: sweepDuration, times: [0, 0.9, 1], ease: 'linear' },
            }}
          >
            {displayed}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
