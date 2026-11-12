export interface SkillTile {
  id: string;
  code: string;
  name: string;
  category: 'Languages' | 'Backend' | 'Frontend' | 'Database & AI' | 'Tools';
  bg: string;
  fg: string;
  accent: string;
  summary: string;
  usage: string;
}

export interface SkillCategory {
  category: 'Languages' | 'Backend' | 'Frontend' | 'Database & AI' | 'Tools';
  items: string[];
  note: string;
}

export interface PortalTab {
  id: 'student' | 'recruiter' | 'admin';
  label: string;
  roleTitle: string;
  summary: string;
  capabilities: string[];
  stackUsed: string[];
}

export interface SnapshotCard {
  id: string;
  title: string;
  subtitle: string;
  tiltClass: string;
  tag: string;
  metrics: string;
  description: string;
  highlights: string[];
  previewLines: { label: string; value: string }[];
}

export const PROFILE = {
  fullName: 'Bayana Reddy Venkata Bavadesh Kumar',
  shortName: 'Bhavadesh Bayana',
  role: 'Software Developer',
  discipline: 'Computer Science · AI & ML',
  location: 'Bengaluru, Karnataka',
  phone: '9515016091',
  email: 'bhavadeshbayana9@gmail.com',
  year: '2026',
  portraitPath: '/assets/aistudio/Professional_Young_Man_Headshot_da791737.png',
  bioParagraphs: [
    "Hi, I'm Bayana Reddy Venkata Bavadesh Kumar — a B.Tech Computer Science & Engineering (AI & ML) student at Jain University, graduating in 2029.",
    'I build full-stack web systems where clean backend architecture meets practical AI. Recently, I engineered Skill Passport, an end-to-end AI career platform with PDF/DOCX resume parsing, weighted role-match scoring, and personalized learning roadmaps.',
    'Currently focused on entry-level software development opportunities and internships involving Python, FastAPI, database modeling, REST APIs, and Google Gemini API integrations.',
  ],
};

export const EDUCATION = {
  degree: 'B.Tech in Computer Science and Engineering (AI & ML)',
  institution: 'Jain University',
  expected: 'Expected 2029',
  milestones: [
    { label: 'B.Tech Sem 1–2', value: '8.0 CGPA', detail: 'CSE (AI & ML) · Jain University' },
    { label: 'Class 12', value: '96.2%', detail: 'Higher Secondary Academic Record' },
    { label: 'Class 10', value: '93.0%', detail: 'Secondary School Academic Record' },
  ],
};

