import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data/projects';
import type { ProjectCategory } from '../data/projects';
import ProjectCard from '../components/ProjectCard';
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

  const matchesFilter = (p: typeof projects[0], filter: string) =>
    p.category === filter || p.tags.includes(filter);

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter((p) => matchesFilter(p, activeFilter));

  return (
    <main className={styles.main}>
      <div className="container">
        {/* Page header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className={styles.heading}>Things I&apos;ve made, shaped, and shipped.</h1>
          <p className={styles.sub}>
            A collection of web products, mobile experiments, identities, and
            visual systems made with a practical eye for launch.
          </p>
        </motion.div>

        {/* Filter pills */}
        <motion.div
          className={styles.filters}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.5 }}
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
                  {projects.filter((p) => matchesFilter(p, cat)).length}
                </span>
              )}
            </button>
          ))}
        </motion.div>

        {/* Project list */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            className={styles.list}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} variant="card" />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}
