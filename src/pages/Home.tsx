import { useCallback, useEffect, useRef, useState, type ComponentType } from 'react';
import type { LottieComponentProps } from 'lottie-react';
import { Link } from 'react-router-dom';
import { motion, type Variants } from 'framer-motion';
import { featuredProjects } from '../data/projects';
import ProjectRow from '../components/ProjectCard';
import styles from './Home.module.css';
import fallingAnimationUrl from '../assets/FallingEiki.json?url';
import fallingMobileAnimationUrl from '../assets/FallingEikiMobile.json?url';
import heyPopupAnimationUrl from '../assets/EikiHeyWhatsUpSeeYouAround.json?url';
import popupAnimationUrl from '../assets/EikiPopup.json?url';

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

const heroHeadingVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.075,
      delayChildren: 0.08,
    },
  },
};

const heroLetterVariants: Variants = {
  hidden: {
    opacity: 0,
    y: '0.7em',
    rotate: -3,
  },
  show: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: {
      duration: 0.65,
      ease,
    },
  },
};

const heroSubVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.045,
      delayChildren: 0.35,
    },
  },
};

const heroWordVariants: Variants = {
  hidden: {
    opacity: 0,
    y: '0.8em',
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease,
    },
  },
};

const heroName = Array.from('Eiríkur');
const heroSubtitle =
  'A developer and designer making websites, apps, and brands with personality.';

const profileNotes = [
  {
    title: 'Developer / designer',
    detail: 'React, mobile products, identities, and interactive systems.',
  },
  {
    title: 'Based in Reykjavík',
    detail: 'Studying web development while building practical digital work.',
  },
  {
    title: 'Available for projects',
    detail: 'Full-time, freelance, collaborations, and weird web ideas.',
  },
];

const popupAnimationUrls = [popupAnimationUrl, heyPopupAnimationUrl];
const heroMobileQuery = '(max-width: 768px)';
const repeatAnimationLoaders = import.meta.glob('../assets/Repeatjson/*.json', {
  query: '?url',
  import: 'default',
}) as Record<string, () => Promise<string>>;
const repeatAnimationEntries = Object.entries(repeatAnimationLoaders).map(([path, load]) => ({
  id: path.split('/').pop()?.replace(/\.json$/, '') ?? path,
  load,
}));

function getRepeatAnimationDelay() {
  return 10000 + Math.floor(Math.random() * 5000);
}