export const SKILL_TILES: SkillTile[] = [
  {
    id: 'python',
    code: 'Py',
    name: 'Python',
    category: 'Languages',
    bg: '#102A43',
    fg: '#F7C948',
    accent: '#38BDF8',
    summary: 'Primary backend & AI engineering language',
    usage: 'Powering FastAPI endpoints, PyMuPDF resume extraction, and local NLP fallback pipelines in Skill Passport.',
  },
  {
    id: 'fastapi',
    code: 'Fa',
    name: 'FastAPI',
    category: 'Backend',
    bg: '#064E3B',
    fg: '#6EE7B7',
    accent: '#10B981',
    summary: 'High-performance REST API architecture',
    usage: 'Designed multi-role REST APIs with JWT authentication, password hashing, and 15 automated test suites.',
  },
  {
    id: 'gemini',
    code: 'Ai',
    name: 'Gemini API',
    category: 'Database & AI',
    bg: '#2D1115',
    fg: '#FDA4AF',
    accent: '#E11D48',
    summary: 'Google Gemini API + local NLP fallback',
    usage: 'Generates tailored career recommendations, skill-gap insights, and dynamic learning roadmaps from parsed resumes.',
  },
  {
    id: 'java',
    code: 'Jv',
    name: 'Java & C',
    category: 'Languages',
    bg: '#1E1B4B',
    fg: '#C7D2FE',
    accent: '#818CF8',
    summary: 'Core object-oriented & systems programming',
    usage: 'Strong algorithmic foundations in data structures, memory awareness in C, and OOP design in Java.',
  },
  {
    id: 'js',
    code: 'Js',
    name: 'JavaScript',
    category: 'Frontend',
    bg: '#18181B',
    fg: '#FDE047',
    accent: '#FACC15',
    summary: 'Interactive frontend & Tailwind CSS interfaces',
    usage: 'Built responsive multi-portal user workflows using HTML, CSS, Tailwind CSS, and modern JavaScript.',
  },
  {
    id: 'docker',
    code: 'Dk',
    name: 'Docker',
    category: 'Tools',
    bg: '#0C4A6E',
    fg: '#BAE6FD',
    accent: '#38BDF8',
    summary: 'Containerized deployment & SQLite persistence',
    usage: 'Packaged backend services, SQLAlchemy/SQLite databases, and test runners for reproducible environments.',
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: 'Languages',
    items: ['Python', 'Java', 'C', 'JavaScript'],
    note: 'Core backend logic, OOP principles, systems fundamentals, and browser interactivity.',
  },
  {
    category: 'Backend',
    items: ['FastAPI', 'REST APIs'],
    note: 'JWT auth, password hashing, RBAC routing, and automated endpoint testing.',
  },
  {
    category: 'Frontend',
    items: ['HTML', 'CSS', 'Tailwind CSS'],
    note: 'Structured semantic layouts, responsive dashboards, and utility-first styling.',
  },
  {
    category: 'Database & AI',
    items: ['SQLite', 'SQLAlchemy', 'Google Gemini API'],
    note: 'Relational ORM modeling paired with LLM reasoning and deterministic NLP fallbacks.',
  },
  {
    category: 'Tools',
    items: ['PyMuPDF', 'Docker'],
    note: 'High-speed PDF/DOCX document parsing and reproducible container packaging.',
  },
];

export const SKILL_PASSPORT_PORTALS: PortalTab[] = [
  {
    id: 'student',
    label: 'Student Portal',
    roleTitle: 'AI Resume Parsing & Personalized Roadmaps',
    summary:
      'Students upload PDF or DOCX resumes to automatically extract skills, projects, and certifications, uncover skill gaps, and follow custom learning roadmaps.',
    capabilities: [
      'PDF and DOCX resume parsing via PyMuPDF to structure skills, projects, and certifications.',
      'Weighted role-match scoring engine comparing candidate profiles against target job requirements.',
      'AI-generated improvement suggestions and learning roadmaps via Google Gemini API with local NLP fallback.',
      'Interactive progress tracking and direct job & internship application management.',
    ],
    stackUsed: ['Python', 'PyMuPDF', 'Google Gemini API', 'Local NLP Fallback'],
  },
  {
    id: 'recruiter',
    label: 'Recruiter Portal',
    roleTitle: 'Weighted Candidate Matching & Pipeline Tracking',
    summary:
      'Recruiters evaluate candidates through transparent weighted role-match scores and skill-gap diagnostics rather than blind keyword filtering.',
    capabilities: [
      'Role-based access control separating recruiter workflows from student and admin operations.',
      'Weighted skill-match breakdowns highlighting core strengths and missing competencies.',
      'End-to-end job and internship application review with structured status updates.',
      'Consistent REST API responses backed by SQLAlchemy relational models.',
    ],
    stackUsed: ['FastAPI', 'REST APIs', 'SQLAlchemy', 'SQLite'],
  },
  {
    id: 'admin',
    label: 'Administrator Portal',
    roleTitle: 'RBAC Governance, Testing & Containerization',
    summary:
      'Administrators oversee platform integrity, user access permissions, and automated backend reliability across all portals.',
    capabilities: [
      'JWT authentication with secure password hashing and strict role-based access control.',
      '15 automated tests validating authentication, parsing accuracy, and core API endpoints.',
      'Containerized deployment workflow via Docker for consistent local and cloud execution.',
      'Clean SQLite and SQLAlchemy schema supporting multi-portal relational state.',
    ],
    stackUsed: ['JWT Auth', '15 Automated Tests', 'Docker', 'SQLite'],
  },
];

