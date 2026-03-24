import { NavLink } from 'react-router-dom';
import { RiGithubLine } from 'react-icons/ri';
import { FaLinkedinIn } from 'react-icons/fa6';
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


{/* Bottom-left social links */}
      <div className={styles.socials}>
<a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.socialLink}
          aria-label="GitHub"
        >
          <RiGithubLine size={18} />
        </a>
        <a
          href="https://www.linkedin.com/in/eir%C3%ADkur-atli-k-234952264/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.socialLink}
          aria-label="LinkedIn"
        >
          <FaLinkedinIn size={16} />
        </a>
      </div>
    </>
  );
}
