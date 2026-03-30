export interface Role {
  company: string;
  title: string;
  logo: string;
  startDate: string;
  endDate: string;
  duration: string;
  current: boolean;
  summary: string;
  bullets: string[];
}

export const experience: Role[] = [
  {
    company: 'University of San Francisco, ITS',
    title: 'Mobile Developer',
    logo: '/images/usf-logo-green_28x28.png',
    startDate: 'Oct 2025',
    endDate: 'Present',
    duration: '6 mos',
    current: true,
    summary: "Building features within the university's mobile app, USFMobile.",
    bullets: [
      'Learning the MERN tech stack (MongoDB, Express.js, React, Node.js) and CampusM AEK.',
      'Keeping track of tickets in Jira.',
    ],
  },
  {
    company: 'Project Drawdown',
    title: 'Software Engineer Intern',
    logo: '/images/project_drawdown_logo.jpg',
    startDate: 'Jan 2025',
    endDate: 'May 2025',
    duration: '5 mos',
    current: false,
    summary: 'Built a web application that puts greenhouse gas emissions into intuitive real-world comparisons.',
    bullets: [
      'Built full-stack comparison cards to contextualize emissions via metrics like Cars Driven and Flights LA–NY.',
      'Improved UI components (search bar, header/footer) and resolved bugs for smoother UX.',
      'Led UI redesign using team-wide dot exercise to unify vision across wireframes.',
    ],
  },
  {
    company: 'University of San Francisco, ITS',
    title: 'Application Technician',
    logo: '/images/usf-logo-green_28x28.png',
    startDate: 'May 2023',
    endDate: 'May 2025',
    duration: '2 yrs',
    current: false,
    summary: 'Worked alongside admins and programmers; provided technical support for various enterprise applications.',
    bullets: [
      'Authored and updated support docs, including knowledge base articles and an outage tracker.',
      'Managed multiple ticket queues, escalating issues and following up with clients.',
      'Troubleshot enterprise apps like Banner, Canvas, Concur, Qualtrics, StarRez, and more.',
    ],
  },
  {
    company: 'University of San Francisco, ITS',
    title: 'Help Desk Technician',
    logo: '/images/usf-logo-green.png',
    startDate: 'June 2022',
    endDate: 'Apr 2023',
    duration: '10 mos',
    current: false,
    summary: 'Provided technical support for faculty, staff, and students across a wide range of applications and technologies.',
    bullets: [
      'Supported 5,000+ faculty, staff, and students via phone and walk-in troubleshooting.',
      'Managed support tickets in ServiceNow, including creation, responses, and follow-ups.',
      'Resolved issues with Wi-Fi, VPN, printing, Gmail, Canvas, Banner, Duo, and more.',
    ],
  },
];
