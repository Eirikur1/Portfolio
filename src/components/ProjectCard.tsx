import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Project } from '../data/projects';
import styles from './ProjectCard.module.css';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.article
      ref={ref}
      className={styles.card}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{ '--accent': project.accent } as React.CSSProperties}
      onClick={() => project.link && window.open(project.link, '_blank')}
      role={project.link ? 'link' : undefined}
    >
      {/* Image / placeholder area */}
      <div className={styles.media}>
        <div className={styles.mediaInner} aria-hidden="true">
          {project.image
            ? <img src={project.image} alt={project.title} className={styles.projectImage} />
            : <span className={styles.projectNumber}>{project.id}</span>
          }
        </div>
        {project.wip && (
          <span className={styles.wipBadge}>In progress</span>
        )}
        <div className={styles.hoverOverlay} aria-hidden="true">
          <span className={styles.viewLabel}>View project →</span>
        </div>
      </div>

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.meta}>
          <span className={styles.category}>{project.category}</span>
          <span className={styles.year}>{project.year}</span>
        </div>

        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.description}>{project.description}</p>

        <ul className={styles.tags}>
          {project.tags.map((tag) => (
            <li key={tag} className={styles.tag}>
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}
