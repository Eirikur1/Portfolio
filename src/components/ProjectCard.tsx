import { useRef, useState, type CSSProperties } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Project } from '../data/projects';
import styles from './ProjectCard.module.css';

interface ProjectCardProps {
  project: Project;
  index: number;
  variant?: 'row' | 'card';
}

export default function ProjectCard({ project, index, variant = 'row' }: ProjectCardProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const [imageFailed, setImageFailed] = useState(false);
  const cardStyle = {
    '--project-accent': project.accent,
  } as CSSProperties;

  const handleClick = () => {
    if (project.link) window.open(project.link, '_blank');
  };

  const media = project.video ? (
    <video src={project.video} className={styles.projectVideo} autoPlay muted loop playsInline />
  ) : project.image && !imageFailed ? (
    <img
      src={project.image}
      alt={project.title}
      className={styles.projectImage}
      onError={() => setImageFailed(true)}
    />
  ) : (
    <span className={styles.projectNumber}>{project.id}</span>
  );

  if (variant === 'card') {
    return (
      <motion.article
        ref={ref}
        className={styles.card}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.25), ease: [0.16, 1, 0.3, 1] }}
        onClick={handleClick}
        style={cardStyle}
        data-cursor={project.link ? 'pointer' : undefined}
      >
        <div className={styles.media}>
          <div className={styles.mediaInner} aria-hidden="true">
            {media}
          </div>
          {project.wip && <span className={styles.wipBadge}>In progress</span>}
        </div>

        <div className={styles.content}>
          <div className={styles.meta}>
            <span className={styles.category}>{project.category}</span>
            <span className={styles.year}>{project.year}</span>
          </div>
          <h3 className={styles.title}>{project.title}</h3>
          <p className={styles.description} style={{ opacity: 1, maxHeight: 'none' }}>{project.description}</p>
          <ul className={styles.tags}>
            {project.tags.map((tag) => (
              <li key={tag} className={styles.tag}>{tag}</li>
            ))}
          </ul>
          {project.link && <span className={styles.projectLink}>view project →</span>}
        </div>
      </motion.article>
    );
  }

  return (
    <motion.article
      ref={ref}
      className={styles.row}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: Math.min(index * 0.06, 0.3), ease: [0.16, 1, 0.3, 1] }}
      onClick={handleClick}
      style={cardStyle}
      role={project.link ? 'link' : undefined}
      data-cursor={project.link ? 'pointer' : undefined}
    >
      <div className={styles.rowMedia} aria-hidden="true">
        {media}
      </div>

      <div className={styles.left}>
        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.description}>{project.description}</p>
      </div>

      <div className={styles.right}>
        <span className={styles.category}>{project.category}</span>
        <span className={styles.year}>{project.year}</span>
        {project.wip && <span className={styles.wipBadge}>In progress</span>}
        {project.link && <span className={styles.arrow}>→</span>}
      </div>
    </motion.article>
  );
}
