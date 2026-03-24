export type ProjectCategory = 'Design' | 'Development' | 'Branding' | 'Motion';

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  year: string;
  description: string;
  tags: string[];
  accent: string;
  image?: string;
  link?: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: '01',
    title: 'Pizzaport.is',
    category: 'Development',
    year: '2024',
    description:
      'Designed and developed the full website for Pizzaport, including a live online ordering system and an event booking feature, built and connected end to end.',
    tags: ['Design', 'Development', 'Ordering System', 'Event Booking'],
    accent: '#dc3c24',
    link: 'https://pizzaport.is',
    featured: true,
  },
  {
    id: '02',
    title: 'Pizzaport Branding',
    category: 'Branding',
    year: '2024',
    description:
      'Full brand identity for Pizzaport, covering logo, visual language, posters, and merch. Built to feel bold, local, and memorable.',
    tags: ['Branding', 'Identity', 'Posters', 'Merch', 'Illustrator'],
    accent: '#e6bf98',
    image: '/d35dabf2-1.png',
    featured: true,
  },
  {
    id: '03',
    title: 'Pulse Dashboard',
    category: 'Development',
    year: '2024',
    description:
      'Real-time analytics dashboard for a B2B SaaS product. Built with React, TypeScript, and WebSockets.',
    tags: ['React', 'TypeScript', 'WebSockets'],
    accent: '#5182bc',
    featured: true,
  },
  {
    id: '04',
    title: 'Dusk',
    category: 'Motion',
    year: '2024',
    description:
      'Short-form motion piece exploring the intersection of ambient music and generative animation.',
    tags: ['After Effects', 'WebGL', 'Audio'],
    accent: '#dc3c24',
    featured: false,
  },
  {
    id: '05',
    title: 'Terrain',
    category: 'Design',
    year: '2024',
    description:
      'Product design for an outdoor equipment e-commerce platform. Mobile-first, conversion-focused.',
    tags: ['UX', 'Figma', 'Prototyping'],
    accent: '#e6bf98',
    featured: false,
  },
  {
    id: '06',
    title: 'Chord',
    category: 'Development',
    year: '2023',
    description:
      'Collaborative playlist app with real-time sync. Built as a side project to explore multiplayer UX patterns.',
    tags: ['Next.js', 'Supabase', 'TypeScript'],
    accent: '#5182bc',
    featured: false,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
