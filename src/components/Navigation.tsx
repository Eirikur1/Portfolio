import { NavLink } from 'react-router-dom';
import { RiGithubLine } from 'react-icons/ri';
import { FaLinkedinIn } from 'react-icons/fa6';
import { useEffect, useRef } from 'react';
import styles from './Navigation.module.css';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/about', label: 'About' },
];

function CharStagger({ text }: { text: string }) {
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = spanRef.current;
    if (!el) return;
    el.innerHTML = '';
    [...text].forEach((char, i) => {
      const s = document.createElement('span');
      s.textContent = char;
      s.style.transitionDelay = `${i * 0.01}s`;
      if (char === ' ') s.style.whiteSpace = 'pre';
      el.appendChild(s);
    });
  }, [text]);

  return (
    <span data-button-animate-chars="" className={styles.btnText} ref={spanRef}>
      {text}
    </span>
  );
}

export default function Navigation() {
  return (
    <>
      <nav className={styles.nav} aria-label="Main navigation">
        {navLinks.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `${styles.link} btn-animate-chars ${isActive ? styles.linkActive : ''}`
            }
          >
            <div className="btn-animate-chars__bg" />
            <CharStagger text={label} />
          </NavLink>
        ))}
      </nav>

      <div className={styles.socials}>
        <a
          href="https://github.com/Eirikur1"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.socialLink}
          aria-label="GitHub"
        >
          <RiGithubLine size={17} />
        </a>
        <a
          href="https://www.linkedin.com/in/eir%C3%ADkur-atli-k-234952264/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.socialLink}
          aria-label="LinkedIn"
        >
          <FaLinkedinIn size={15} />
        </a>
      </div>
    </>
  );
}
