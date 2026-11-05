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
  video?: string;
  link?: string;
  featured: boolean;
  wip?: boolean;
  playOnHover?: boolean;
}

export const projects: Project[] = [
  {
    id: '01',
    title: 'Frystihúsið',
    category: 'Development',
    year: '2026',
    description:
      'A site for Frystihúsið, designed and built from scratch with motion and a bold editorial feel.',
    tags: ['Design', 'Development', 'Motion'],
    accent: '#101820',
    image: '/Fyrstuhusid thumbnail.webp',
    link: 'https://frystihusid-v2.vercel.app/',
    featured: true,
  },
  {
    id: '02',
    title: 'Huginn Care',
    category: 'Development',
    year: '2026',
    description:
      'A care platform designed and built for Huginn, focused on clean UX and a calm, trustworthy interface.',
    tags: ['Design', 'Development', 'UI/UX'],
    accent: '#1b2e4b',
    image: '/Huginn-Care-10-16-2026_12_38_PM.webp',
    link: 'https://huginn.care',
    featured: true,
  },
  {
    id: '03',
    title: 'Spuni',
    category: 'Development',
    year: '2026',
    description: 'A web app for Spuni, designed and built from the ground up.',
    tags: ['Design', 'Development'],
    accent: '#f4a300',
    image: '/Spuni2.webp',
    link: 'https://spuniapp.is/',
    featured: false,
  },
  {
    id: '04',
    title: 'APABIZ',
    category: 'Development',
    year: '2026',
    description: 'A daily mini-games site with new games every day, built solo from design to deployment.',
    tags: ['Design', 'Development', 'Motion', 'React', 'TypeScript', 'Supabase'],
    accent: '#00522f',
    image: '/Apabiz.webp',
    link: 'https://apabiz.games/en',
    featured: true,
    wip: true,
  },
  {
    id: '05',
    title: 'FindIceland',
    category: 'Development',
    year: '2026',
    description: 'An all-in-one stop Iceland app for tourists. Local guides, things to do, places to eat, and everything in between.',
    tags: ['React Native', 'Mobile', 'Design'],
    accent: '#0092ff',
    featured: false,
    wip: true,
  },
  {
    id: '06',
    title: 'WaterFinder',
    category: 'Development',
    year: '2026',
    description: 'A React Native app for finding water refill stations nearby. Built in collaboration with a Danish student while studying in Spain. My first React Native project and a great learning experience.',
    tags: ['React Native', 'Mobile', 'Motion', 'Design'],
    accent: '#0092ff',
    video: '/screenrecording.mp4',
    link: 'https://www.figma.com/board/ZqjHmh8rNDLgYxnMSMZCTb/WaterFinder?node-id=1-5&t=gs0iNxG3TM8LnOKk-1',
    featured: false,
  },
  {
    id: '07',
    title: 'Krunk',
    category: 'Development',
    year: '2026',
    description: 'A group project. Handled the development side, building out the app and connecting the necessary features.',
    tags: ['Development', 'React', 'TypeScript'],
    accent: '#2f2823',
    image: '/krunk-app.webp',
    link: 'https://krunk-eight.vercel.app/login',
    featured: false,
  },
  {
    id: '08',
    title: 'Recipe Finder',
    category: 'Development',
    year: '2025',
    description:
      'A school project. Enter the ingredients you have at home and get matching recipes. Designed and built to solve a real everyday problem.',
    tags: ['Design', 'Motion', 'HTML', 'CSS', 'JavaScript', 'API'],
    accent: '#7f0c00',
    image: '/menu-app.webp',
    link: 'https://eirikur1.github.io/Hopaverkefni4/',
    featured: false,
  },
  {
    id: '09',
    title: 'Venuu',
    category: 'Development',
    year: '2025',
    description:
      'A local event finder app for Reykjavík, pulling live data from Reykjavíkurborg APIs to surface events happening near you. Designed and built from scratch.',
    tags: ['Design', 'Motion', 'JavaScript', 'API', 'Reykjavíkurborg'],
    accent: '#00522f',
    image: '/venuu.webp',
    link: 'https://eirikur1.github.io/hopaverkefni2/',
    featured: false,
  },
  {
    id: '10',
    title: 'Pizzaport.is',
    category: 'Development',
    year: '2024',
    description:
      'Designed and developed the full website for Pizzaport, including a live online ordering system and an event booking feature, built and connected end to end.',
    tags: ['Design', 'Development', 'Ordering System', 'Event Booking'],
    accent: '#7f0c00',
    image: '/Pizzaport-03-24-2026_12_23_AM.webp',
    link: 'https://pizzaport.is',
    featured: true,
  },
  {
    id: '11',
    title: 'Pizzaport Branding',
    category: 'Branding',
    year: '2024',
    description:
      'Full brand identity for Pizzaport, covering logo, visual language, posters, and merch. Built to feel bold, local, and memorable.',
    tags: ['Design', 'Motion', 'Branding', 'Identity', 'Posters', 'Merch', 'Illustrator'],
    accent: '#0092ff',
    image: '/d35dabf2-1.webp',
    link: 'https://www.figma.com/board/tUMWmYxgWVQC2bMbREdlbO/Untitled?node-id=1-2&t=sru4syRu5y6gakfK-1',
    featured: true,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
