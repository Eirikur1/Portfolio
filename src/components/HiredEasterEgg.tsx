import { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';

interface Props {
  onGameTrigger?: () => void;
}

export default function HiredEasterEgg({ onGameTrigger }: Props) {
  const [show, setShow] = useState(false);
  const buffer = useRef('');

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      buffer.current = (buffer.current + e.key).slice(-6).toLowerCase();

      if (buffer.current.includes('hired')) {
        setShow(true);
        confetti({
          particleCount: 200,
          spread: 120,
          origin: { y: 0.5 },
          colors: ['#dc3c24', '#e6bf98', '#f6e8dd', '#5182bc', '#4ade80'],
        });
        setTimeout(() => setShow(false), 4000);
        buffer.current = '';
      }

      if (buffer.current.includes('game')) {
        buffer.current = '';
        onGameTrigger?.();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onGameTrigger]);

  if (!show) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          background: 'var(--color-surface)',
          border: '3px solid var(--color-green)',
          boxShadow: '6px 6px 0px var(--color-green)',
          borderRadius: '16px',
          padding: '32px 48px',
          textAlign: 'center',
          fontFamily: 'var(--font-heading)',
          animation: 'popIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div style={{ fontSize: '48px', marginBottom: '8px' }}>🎉</div>
        <div style={{ fontSize: '28px', fontWeight: 900, color: 'var(--color-green)' }}>
          You hired me!
        </div>
        <div style={{ fontSize: '14px', color: 'var(--color-muted)', marginTop: '8px' }}>
          Great choice.
        </div>
      </div>
      <style>{`
        @keyframes popIn {
          from { transform: scale(0.5); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
