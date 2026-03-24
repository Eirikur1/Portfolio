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
  wip?: boolean;
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
    image: '/Pizzaport-03-24-2026_12_23_AM.png',
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
    tags: ['Design', 'Branding', 'Identity', 'Posters', 'Merch', 'Illustrator'],
    accent: '#e6bf98',
    image: '/d35dabf2-1.png',
    featured: true,
  },
  {
    id: '03',
    title: 'Recipe Finder',
    category: 'Development',
    year: '2025',
    description:
      'A school project — enter the ingredients you have at home and get matching recipes. Designed and built to solve a real everyday problem.',
    tags: ['Design', 'Motion', 'HTML', 'CSS', 'JavaScript', 'API'],
    accent: '#5182bc',
    image: '/menu-app.png',
    link: 'https://eirikur1.github.io/Hopaverkefni4/',
    featured: true,
  },
  {
    id: '04',
    title: 'Venuu',
    category: 'Development',
    year: '2025',
    description:
      'A local event finder app for Reykjavík, pulling live data from Reykjavíkurborg APIs to surface events happening near you. Designed and built from scratch.',
    tags: ['Design', 'Motion', 'JavaScript', 'API', 'Reykjavíkurborg'],
    accent: '#dc3c24',
    image: '/venuu.png',
    link: 'https://eirikur1.github.io/hopaverkefni2/',
    featured: false,
  },
  {
    id: '05',
    title: 'Krunk',
    category: 'Development',
    year: '2026',
    description: 'A group project. Handled the development side, building out the app and connecting the necessary features.',
    tags: ['Development', 'React', 'TypeScript'],
    accent: '#e6bf98',
    image: '/krunk-app.png',
    link: 'https://krunk-eight.vercel.app/login',
    featured: false,
    wip: false,
  },
  {
    id: '06',
    title: 'Coming soon',
    category: 'Development',
    year: '2026',
    description: 'Something new in the works. Check back soon.',
    tags: [],
    accent: '#5182bc',
    featured: false,
    wip: true,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
