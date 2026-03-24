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

export default function About() {
  return (
    <main className={styles.main}>
      <div className="container">

        {/* ===== Hero ===== */}
        <motion.section
          className={styles.hero}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          <p className={styles.eyebrow}>About</p>
          <h1 className={styles.heading}>
            A bit{' '}
            <span className={styles.headingAccent}>about</span>
            <br />
            me
            <span className={styles.headingPeriod}>.</span>
          </h1>
          <p className={styles.bio}>
            I&apos;m Eiríkur, an ambitious, hardworking, and creative developer
            and designer based in Reykjavík. I have a strong interest in web
            development, technology, and building new solutions.
          </p>
          <p className={styles.bio}>
            I communicate easily, work well both independently and in a team,
            and always push myself to take on new challenges. Currently studying
            web development at Tækniskólinn.
          </p>
          <div className={styles.contactInfo}>
            <a href="mailto:Eirikurak@gmail.com" className={styles.contactDetail}>
              Eirikurak@gmail.com
            </a>
            <span className={styles.contactDetail}>+354 823 0350</span>
            <a href="https://eiki.studio" target="_blank" rel="noopener noreferrer" className={styles.contactDetail}>
              eiki.studio
            </a>
            <span className={styles.contactDetail}>108 Reykjavík</span>
          </div>
        </motion.section>

        {/* ===== Divider ===== */}
        <div className={styles.divider} />

        {/* ===== Experience ===== */}
        <motion.section
          className={styles.section}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          <h2 className={styles.sectionTitle}>Experience</h2>
          <ol className={styles.timeline}>
            {experience.map((item, i) => (
              <motion.li
                key={i}
                className={styles.timelineItem}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
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

        {/* ===== Divider ===== */}
        <div className={styles.divider} />

        {/* ===== Education ===== */}
        <motion.section
          className={styles.section}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          <h2 className={styles.sectionTitle}>Education</h2>
          <ol className={styles.timeline}>
            {education.map((item, i) => (
              <motion.li
                key={i}
                className={styles.timelineItem}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
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

        {/* ===== Divider ===== */}
        <div className={styles.divider} />

        {/* ===== Skills ===== */}
        <motion.section
          className={styles.section}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
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
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, duration: 0.4 }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.section>

        {/* ===== Contact ===== */}
        <motion.section
          className={styles.contact}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          <h2 className={styles.contactHeading}>
            Want to work{' '}
            <span className={styles.contactAccent}>together</span>?
          </h2>
          <a href="mailto:Eirikurak@gmail.com" className={styles.contactCta}>
            Eirikurak@gmail.com
          </a>
        </motion.section>

      </div>
    </main>
  );
}
