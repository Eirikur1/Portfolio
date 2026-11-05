import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';
import { projects, type ProjectCategory } from '../data/projects';
import styles from './Projects.module.css';

gsap.registerPlugin(Flip);

const DISCIPLINES: ProjectCategory[] = ['Design', 'Development', 'Branding', 'Motion'];

const disciplinesFor = (project: (typeof projects)[number]) => {
  const fromTags = project.tags.filter((tag): tag is ProjectCategory =>
    (DISCIPLINES as string[]).includes(tag),
  );
  const unique = Array.from(new Set<ProjectCategory>([project.category, ...fromTags]));
  return unique.join(', ');
};

const listProjects = projects.filter((project) => Boolean(project.image));

export default function Projects() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let reduceMotion = false;
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: reduce)', () => {
      reduceMotion = true;
      return () => {
        reduceMotion = false;
      };
    });

    const cornerRadius = (el: Element) =>
      parseFloat(getComputedStyle(el).borderTopLeftRadius);

    const toggles = root.querySelectorAll<HTMLButtonElement>('[data-list-grid-toggle]');
    const shownIn = (el: Element, view: string) =>
      ['', view].includes(el.getAttribute('data-list-grid-fade') ?? '');

    let flip: ReturnType<typeof Flip.from> | null = null;

    const setView = (view: string) => {
      root.setAttribute('data-list-grid-view', view);
      toggles.forEach((toggle) => {
        toggle.setAttribute(
          'aria-pressed',
          String(toggle.getAttribute('data-list-grid-toggle') === view),
        );
      });
    };

    const startView = root.getAttribute('data-list-grid-view') || 'list';
    setView(startView);

    gsap.set(
      [...root.querySelectorAll<HTMLElement>('[data-list-grid-fade]')].filter(
        (el) => !shownIn(el, startView),
      ),
      { autoAlpha: 0 },
    );

    const cleanups: Array<() => void> = [];

    toggles.forEach((toggle) => {
      const onClick = () => {
        const view = toggle.getAttribute('data-list-grid-toggle');
        if (!view || view === root.getAttribute('data-list-grid-view')) return;

        const fadeTargets = [
          ...root.querySelectorAll<HTMLElement>('[data-list-grid-fade]'),
        ];
        const flipElements = [
          ...root.querySelectorAll<HTMLElement>('[data-list-grid-flip]'),
        ];
        const fadeIn = fadeTargets.filter((el) => shownIn(el, view));

        flip?.kill();
        gsap.killTweensOf(fadeTargets, 'opacity,visibility');
        gsap.killTweensOf(flipElements);

        const opacities = fadeTargets.map(
          (el) => gsap.getProperty(el, 'opacity') as number,
        );
        const startRadii = flipElements.map(
          (el) => cornerRadius(el) * (gsap.getProperty(el, 'scaleX') as number),
        );
        const state = Flip.getState([...flipElements, ...fadeTargets]);

        gsap.set(fadeTargets, { autoAlpha: (i: number) => opacities[i] });
        gsap.set(flipElements, { clearProps: 'borderRadius' });

        setView(view);

        if (reduceMotion) {
          gsap.set(fadeTargets, {
            autoAlpha: (_i: number, el: Element) =>
              fadeIn.includes(el as HTMLElement) ? 1 : 0,
          });
          return;
        }

        const endRadii = flipElements.map(cornerRadius);

        flip = Flip.from(state, {
          duration: 0.8,
          ease: 'expo.inOut',
          scale: true,
          onComplete() {
            gsap.set(
              fadeTargets.filter((el) => !fadeIn.includes(el)),
              { autoAlpha: 0 },
            );
          },
        });

        flipElements.forEach((el, index) => {
          gsap.fromTo(
            el,
            {
              borderRadius:
                startRadii[index] / (gsap.getProperty(el, 'scaleX') as number),
            },
            {
              borderRadius: endRadii[index],
              duration: 0.8,
              ease: 'expo.inOut',
              clearProps: 'borderRadius',
            },
          );
        });

        const tl = gsap.timeline();
        tl.to(fadeTargets, {
          autoAlpha: 0,
          duration: 0.2,
          ease: 'power1.out',
        }).to(
          fadeIn,
          {
            autoAlpha: 1,
            duration: 0.3,
            ease: 'power1.out',
            stagger: { amount: 0.2 },
          },
          0.55,
        );
      };

      toggle.addEventListener('click', onClick);
      cleanups.push(() => toggle.removeEventListener('click', onClick));
    });

    return () => {
      cleanups.forEach((fn) => fn());
      flip?.kill();
      mm.kill();
    };
  }, []);

  return (
    <main className={styles.main}>
      <div className="container">
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className={styles.heading}>Projects</h1>
          <p className={styles.sub}>
            A showcase of selected work. Websites, apps, identities, and interactive systems.
          </p>
        </motion.div>

        <div
          ref={rootRef}
          data-list-grid-view="list"
          data-list-grid-init
          className={styles.listGrid}
        >
          <div className={styles.bar}>
            <div aria-label="View" role="group" className={styles.toggle}>
              <button
                data-list-grid-toggle="list"
                type="button"
                aria-pressed="true"
                aria-label="List view"
                className={styles.button}
              >
                <svg
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="square"
                  aria-hidden="true"
                  className={styles.icon}
                >
                  <line x1="3" y1="5" x2="17" y2="5" />
                  <line x1="3" y1="10" x2="17" y2="10" />
                  <line x1="3" y1="15" x2="17" y2="15" />
                </svg>
              </button>
              <button
                data-list-grid-toggle="grid"
                type="button"
                aria-pressed="false"
                aria-label="Grid view"
                className={styles.button}
              >
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  className={styles.icon}
                >
                  <rect x="3" y="3" width="6" height="6" />
                  <rect x="11" y="3" width="6" height="6" />
                  <rect x="3" y="11" width="6" height="6" />
                  <rect x="11" y="11" width="6" height="6" />
                </svg>
              </button>
              <span
                data-list-grid-flip
                aria-hidden="true"
                className={styles.indicator}
              />
            </div>
          </div>

          <div className={styles.collection}>
            <div role="list" className={styles.list}>
              {listProjects.map((project) => (
                <div key={project.id} role="listitem" className={styles.item}>
                  <a
                    href={project.link ?? '#'}
                    target={project.link ? '_blank' : undefined}
                    rel={project.link ? 'noopener noreferrer' : undefined}
                    className={styles.link}
                  >
                    <div data-list-grid-fade="list" className={styles.line} />
                    <div data-list-grid-flip className={styles.media}>
                      <img
                        src={project.image}
                        loading="lazy"
                        alt={project.title}
                        className={styles.image}
                      />
                    </div>
                    <p data-list-grid-fade="" className={styles.title}>
                      {project.title}
                    </p>
                    <p data-list-grid-fade="" className={styles.category}>
                      {disciplinesFor(project)}
                    </p>
                    <p data-list-grid-fade="" className={styles.year}>
                      {project.year}
                    </p>
                    <p data-list-grid-fade="list" className={styles.description}>
                      {project.description}
                    </p>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
