import { motion } from 'framer-motion';
import styles from './Sidebar.module.css';

const skills = ['React / React Native', 'Next.js', 'TypeScript / JavaScript', 'HTML / CSS', 'Tailwind CSS', 'Node.js', 'Figma', 'Illustrator', 'GitHub'];

export default function Sidebar() {
  return (
    <motion.aside
      className={styles.sidebar}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Avatar */}
      <div className={styles.avatar}>
        <img src="/avatar.png" alt="Eiríkur Karlsson" className={styles.avatarImg} />
      </div>

      {/* Identity */}
      <div className={styles.identity}>
        <h2 className={styles.name}>Eiríkur Karlsson</h2>
        <p className={styles.role}>
          Developer <span className={styles.amp}>&amp;</span> Designer
        </p>
      </div>

      {/* Bio */}
      <p className={styles.bio}>
        Ambitious, creative, and detail-oriented. Based in Reykjavík, studying
        web development at Tækniskólinn.
      </p>

      {/* Availability badge */}
      <div className={styles.badge}>
        <span className={styles.dot} aria-hidden="true" />
        Available for work
      </div>

      {/* Skills */}
      <div className={styles.skills}>
        <p className={styles.skillsLabel}>Expertise</p>
        <ul className={styles.skillsList}>
          {skills.map((skill) => (
            <li key={skill} className={styles.skillItem}>
              {skill}
            </li>
          ))}
        </ul>
      </div>

      {/* Year */}
      <p className={styles.year}>© 2026</p>
    </motion.aside>
  );
}
