import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data/projects';
import type { ProjectCategory } from '../data/projects';
import Sidebar from '../components/Sidebar';
import ProjectCard from '../components/ProjectCard';
import Typewriter from '../components/Typewriter';
import styles from './Projects.module.css';

const categories: ('All' | ProjectCategory)[] = [
  'All',
  'Design',
  'Development',
  'Branding',
  'Motion',
];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<'All' | ProjectCategory>('All');

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <main className={styles.main}>
      <div className="container">
        <div className={styles.layout}>
          {/* ===== Sticky sidebar ===== */}
          <Sidebar />

          {/* ===== Main content ===== */}
          <div className={styles.content}>
            {/* Page header */}
            <motion.div
              className={styles.header}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className={styles.eyebrow}>Portfolio</p>
              <h1 className={styles.heading}>
                Things I've<br />
                <Typewriter words={['made', 'designed', 'engineered', 'built', 'shipped', 'crafted']} color="var(--color-green)" />
                <span className={styles.headingPeriod}></span>
              </h1>
              <p className={styles.sub}>
                A collection of projects spanning product design, development,
                branding, and motion.
              </p>
            </motion.div>

            {/* Filter pills */}
            <motion.div
              className={styles.filters}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              role="group"
              aria-label="Filter projects by category"
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`${styles.filter} ${activeFilter === cat ? styles.filterActive : ''}`}
                  onClick={() => setActiveFilter(cat)}
                  aria-pressed={activeFilter === cat}
                >
                  {cat}
                  {cat !== 'All' && (
                    <span className={styles.filterCount}>
                      {projects.filter((p) => p.category === cat).length}
                    </span>
                  )}
                </button>
              ))}
            </motion.div>

            {/* Project grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFilter}
                className={styles.grid}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {filtered.map((project, i) => (
                  <ProjectCard key={project.id} project={project} index={i} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </main>
  );
}
