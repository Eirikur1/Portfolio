import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TypewriterProps {
  words: string[];
  holdMs?: number;
  color?: string;
  className?: string;
}

const charVariants = {
  hidden: { opacity: 0, y: 12, filter: 'blur(4px)' },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      delay: i * 0.06,
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
  exit: { opacity: 0, transition: { duration: 0.2, ease: 'easeIn' } },
};

const underlineVariants = {
  hidden: { scaleX: 0, transformOrigin: 'left center' },
  show: { scaleX: 0, transformOrigin: 'left center' },
  exit: { scaleX: 0, transformOrigin: 'left center' },
  hover: {
    scaleX: 1,
    transformOrigin: 'left center',
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
};

export default function Typewriter({ words, holdMs = 2400, color = 'var(--color-text)', className }: TypewriterProps) {
  const [wordIndex, setWordIndex] = useState(0);

  const currentWord = words[wordIndex % words.length];

  useEffect(() => {
    const chars = currentWord.length;
    const revealTime = chars * 60 + 350;
    const timer = setTimeout(() => {
      setWordIndex((i) => (i + 1) % words.length);
    }, revealTime + holdMs);
    return () => clearTimeout(timer);
  }, [wordIndex, currentWord, holdMs, words.length]);

  return (
    <span
      aria-live="polite"
      className={className}
      style={{ display: 'inline-block', whiteSpace: 'nowrap' }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={wordIndex}
          style={{ display: 'inline-block', position: 'relative', color, cursor: 'default' }}
          initial="hidden"
          animate="show"
          exit="exit"
          whileHover="hover"
        >
          {/* Characters */}
          {currentWord.split('').map((char, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={charVariants}
              style={{ display: 'inline-block', whiteSpace: 'pre' }}
            >
              {char}
            </motion.span>
          ))}

          {/* Underline wipe */}
          <motion.span
            variants={underlineVariants}
            style={{
              position: 'absolute',
              bottom: '-4px',
              left: 0,
              width: '100%',
              height: '3px',
              background: 'var(--color-green)',
              borderRadius: '2px',
              display: 'block',
            }}
          />
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
