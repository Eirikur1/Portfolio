import { motion } from 'framer-motion';
import styles from './About.module.css';

const experience = [
  {
    role: 'Intern',
    company: 'Jökulá',
    location: 'Reykjavík',
    period: 'Summer 2026',
    bullets: [
      'Worked on multiple projects across frontend and backend development',
      'Redesigned and rebuilt client products end-to-end',
      'Moved between Figma and code throughout, designing interfaces and shipping them',
    ],
  },
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
            <h1 className={styles.heading}>
              Design and code, out of Reykjavík
            </h1>
            <p className={styles.bio}>
              I&apos;m Eiríkur, a developer and designer based in Reykjavík. I
              make interfaces, identities, and interactive things on the web.
            </p>
            <p className={styles.bio}>
              Before web development, I ran Pizza Port and worked in
              construction. That mix is why I care about things that look good
              and actually work.
            </p>
            <div className={styles.contactInfo}>
              <a href="mailto:Eirikurak@gmail.com" className={styles.contactDetail}>
                Eirikurak@gmail.com
              </a>
            </div>
          </div>
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
            Say hi
          </a>
        </motion.section>

      </div>
    </main>
  );
}