export default function Home() {
  const repeatTimerRef = useRef<number | null>(null);
  const isMountedRef = useRef(false);
  const [showHeroPopup, setShowHeroPopup] = useState(false);
  const [showFallingHeroAnimation, setShowFallingHeroAnimation] = useState(false);
  const [heroPopupAnimation, setHeroPopupAnimation] = useState<unknown>(null);
  const [fallingHeroAnimation, setFallingHeroAnimation] = useState<unknown>(null);
  const [repeatHeroAnimation, setRepeatHeroAnimation] = useState<unknown>(null);
  const [repeatHeroAnimationKey, setRepeatHeroAnimationKey] = useState(0);
  const [repeatHeroAnimationId, setRepeatHeroAnimationId] = useState('');
  const [LottiePlayer, setLottiePlayer] =
    useState<ComponentType<LottieComponentProps> | null>(null);

  const clearRepeatAnimationTimer = useCallback(() => {
    if (repeatTimerRef.current !== null) {
      window.clearTimeout(repeatTimerRef.current);
      repeatTimerRef.current = null;
    }
  }, []);

  const playRandomRepeatAnimation = useCallback(() => {
    const selectedEntry =
      repeatAnimationEntries[Math.floor(Math.random() * repeatAnimationEntries.length)];

    if (!selectedEntry) {
      return;
    }

    selectedEntry
      .load()
      .then((animationUrl) => fetch(animationUrl))
      .then((response) => {
        if (!response.ok) {
          throw new Error('Unable to load repeat hero animation.');
        }

        return response.json();
      })
      .then((animation) => {
        if (!isMountedRef.current) {
          return;
        }

        setRepeatHeroAnimation(animation);
        setRepeatHeroAnimationId(selectedEntry.id);
        setRepeatHeroAnimationKey((key) => key + 1);
      })
      .catch(() => {});
  }, []);

  const scheduleRepeatAnimation = useCallback(() => {
    clearRepeatAnimationTimer();

    if (repeatAnimationEntries.length === 0) {
      return;
    }

    repeatTimerRef.current = window.setTimeout(
      playRandomRepeatAnimation,
      getRepeatAnimationDelay(),
    );
  }, [clearRepeatAnimationTimer, playRandomRepeatAnimation]);

  useEffect(() => {
    isMountedRef.current = true;
    const controller = new AbortController();
    const fallingTimer = window.setTimeout(() => {
      setShowFallingHeroAnimation(true);
    }, 1000);
    const popupTimer = window.setTimeout(() => {
      setShowHeroPopup(true);
    }, 2500);

    const selectedAnimationUrl =
      popupAnimationUrls[Math.floor(Math.random() * popupAnimationUrls.length)];
    const popupAnimationData = fetch(selectedAnimationUrl, { signal: controller.signal }).then(
      (response) => {
        if (!response.ok) {
          throw new Error('Unable to load hero popup animation.');
        }

        return response.json();
      },
    );
    const selectedFallingAnimationUrl = window.matchMedia(heroMobileQuery).matches
      ? fallingMobileAnimationUrl
      : fallingAnimationUrl;
    const fallingAnimationData = fetch(selectedFallingAnimationUrl, { signal: controller.signal }).then(
      (response) => {
        if (!response.ok) {
          throw new Error('Unable to load falling hero animation.');
        }

        return response.json();
      },
    );
    const lottiePlayer = import('lottie-react').then((module) => {
      const defaultExport = module.default as
        | ComponentType<LottieComponentProps>
        | { default: ComponentType<LottieComponentProps> };

      return typeof defaultExport === 'function' ? defaultExport : defaultExport.default;
    });

    popupAnimationData.then(setHeroPopupAnimation).catch(() => {});
    fallingAnimationData.then(setFallingHeroAnimation).catch(() => {});
    lottiePlayer.then((Player) => setLottiePlayer(() => Player)).catch(() => {});

    return () => {
      isMountedRef.current = false;
      controller.abort();
      clearRepeatAnimationTimer();
      window.clearTimeout(fallingTimer);
      window.clearTimeout(popupTimer);
    };
  }, [clearRepeatAnimationTimer]);

  return (
    <main className={styles.main}>
      {/* ===== Hero ===== */}
      <section className={styles.hero}>
        {showFallingHeroAnimation && fallingHeroAnimation !== null && LottiePlayer !== null && (
          <div className={styles.heroFallingAnimation} aria-hidden="true">
            <LottiePlayer
              animationData={fallingHeroAnimation}
              loop={false}
              autoplay
              onComplete={() => {
                setShowFallingHeroAnimation(false);
                scheduleRepeatAnimation();
              }}
              rendererSettings={{ preserveAspectRatio: 'xMidYMid slice' }}
            />
          </div>
        )}

        {repeatHeroAnimation !== null && LottiePlayer !== null && (
          <div
            className={`${styles.heroFallingAnimation} ${styles.heroRepeatAnimation} ${
              repeatHeroAnimationId === 'clickedon' ? styles.heroRepeatAnimationClicked : ''
            }`}
            aria-hidden="true"
          >
            <LottiePlayer
              key={repeatHeroAnimationKey}
              animationData={repeatHeroAnimation}
              loop={false}
              autoplay
              onComplete={() => {
                setRepeatHeroAnimation(null);
                setRepeatHeroAnimationId('');
                scheduleRepeatAnimation();
              }}
              rendererSettings={{ preserveAspectRatio: 'xMidYMid meet' }}
            />
          </div>
        )}

        <div className="container">
          <motion.div
            className={styles.heroInner}
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            <motion.div className={styles.heroIntro} variants={itemVariants}>
              <motion.h1
                className={styles.heroHeading}
                variants={heroHeadingVariants}
                aria-label="Eiríkur"
              >
                {heroName.map((letter, i) => (
                  <motion.span
                    className={styles.heroLetter}
                    variants={heroLetterVariants}
                    aria-hidden="true"
                    key={`${letter}-${i}`}
                  >
                    {letter}
                  </motion.span>
                ))}
              </motion.h1>
              <motion.p
                className={styles.heroSub}
                variants={heroSubVariants}
                aria-label={heroSubtitle}
              >
                {heroSubtitle.split(' ').map((word, i) => (
                  <motion.span
                    className={styles.heroSubWord}
                    variants={heroWordVariants}
                    aria-hidden="true"
                    key={`${word}-${i}`}
                  >
                    {word}
                    {i < heroSubtitle.split(' ').length - 1 ? '\u00a0' : ''}
                  </motion.span>
                ))}
              </motion.p>
            </motion.div>

            <motion.div className={styles.profileGrid} variants={itemVariants}>
              {profileNotes.map((note) => (
                <article className={styles.profileNote} key={note.title}>
                  <h2>{note.title}</h2>
                  <p>{note.detail}</p>
                </article>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {showHeroPopup && heroPopupAnimation !== null && LottiePlayer !== null && (
          <motion.div
            className={styles.heroPopup}
            initial={{ opacity: 0, x: -28, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            transition={{ duration: 0.55, ease }}
            aria-hidden="true"
          >
            <LottiePlayer animationData={heroPopupAnimation} loop={false} autoplay />
          </motion.div>
        )}
      </section>

      {/* ===== Featured projects ===== */}
      <section className={styles.featured}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTitle}>Selected work</span>
            <Link to="/projects" className={styles.seeAll}>
              All projects →
            </Link>
          </div>

          <div>
            {featuredProjects.map((project, i) => (
              <ProjectRow key={project.id} project={project} index={i} />
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
              Open to<br />opportunities.
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
