import { Link } from 'react-router-dom';
import { motion, type Variants } from 'framer-motion';
import { featuredProjects } from '../data/projects';
import ProjectCard from '../components/ProjectCard';
import Typewriter from '../components/Typewriter';
import styles from './Home.module.css';

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

export default function Home() {
  return (
    <main className={styles.main}>
      {/* ===== Hero ===== */}
      <section className={styles.hero}>
        <div className="container">
          <motion.div
            className={styles.heroInner}
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            <motion.p className={styles.heroEyebrow} variants={itemVariants}>
              Design &amp; Development
            </motion.p>

            <motion.h1 className={styles.heroHeading} variants={itemVariants}>
              Crafting
              <br />
              <Typewriter
                words={[
                  'with intention',
                  'with purpose',
                  'for the web',
                  'modern interfaces',
                  'better experiences',
                  'something new',
                ]}
                color="var(--color-green)"
              />
            </motion.h1>

            <motion.p className={styles.heroSub} variants={itemVariants}>
              I&apos;m Eiríkur, a developer and designer based in Reykjavík.
              I have a strong passion for web development, technology, and
              finding creative solutions to real problems.
            </motion.p>

            <motion.div className={styles.heroCtas} variants={itemVariants}>
              <Link to="/projects" className={styles.ctaPrimary}>
                View work
              </Link>
              <Link to="/about" className={styles.ctaSecondary}>
                About me
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Decorative blobs */}
        <div className={styles.blob1} aria-hidden="true" />
        <div className={styles.blob2} aria-hidden="true" />
      </section>

      {/* ===== Featured projects ===== */}
      <section className={styles.featured}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Things I've made.</h2>
            <Link to="/projects" className={styles.seeAll}>
              All projects →
            </Link>
          </div>

          <div className={styles.projectGrid}>
            {featuredProjects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== Marquee strip ===== */}
      <div className={styles.marqueeWrapper} aria-hidden="true">
        <div className={styles.marqueeTrack}>
          {[...Array(6)].map((_, i) => (
            <span key={i} className={styles.marqueeContent}>
              Design<span>◆</span>Development<span>◆</span>Motion<span>◆</span>Branding<span>◆</span>Systems<span>◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* ===== Contact CTA ===== */}
      <section className={styles.contact}>
        <div className="container">
          <motion.div
            className={styles.contactInner}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className={styles.contactEyebrow}>Ready to build something?</p>
            <h2 className={styles.contactHeading}>
              Let&apos;s make it{' '}
              <span className={styles.contactAccent}>happen</span>.
            </h2>
            <a href="mailto:Eirikurak@gmail.com" className={styles.contactCta}>
              Start a conversation
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path
                  d="M3 15L15 3M15 3H7M15 3V11"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
