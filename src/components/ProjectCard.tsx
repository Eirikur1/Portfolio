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
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const [imageFailed, setImageFailed] = useState(false);
  const cardStyle = {
    '--project-accent': project.accent,
  } as CSSProperties;

  const handleClick = () => {
    if (project.link) window.open(project.link, '_blank');
  };

  const handleMouseEnter = () => {
    if (project.playOnHover && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (project.playOnHover && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const media = project.video ? (
    <>
      <video
        ref={videoRef}
        src={project.video}
        className={styles.projectVideo}
        autoPlay={!project.playOnHover}
        muted
        loop
        playsInline
        preload="metadata"
      />
      {project.playOnHover && project.image && (
        <img
          src={project.image}
          alt={project.title}
          className={`${styles.projectImage} ${styles.hoverThumbnail}`}
        />
      )}
    </>
  ) : project.image && !imageFailed ? (
    <img
      src={project.image}
      alt={project.title}
      className={styles.projectImage}
      onError={() => setImageFailed(true)}
    />
  ) : (
    <span className={styles.projectNumber}>{project.title}</span>
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
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={cardStyle}
        data-cursor={project.link ? 'pointer' : undefined}
      >
        <div className={styles.cardTopMeta}>
          <span className={styles.cardTopLabel} aria-hidden="true" />
          <span className={styles.cardTopLabel}>{project.year}</span>
        </div>

        <div className={styles.media}>
          <div className={styles.mediaInner} aria-hidden="true">
            {media}
          </div>
          {project.wip && <span className={styles.wipBadge}>In progress</span>}
        </div>

        <div className={styles.cardBottomMeta}>
          <h3 className={styles.cardTitle}>{project.title}</h3>
          <span className={styles.cardYear}>{project.tags.slice(0, 3).join(' / ')}</span>
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
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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
        <span className={styles.year}>{project.year}</span>
      </div>
    </motion.article>
  );
}
