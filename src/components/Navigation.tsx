import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/about', label: 'About' },
];

export default function Navigation() {
  return (
    <>
      {/* Top-left wordmark */}
      <NavLink to="/" className={styles.wordmark} aria-label="Home">
        Eiki<span className={styles.dot}>.</span>
      </NavLink>

      {/* Top-right page links */}
      <nav className={styles.nav} aria-label="Main navigation">
        {navLinks.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.linkActive : ''}`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Bottom-right CTA */}
      <a
        href="mailto:Eirikurak@gmail.com"
        className={styles.cta}
        aria-label="Send email"
      >
        Let&apos;s talk
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M2 12L12 2M12 2H5M12 2V9"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>

      {/* Bottom-left social links */}
      <div className={styles.socials}>
        <a
          href="https://eiki.studio"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.socialLink}
          aria-label="Eiki Studio"
        >
          WEB
        </a>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.socialLink}
          aria-label="GitHub"
        >
          GH
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.socialLink}
          aria-label="LinkedIn"
        >
          LI
        </a>
      </div>
    </>
  );
}
