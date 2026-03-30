const DEVICONS = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';
const SIMPLEICONS = 'https://cdn.simpleicons.org';

export interface TechIcon {
  src: string;
  /** Apply brightness(0) invert(1) in dark mode so dark SVGs become white */
  invert?: boolean;
}

export const techIconMap: Record<string, TechIcon> = {
  // ── Devicons (colored, visible on dark bg) ──────────────────────────────
  'React':        { src: `${DEVICONS}/react/react-original.svg` },
  'FastAPI':      { src: `${DEVICONS}/fastapi/fastapi-original.svg` },
  'Python':       { src: `${DEVICONS}/python/python-original.svg` },
  'MongoDB':      { src: `${DEVICONS}/mongodb/mongodb-original.svg` },
  'Docker':       { src: `${DEVICONS}/docker/docker-original.svg` },
  'JavaScript':   { src: `${DEVICONS}/javascript/javascript-original.svg` },
  'HTML5':        { src: `${DEVICONS}/html5/html5-original.svg` },
  'CSS':          { src: `${DEVICONS}/css3/css3-original.svg` },
  'PostgreSQL':   { src: `${DEVICONS}/postgresql/postgresql-original.svg` },
  'Java':         { src: `${DEVICONS}/java/java-original.svg` },
  'Spring Boot':  { src: `${DEVICONS}/spring/spring-original.svg` },
  'TensorFlow':   { src: `${DEVICONS}/tensorflow/tensorflow-original.svg` },
  'Scikit-learn': { src: `${DEVICONS}/scikitlearn/scikitlearn-original.svg` },
  'Pandas':       { src: `${DEVICONS}/pandas/pandas-original.svg` },
  'NumPy':        { src: `${DEVICONS}/numpy/numpy-original.svg` },
  'Jupyter':      { src: `${DEVICONS}/jupyter/jupyter-original.svg` },
  'C':            { src: `${DEVICONS}/c/c-original.svg` },
  'Ubuntu':       { src: `${DEVICONS}/ubuntu/ubuntu-plain.svg` },
  'Bulma':        { src: `${DEVICONS}/bulma/bulma-plain.svg` },
  'Auth0':        { src: `${SIMPLEICONS}/auth0` },               // orange-red — visible on dark
  // Flask's devicon is a black SVG — invert to white on dark bg
  'Flask':        { src: `${DEVICONS}/flask/flask-original.svg`, invert: true },

  // ── Simple Icons (for things not in devicons) ───────────────────────────
  'Cloudflare':      { src: `${SIMPLEICONS}/cloudflare` },       // orange  — visible on dark
  'Apache Maven':    { src: `${SIMPLEICONS}/apachemaven` },       // red     — visible on dark
  'Railway':         { src: `${SIMPLEICONS}/railway`, invert: true }, // black  — invert to white
  'WireShark':       { src: `${SIMPLEICONS}/wireshark` },         // blue    — visible on dark
  'Oracle VirtualBox': { src: `${SIMPLEICONS}/virtualbox`, invert: true },
  'RISC-V':          { src: `${SIMPLEICONS}/riscv`, invert: true },
  'Eclipse Jetty': { src: `${SIMPLEICONS}/eclipsejetty` },
  // GDB has no icon on Devicons or Simple Icons — text fallback
};

export function getTechIcon(tech: string): TechIcon | undefined {
  return techIconMap[tech];
}
