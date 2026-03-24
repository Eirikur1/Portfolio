import { motion, AnimatePresence } from 'framer-motion';
import { Game } from '../game-components/Game';
import '../game.css';

interface GameModalProps {
  onClose: () => void;
}

export default function GameModal({ onClose }: GameModalProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(3, 15, 35, 0.92)',
          zIndex: 9998,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
        }}
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.4 }}
          style={{
            background: '#0d2147',
            borderRadius: '16px',
            border: '1px solid rgba(246,232,221,0.1)',
            width: '100%',
            maxWidth: '900px',
            maxHeight: '90vh',
            overflowY: 'auto',
            position: 'relative',
          }}
        >
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '12px',
              right: '16px',
              background: 'none',
              border: 'none',
              color: 'rgba(246,232,221,0.4)',
              fontSize: '22px',
              cursor: 'pointer',
              zIndex: 10,
              lineHeight: 1,
            }}
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
