import { motion, AnimatePresence } from 'framer-motion';
import { Game } from '../game-components/Game';
import '../game.css';
import styles from './GameModal.module.css';

interface GameModalProps {
  onClose: () => void;
}

export default function GameModal({ onClose }: GameModalProps) {
  return (
    <AnimatePresence>
      <motion.div
        className={styles.overlay}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      >
        <motion.div
          className={styles.panel}
          initial={{ scale: 0.98, opacity: 0, y: 12 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.98, opacity: 0, y: 12 }}
          transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.28 }}
        >
          <button
            onClick={onClose}
            className={styles.closeButton}
            aria-label="Close"
          >
            ×
          </button>
          <main className="app">
            <Game onBack={onClose} />
          </main>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
