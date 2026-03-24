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
            <motion.h1 className={styles.heroHeading} variants={itemVariants}>
              Crafting
              <br />
              <Typewriter
                className={styles.heroTypewriter}
                words={[
                  'with intention',
                  'with purpose',
                  'for the web',
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
            </motion.div>
          </motion.div>
        </div>

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
              Design<span>◆</span>Development<span>◆</span>Branding<span>◆</span>Motion<span>◆</span>React Native<span>◆</span>Mobile<span>◆</span>Web<span>◆</span>
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
            <h2 className={styles.contactHeading}>
              Open to opportunities.
            </h2>
            <p className={styles.contactSub}>Full-time, freelance, or collaboration.</p>
            <a href="mailto:Eirikurak@gmail.com" className={styles.contactCta}>
              Eirikurak@gmail.com →
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
