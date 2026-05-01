import { motion } from 'framer-motion';
import styles from './About.module.css';

const experience = [
  {
    role: 'Founder',
    company: 'Pizza Port',
    location: 'Reykjavík',
    period: '2023 – 2026',
    bullets: [
      'Built and ran a company from the ground up',
      'Handled project planning, execution, and marketing',
      'Developed skills in independence, entrepreneurship, and accountability',
    ],
  },
  {
    role: 'Concrete Cutter',
    company: 'Berskerkir ehf',
    location: 'Hafnarfjörður',
    period: '2016 – 2024',
    bullets: [
      'Concrete cutting and related construction work',
      'Trained in precision, responsibility, and time management',
      'Worked both in teams and independently on projects',
    ],
  },
];

const education = [
  {
    degree: 'Web Development',
    school: 'Vefskólinn / Tækniskólinn',
    location: 'Hafnarfjörður',
    period: '2025 – 2026',
    description: 'Combining web design, UI/UX, and programming into a focused practical programme.',
  },
  {
    degree: 'Computer Science',
    school: 'Háskóli Íslands',
    location: 'Reykjavík',
    period: '2023 – 2024',
    description: 'Foundation in computer science fundamentals and programming.',
  },
  {
    degree: 'Stúdentspróf',
    school: 'Menntaskólinn við Hamrahlíð',
    location: 'Reykjavík',
    period: '2018 – 2021',
    description: 'Icelandic matriculation examination.',
  },
];

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function About() {
  return (
    <main className={styles.main}>
      <div className="container">

        {/* ===== Hero ===== */}
        <motion.section
          className={styles.hero}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
        >
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>About</p>
            <h1 className={styles.heading}>
              Curious hands, practical mind, visual instinct.
            </h1>
            <p className={styles.bio}>
              I&apos;m Eiríkur, an ambitious and creative developer/designer based
              in Reykjavík. I like building web products that feel useful,
              memorable, and cared for.
            </p>
            <p className={styles.bio}>
              My background mixes entrepreneurship, construction-level precision,
              and web development studies at Tækniskólinn, which gives my work a
              grounded, get-it-shipped rhythm.
            </p>
            <div className={styles.contactInfo}>
              <a href="mailto:Eirikurak@gmail.com" className={styles.contactDetail}>
                Eirikurak@gmail.com
              </a>
              <span className={styles.contactDetail}>108 Reykjavík</span>
            </div>
          </div>
          <figure className={styles.heroPortrait}>
            <img src="/IMG_3781%202.JPG" alt="" />
            <figcaption>available for web, app, and identity work</figcaption>
          </figure>
        </motion.section>

        {/* ===== Experience ===== */}
        <motion.section
          className={styles.section}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease }}
        >
          <h2 className={styles.sectionTitle}>Experience</h2>
          <ol className={styles.timeline}>
            {experience.map((item, i) => (
              <motion.li
                key={i}
                className={styles.timelineItem}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5, ease }}
              >
                <div className={styles.timelineLeft}>
                  <span className={styles.period}>{item.period}</span>
                  <span className={styles.location}>{item.location}</span>
                </div>
                <div className={styles.timelineRight}>
                  <p className={styles.role}>{item.role}</p>
                  <p className={styles.company}>{item.company}</p>
                  <ul className={styles.bullets}>
                    {item.bullets.map((b, j) => (
                      <li key={j}>{b}</li>
                    ))}
                  </ul>
                </div>
              </motion.li>
            ))}
          </ol>
        </motion.section>

        {/* ===== Education ===== */}
        <motion.section
          className={styles.section}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease }}
        >
          <h2 className={styles.sectionTitle}>Education</h2>
          <ol className={styles.timeline}>
            {education.map((item, i) => (
              <motion.li
                key={i}
                className={styles.timelineItem}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5, ease }}
              >
                <div className={styles.timelineLeft}>
                  <span className={styles.period}>{item.period}</span>
                  <span className={styles.location}>{item.location}</span>
                </div>
                <div className={styles.timelineRight}>
                  <p className={styles.role}>{item.degree}</p>
                  <p className={styles.company}>{item.school}</p>
                  <p className={styles.roleDesc}>{item.description}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </motion.section>

        {/* ===== Skills ===== */}
        <motion.section
          className={styles.section}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease }}
        >
          <h2 className={styles.sectionTitle}>Skills</h2>
          <div className={styles.skillsGrid}>
            {[
              'React', 'React Native', 'Next.js', 'Node.js',
              'TypeScript', 'JavaScript', 'Tailwind CSS', 'HTML / CSS',
              'Figma', 'Illustrator', 'Premiere Pro', 'GitHub',
            ].map((skill, i) => (
              <motion.span
                key={skill}
                className={styles.skillPill}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03, duration: 0.35, ease }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.section>

        {/* ===== Contact ===== */}
        <motion.section
          className={styles.contact}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease }}
        >
          <h2 className={styles.contactHeading}>
            Want to work{' '}
            <span className={styles.contactAccent}>together</span>?
          </h2>
          <a href="mailto:Eirikurak@gmail.com" className={styles.contactCta}>
            Eirikurak@gmail.com →
          </a>
        </motion.section>

      </div>
    </main>
  );
}