export const PROJECT_SNAPSHOTS: SnapshotCard[] = [
  {
    id: 'parser',
    title: 'Resume Parser & Match Engine',
    subtitle: 'PyMuPDF · Weighted Role Scoring',
    tiltClass: '-rotate-2',
    tag: '01 / DOCUMENT INTELLIGENCE',
    metrics: 'PDF & DOCX · Skill-Gap Insights',
    description:
      'Extracts structured skills, projects, and certifications directly from uploaded PDF and DOCX resumes, then computes weighted role-match percentages with actionable skill-gap analysis.',
    highlights: [
      'Supports both PDF (PyMuPDF) and DOCX document formats',
      'Extracts skills, academic projects, and certifications cleanly',
      'Calculates transparent weighted role-match scores',
    ],
    previewLines: [
      { label: 'Input Formats', value: 'PDF / DOCX' },
      { label: 'Parser Engine', value: 'PyMuPDF' },
      { label: 'Output', value: 'Weighted Match + Gaps' },
    ],
  },
  {
    id: 'gemini-pipeline',
    title: 'Gemini AI + NLP Fallback',
    subtitle: 'Resilient Roadmap Generation',
    tiltClass: 'rotate-1',
    tag: '02 / AI ORCHESTRATION',
    metrics: 'Gemini API · Deterministic Fallback',
    description:
      'Pairs the Google Gemini API for rich career suggestions and personalized learning roadmaps with a local NLP fallback layer so core guidance never breaks offline or under rate limits.',
    highlights: [
      'Generates tailored resume improvement suggestions via Gemini API',
      'Builds step-by-step learning roadmaps with progress tracking',
      'Seamless local NLP fallback guarantees zero single-point failure',
    ],
    previewLines: [
      { label: 'Primary AI', value: 'Google Gemini API' },
      { label: 'Resilience', value: 'Local NLP Fallback' },
      { label: 'Tracking', value: 'Roadmap Milestones' },
    ],
  },
  {
    id: 'backend-docker',
    title: 'FastAPI, RBAC & 15 Tests',
    subtitle: 'JWT · SQLAlchemy · Docker',
    tiltClass: 'rotate-2',
    tag: '03 / BACKEND RELIABILITY',
    metrics: '3 Portals · 15 Automated Tests',
    description:
      'Engineered a clean FastAPI REST backend with SQLite and SQLAlchemy ORM, secured by JWT authentication, hashed passwords, 3-role RBAC, 15 automated tests, and Docker support.',
    highlights: [
      'Dedicated Student, Recruiter, and Administrator portals',
      'JWT authentication and cryptographic password hashing',
      '15 automated tests + full Docker container support',
    ],
    previewLines: [
      { label: 'API Layer', value: 'FastAPI + SQLAlchemy' },
      { label: 'Verification', value: '15 Automated Tests' },
      { label: 'Packaging', value: 'Docker Ready' },
    ],
  },
];

export const ACHIEVEMENTS = [
  {
    period: 'SIH Selection Stage',
    title: 'Smart India Hackathon (SIH)',
    role: 'Qualified Participant',
    detail:
      'Collaborated with a team to conceptualize, architect, and pitch a software solution that qualified through the selection evaluation stage.',
  },
  {
    period: 'Flagship Build',
    title: 'Skill Passport Platform',
    role: 'Full-Stack AI Developer',
    detail:
      'Designed and built a 3-portal AI career platform using FastAPI, SQLite, SQLAlchemy, PyMuPDF, Google Gemini API, and Docker with 15 automated tests.',
  },
];
