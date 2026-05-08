import { useEffect, useRef } from 'react';
import styles from './Cursor.module.css';

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const innerRefs = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    document.documentElement.classList.add('customCursor');

    innerRefs.current = Array.from(cursor.querySelectorAll<HTMLElement>(`.${styles.inner}`));
    innerRefs.current.forEach(el => { el.style.transformOrigin = '50% 50%'; });

    let currentRotation = 0;
    let targetRotation = 0;
    let latestX = 0;
    let latestY = 0;
    let lastX = 0;
    let lastTime = performance.now();
    let rafId: number;
    const interactiveSelector = [
      'a',
      'button',
      '[data-cursor]',
      '[role="button"]',
      '[role="link"]',
      'input[type="button"]',
      'input[type="submit"]',
      'input[type="reset"]',
      'summary',
    ].join(',');
    const updateCursorVariant = () => {
      const target = document.elementFromPoint(latestX, latestY);
      cursor.dataset.variant =
        target instanceof Element && target.closest(interactiveSelector) ? 'pointer' : 'regular';
    };

    const onMouseMove = (e: MouseEvent) => {
      latestX = e.clientX;
      latestY = e.clientY;
      cursor.classList.add(styles.visible);
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      updateCursorVariant();

      const now = performance.now();
      const dt = now - lastTime;
      if (dt > 0) {
        const vx = (e.clientX - lastX) / dt;
        targetRotation = Math.max(Math.min(vx * 100, 70), -70);
      }
      lastX = e.clientX;
      lastTime = now;

    };

    const onMouseLeave = () => {
      cursor.classList.remove(styles.visible);
      cursor.dataset.variant = 'regular';
    };

    function animate() {
      updateCursorVariant();
      currentRotation += (targetRotation - currentRotation) * 0.1;
      targetRotation += (0 - targetRotation) * 0.05;
      innerRefs.current.forEach(el => {
        el.style.transform = `rotate(${currentRotation}deg)`;
      });
      rafId = requestAnimationFrame(animate);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('blur', onMouseLeave);
    cursor.dataset.variant = 'regular';
    rafId = requestAnimationFrame(animate);

    return () => {
      document.documentElement.classList.remove('customCursor');
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('blur', onMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className={styles.cursor} ref={cursorRef}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 38" fill="none" className={`${styles.inner} ${styles.regular}`}>
        <path d="M2.5 0H0.5V34H4.5V32H6.5V30H8.5V28H10.5V32H12.5V36H14.5V38H18.5V36H20.5V32H18.5V28H16.5V26H24.5V22H22.5V20H20.5V18H18.5V16H16.5V14H14.5V12H12.5V10H10.5V8H8.5V6H6.5V4H4.5V2H2.5V0Z" fill="#131313" />
        <path d="M4.5 4H2.5V32H4.5V30H6.5V28H8.5V26H10.5V28H12.5V32H14.5V36H18.5V32H16.5V28H14.5V24H22.5V22H20.5V20H18.5V18H16.5V16H14.5V14H12.5V12H10.5V10H8.5V8H6.5V6H4.5V4Z" fill="#EFEEEC" />
      </svg>

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 38" fill="none" className={`${styles.inner} ${styles.hoverPointer}`}>
        <path d="M12.3529 0H8.82353V1.72727L7.05882 1.72727V17.2727H5.29412L5.29412 15.5455H0V20.7273H1.76471V22.4545H3.52941V25.9091H5.29412V29.3636H7.05882V32.8182H8.82353V38H26.4706V32.8182H28.2353V27.6364H30V15.5455H28.2353V13.8182H26.4706V12.0909H22.9412L22.9412 10.3636H17.6471V8.63636H14.1176V1.72727L12.3529 1.72727V0Z" fill="#131313" />
        <path d="M8.82347 1.72729V20.7273H7.05877V19H5.29406V17.2727H1.76465V20.7273H3.52935V22.4546H5.29406V25.9091H7.05877V29.3637H8.82347V32.8182H10.5882V36.2727H24.7058V32.8182H26.4705V27.6364H28.2352V15.5455H26.4705V13.8182H24.7058V19H22.9411V12.0909H19.4117V17.2727H17.647V10.3637H14.1176V17.2727H12.3529V1.72729H8.82347Z" fill="#EFEEEC" />
      </svg>
    </div>
  );
}
