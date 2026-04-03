export interface Project {
  id: string;
  title: string;
  hook: string;
  description: string;
  bullets: string[];
  tech: string[];
  link: string;
  linkLabel: string;
  featured: boolean;
  screenshot?: string;
}

export const projects: Project[] = [
  {
    id: 'reviv',
    title: 'REVIV',
    hook: '🏆 DonsHack \'26 2nd Place Winner — community-driven environmental cleanup platform with an interactive 3D globe.',
    description: 'REVIV (Real-Time Environmental Visualization & Impact Volunteering) connects people with local places that need cleanup help. Users discover litter reports on an interactive map, create or join cleanup events, and track their community impact.',
    bullets: [
      'Interactive 3D globe that switches to street map view on zoom, with real-time litter report markers, severity color coding, and seamless zoom from global to street level.',
      'Pre-trained ML model that scans user uploaded pictures to determine trash severity in the area.',
      'Full-stack: React 18 + Vite frontend; FastAPI Python backend with MongoDB GeoJSON geospatial queries.',
      'Complete event lifecycle — create/join cleanups with volunteer caps, waitlists, post-event confirmation, and an in-app notification system.',
    ],
    tech: ['React', 'FastAPI', 'Python', 'MongoDB', 'Docker', 'Railway'],
    link: 'https://reviv.up.railway.app/',
    linkLabel: 'View Live',
    featured: true,
    screenshot: '/images/screenshot-reviv.png',
  },
  {
    id: 'carbon',
    title: 'Carbon in Context',
    hook: 'Visualizes greenhouse gas emissions through intuitive real-world comparisons.',
    description: 'Carbon in Context helps users understand greenhouse gas emissions by translating abstract numbers into everyday metrics, eliminating greenwashing and misinformation.',
    bullets: [
      'Features real-world metaphors including "miles driven" and "hours of Netflix watched".',
      'Implements a choropleth map of the USA with CO₂ emissions per state.',
      'Provides access to Project Drawdown\'s climate solutions and open emissions data.',
    ],
    tech: ['Python', 'Flask', 'JavaScript', 'HTML5', 'CSS', 'PostgreSQL', 'Railway', 'Cloudflare'],
    link: 'https://carbonincontext.com',
    linkLabel: 'View Live',
    featured: true,
    screenshot: '/images/screenshot-cic.png',
  },
  {
    id: 'hirearchy',
    title: 'Hirearchy',
    hook: 'Full-stack job application tracker with secure auth and Dockerization.',
    description: 'Hirearchy helps users neatly organize and keep track of jobs they applied to, with reminders and a clean dashboard.',
    bullets: [
      'Includes a reminders tab for keeping track of personal notes, and sorting/searching through applications.',
      'Built with Java Spring Boot backend, JavaScript/HTML/CSS frontend, and MongoDB database.',
      'Deployed with Docker containers for easy reproducible environments.',
      'Features secure login using Auth0 with OAuth 2.0.',
    ],
    tech: ['Java', 'Spring Boot', 'JavaScript', 'HTML5', 'CSS', 'MongoDB', 'Auth0', 'Docker'],
    link: 'https://github.com/mlubarsky/Hirearchy',
    linkLabel: 'View on GitHub',
    featured: true,
    screenshot: '/images/screenshot-hirearchy.png',
  },
  {
    id: 'search-engine',
    title: 'Search Engine',
    hook: 'Full-stack search engine with a multithreaded web crawler.',
    description: 'A search engine built from scratch in 2,000 SLOC using Apache OpenNLP, TF-IDF result rankings, HTTP, Eclipse Jetty, servlets, and Apache Maven.',
    bullets: [
      'Backend written in Java; frontend written in HTML/CSS and JavaScript.',
      'Implements a custom inverted index data structure for fast lookups.',
      'Multithreaded web crawler supporting thousands of pages.',
    ],
    tech: ['Java', 'JavaScript', 'HTML5', 'Bulma', 'Eclipse Jetty', 'Apache Maven'],
    link: '/images/search-engine-demo.mp4',
    linkLabel: 'Watch Demo',
    featured: false,
  },
  {
    id: 'aqi-predictor',
    title: 'AQI Predictor',
    hook: 'Long Short-Term Memory (LSTM) neural network predicts SF air quality index with 87% accuracy.',
    description: 'A predictive time series model using an LSTM recurrent neural network to predict San Francisco\'s AQI from historical weather and pollution data.',
    bullets: [
      'Built with TensorFlow, Scikit-learn, Pandas, NumPy, and Matplotlib.',
      'Achieved 87% prediction accuracy after training and validation.',
      'Visualizes real vs. predicted AQI values side by side.',
    ],
    tech: ['Python', 'TensorFlow', 'Scikit-learn', 'Pandas', 'NumPy', 'Jupyter'],
    link: 'https://github.com/mlubarsky/AQI-Predictor',
    linkLabel: 'View on GitHub',
    featured: false,
  },
  {
    id: 'network-compression',
    title: 'Network Compression Detection',
    hook: 'Client/server that detects network link compression via packet analysis.',
    description: 'Client/server and standalone applications that use network sockets to detect whether there is compression on a network link.',
    bullets: [
      'All 3 applications written in C; WireShark for packet inspection, GDB for debugging.',
      'Installed Linux images on Oracle VM VirtualBox machines used as client/server.',
    ],
    tech: ['C', 'Ubuntu', 'WireShark', 'Oracle VirtualBox'],
    link: 'https://github.com/mlubarsky/Network-Compression-Detection',
    linkLabel: 'View on GitHub',
    featured: false,
  },
  {
    id: 'riscv-emulator',
    title: 'RISC-V Emulator',
    hook: 'Full RISC-V ISA emulator with direct mapped and set associative cache in C.',
    description: 'An emulator for the RISC-V instruction set architecture that performs assembly instructions and analyzes instruction usage in emulated C programs.',
    bullets: [
      'Written in C, debugged with GDB.',
      'Supports most RISC-V instructions.',
      'Implements direct mapped and set associative cache simulation.',
    ],
    tech: ['C', 'Ubuntu', 'RISC-V'],
    link: 'https://github.com/mlubarsky/RISCV-V-Emulator',
    linkLabel: 'View on GitHub',
    featured: false,
  },
];
