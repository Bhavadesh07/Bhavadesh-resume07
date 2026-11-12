import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Award,
  Check,
  Copy,
  FileText,
  GraduationCap,
  Mail,
  MapPin,
  Menu,
  Phone,
  Send,
  X,
} from 'lucide-react';
import { CutoutPortrait } from './components/CutoutPortrait';
import { GeometricMarks } from './components/GeometricMarks';
import { ResumeModal } from './components/ResumeModal';
import { SkillPassportShowcase } from './components/SkillPassportShowcase';
import { TornPaperBand } from './components/TornPaperBand';
import {
  ACHIEVEMENTS,
  EDUCATION,
  PROFILE,
  SKILL_CATEGORIES,
  SKILL_TILES,
  type SkillCategory,
} from './data/portfolioData';

export default function App() {
  const [selectedTileId, setSelectedTileId] = useState<string>(SKILL_TILES[0].id);
  const [skillFilter, setSkillFilter] = useState<'All' | SkillCategory['category']>('All');
  const [resumeOpen, setResumeOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedField, setCopiedField] = useState<'email' | 'phone' | null>(null);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const selectedTile = SKILL_TILES.find((t) => t.id === selectedTileId) ?? SKILL_TILES[0];

  const filteredCategories =
    skillFilter === 'All'
      ? SKILL_CATEGORIES
      : SKILL_CATEGORIES.filter((c) => c.category === skillFilter);

  const handleCopy = async (value: string, field: 'email' | 'phone') => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = value;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactMessage.trim()) return;
    const subject = encodeURIComponent(`Portfolio Inquiry from ${contactName.trim()}`);
    const body = encodeURIComponent(
      `Name: ${contactName.trim()}\nEmail: ${contactEmail.trim() || 'Not provided'}\n\n${contactMessage.trim()}`
    );
    window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 4000);
  };

  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#work', label: 'Work' },
    { href: '#skills', label: 'Skills' },
    { href: '#education', label: 'Education' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <div className="min-h-screen paper-grid-bg relative text-[#111111]">
      {/* Subtle paper grain layer */}
      <div className="fixed inset-0 paper-grain pointer-events-none z-0" aria-hidden="true" />

      {/* Top Navigation Bar — Strict 3-Zone Contract */}
      <header className="sticky top-0 z-40 bg-[#F2F2EF]/92 backdrop-blur-md border-b border-[#18181B]/12 no-print">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 h-14 sm:h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single-line Brand Wordmark */}
          <a
            href="#top"
            className="font-display text-base sm:text-lg tracking-tight text-[#111111] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E11D48]"
          >
            {PROFILE.shortName}
          </a>

          {/* Zone 2: 5 Single-line Nav Links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-[#52525B]"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-[#111111] hover:underline underline-offset-4 decoration-[#E11D48] decoration-2 transition-colors whitespace-nowrap shrink-0"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1 Primary Action + Mobile Menu Trigger */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setResumeOpen(true)}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#111111] hover:bg-[#E11D48] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E11D48]"
            >
              View Resume
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              className="md:hidden w-10 h-10 flex items-center justify-center border border-[#D4D4CE] bg-[#FAFAF8] text-[#111111]"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Nav */}
        {mobileMenuOpen && (
          <nav
            aria-label="Mobile Navigation"
            className="md:hidden border-t border-[#D4D4CE] bg-[#FAFAF8] px-5 py-4 flex flex-col gap-3"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-[#111111] py-1.5 border-b border-[#E4E4DE] last:border-b-0"
              >
                {link.label}
              </a>
            ))}
          </nav>
        )}
      </header>

      <main id="top" className="relative z-10">
        {/* HERO MASTHEAD — Reference Video Cover Lockup */}
        <section className="max-w-[1200px] mx-auto px-5 sm:px-8 pt-10 sm:pt-14 pb-8 flex flex-col items-center">
          <div className="inline-block max-w-full">
            {/* Masthead Overline Metadata aligned flush to PORTFOLIO lockup */}
            <div className="flex items-center justify-between gap-4 text-[11px] sm:text-sm font-bold tracking-wide uppercase text-[#18181B] mb-1.5">
              <span>SOFTWARE DEVELOPER / AI &amp; ML</span>
              <span className="font-mono-tabular">{PROFILE.year}</span>
            </div>

            {/* Giant Editorial PORTFOLIO Masthead with Portrait Stamp inside the second 'O' */}
            <div className="relative flex items-center justify-center select-none py-1">
              <h1
                className="font-display tracking-[-0.04em] leading-[0.88] text-[#111111] text-center flex items-center justify-center flex-nowrap whitespace-nowrap"
                style={{ fontSize: 'clamp(3rem, 11.8vw, 9.2rem)' }}
              >
                <span>PORTF</span>
                <span className="relative inline-flex items-center justify-center mx-[0.02em]">
                  {/* Circular Graphic Portrait Emblem replacing the second 'O' */}
                  <motion.span
                    animate={{ rotate: [-3, 3, -3] }}
                    transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="inline-flex items-center justify-center rounded-full border-[3px] sm:border-[5px] border-[#111111] bg-[#FAFAF8] overflow-hidden shadow-sm relative"
                    style={{
                      width: '0.88em',
                      height: '0.88em',
                    }}
                  >
                    <CutoutPortrait
                      src={PROFILE.portraitPath}
                      alt={PROFILE.shortName}
                      variant="badge"
                      className="w-full h-full object-cover object-top scale-110 contrast-125 grayscale"
                    />
                  </motion.span>
                  {/* Hand-drawn curved arrow + handwritten signature pointing to the emblem, matching video */}
                  <div className="hidden sm:flex items-center gap-1.5 absolute -bottom-[0.46em] left-[45%] pointer-events-none">
                    <svg
                      viewBox="0 0 56 48"
                      className="w-[0.36em] h-[0.32em] text-[#111111] shrink-0"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M36 40 C18 42, 12 28, 14 8"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M7 16 L14 6 L22 16"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="font-signature text-xl md:text-2xl text-[#111111] whitespace-nowrap translate-y-2 -rotate-2">
                      {PROFILE.shortName}
                    </span>
                  </div>
                </span>
                <span>LIO</span>
              </h1>
            </div>
          </div>

          {/* Signature Kinetic 3-Symbol Editorial Divider */}
          <div className="mt-10 sm:mt-16 flex justify-center">
            <GeometricMarks color="#111111" size={26} animated />
          </div>
        </section>

        {/* EDITORIAL 3-COLUMN PROFILE SPREAD (Crop-Box Portrait | HELLO & EDUCATION | SKILLS & HIGHLIGHTS) */}
        <section
          id="about"
          className="max-w-[1200px] mx-auto px-5 sm:px-8 pt-6 pb-10 md:pb-14"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-9 items-start">
            {/* LEFT COLUMN: Kinetic Crimson Bounding-Box Portrait Frame (direct video motif) */}
            <div className="lg:col-span-4 flex flex-col">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="relative border border-[#DC2626] bg-[#FAFAF8] p-3 sm:p-4 group"
              >
                {/* 8 Editorial Crop-Box Handles */}
                <span className="absolute -top-1.5 -left-1.5 w-2.5 h-2.5 bg-white border border-[#DC2626] transition-transform duration-200 group-hover:scale-125" />
                <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-white border border-[#DC2626]" />
                <span className="absolute -top-1.5 -right-1.5 w-2.5 h-2.5 bg-white border border-[#DC2626] transition-transform duration-200 group-hover:scale-125" />
                <span className="absolute top-1/2 -translate-y-1/2 -left-1.5 w-2.5 h-2.5 bg-white border border-[#DC2626]" />
                <span className="absolute top-1/2 -translate-y-1/2 -right-1.5 w-2.5 h-2.5 bg-white border border-[#DC2626]" />
                <span className="absolute -bottom-1.5 -left-1.5 w-2.5 h-2.5 bg-white border border-[#DC2626] transition-transform duration-200 group-hover:scale-125" />
                <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-white border border-[#DC2626]" />
                <span className="absolute -bottom-1.5 -right-1.5 w-2.5 h-2.5 bg-white border border-[#DC2626] transition-transform duration-200 group-hover:scale-125" />

                <div className="aspect-[4/5] w-full overflow-hidden bg-[#ECECE7] flex items-end justify-center relative">
                  <motion.div
                    initial={{ x: -24, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-full"
                  >
                    <CutoutPortrait
                      src={PROFILE.portraitPath}
                      alt={`${PROFILE.fullName} portrait`}
                      variant="clean"
                      className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </motion.div>
                </div>
              </motion.div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-[#52525B]">
                <span className="inline-flex items-center gap-1.5 font-medium text-[#111111]">
                  <MapPin className="w-3.5 h-3.5 text-[#E11D48]" aria-hidden="true" />
                  {PROFILE.location}
                </span>
                <span>Open to SWE Internships</span>
              </div>
            </div>

            {/* CENTER COLUMN: HELLO Bio + EDUCATION */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <h2 className="font-display text-4xl sm:text-5xl tracking-tight text-[#111111]">
                  HELLO
                </h2>
                <div className="mt-4 space-y-3.5 text-[15px] leading-relaxed text-[#27272A]">
                  {PROFILE.bioParagraphs.map((para, idx) => (
                    <p key={idx} className={idx === 0 ? 'font-semibold text-[#111111]' : ''}>
                      {para}
                    </p>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-[#18181B]/15">
                <h3 className="font-display text-2xl sm:text-3xl tracking-tight text-[#111111]">
                  EDUCATION
                </h3>
                <div className="mt-3 space-y-1">
                  <p className="text-sm font-bold text-[#111111]">{EDUCATION.degree}</p>
                  <p className="text-sm text-[#3F3F46]">
                    {EDUCATION.institution} · {EDUCATION.expected}
                  </p>
                  <p className="text-xs font-mono-tabular text-[#52525B] pt-1">
                    Semester 1–2: 8.0 CGPA · Class 12: 96.2% · Class 10: 93%
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Kinetic 2x3 SKILLS Tiles + HIGHLIGHTS */}
            <div className="lg:col-span-3 space-y-8">
              <div>
                <h3 className="font-display text-2xl sm:text-3xl tracking-tight text-[#111111]">
                  SKILLS
                </h3>
                <p className="text-xs text-[#52525B] mt-1">
                  Select a tile to inspect usage
                </p>

                {/* Signature 2x3 Square App-Tile Grid with subtle kinetic stagger */}
                <div className="mt-3 grid grid-cols-3 gap-2.5 max-w-[240px]">
                  {SKILL_TILES.map((tile, idx) => {
                    const isSelected = tile.id === selectedTileId;
                    return (
                      <motion.button
                        key={tile.id}
                        type="button"
                        onClick={() => setSelectedTileId(tile.id)}
                        aria-pressed={isSelected}
                        title={tile.name}
                        whileHover={{ y: -3, rotate: idx % 2 === 0 ? -2 : 2 }}
                        whileTap={{ scale: 0.95 }}
                        animate={{
                          y: [0, -2, 0],
                        }}
                        transition={{
                          y: {
                            duration: 2.8,
                            repeat: Infinity,
                            repeatDelay: 1.6,
                            delay: idx * 0.28,
                            ease: 'easeInOut',
                          },
                        }}
                        style={{
                          backgroundColor: tile.bg,
                          color: tile.fg,
                        }}
                        className={`aspect-square rounded-xl flex flex-col items-center justify-center transition-shadow duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E11D48] ${
                          isSelected
                            ? 'ring-2 ring-[#E11D48] ring-offset-2 ring-offset-[#F2F2EF] shadow-md'
                            : 'opacity-95 hover:opacity-100'
                        }`}
                      >
                        <span className="font-heading text-xl font-extrabold tracking-tight leading-none">
                          {tile.code}
                        </span>
                        <span className="text-[10px] font-medium opacity-80 mt-1">
                          {tile.name.split(' ')[0]}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Active Skill Detail Readout */}
                <div className="mt-3.5 bg-[#FAFAF8] border border-[#D4D4CE] p-3.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-[#111111]">{selectedTile.name}</span>
                    <span className="text-[11px] font-mono-tabular text-[#E11D48]">
                      {selectedTile.category}
                    </span>
                  </div>
                  <p className="text-xs text-[#3F3F46] mt-1.5 leading-relaxed">
                    {selectedTile.usage}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-[#18181B]/15">
                <h3 className="font-display text-2xl sm:text-3xl tracking-tight text-[#111111]">
                  HIGHLIGHTS
                </h3>
                <div className="mt-3 space-y-4">
                  {ACHIEVEMENTS.map((item) => (
                    <div key={item.title}>
                      <p className="text-xs font-mono-tabular text-[#E11D48] font-semibold">
                        {item.period}
                      </p>
                      <p className="text-sm font-bold text-[#111111] mt-0.5">{item.title}</p>
                      <p className="text-xs text-[#52525B]">{item.role}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SIGNATURE TORN-PAPER DARK BAND WITH RED-OUTLINED PORTRAIT */}
        <TornPaperBand />

        {/* FEATURED PROJECT: SKILL PASSPORT */}
        <SkillPassportShowcase />

        {/* TECHNICAL STACK MATRIX */}
        <section id="skills" className="max-w-[1200px] mx-auto px-5 sm:px-8 py-14 md:py-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#18181B]/15 pb-6">
            <div>
              <p className="text-xs font-medium tracking-wider uppercase text-[#52525B] mb-2">
                Engineering Capabilities
              </p>
              <h2 className="font-display text-3xl sm:text-5xl tracking-tight text-[#111111]">
                TECHNICAL STACK
              </h2>
            </div>

            {/* Interactive Category Filter Tabs */}
            <div
              className="flex flex-wrap items-center gap-1 p-1 bg-[#E6E6E0] border border-[#D4D4CE]"
              role="group"
              aria-label="Filter technical skills by category"
            >
              {(['All', 'Languages', 'Backend', 'Frontend', 'Database & AI', 'Tools'] as const).map(
                (cat) => {
                  const active = skillFilter === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSkillFilter(cat)}
                      className={`px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                        active
                          ? 'bg-[#111111] text-white'
                          : 'text-[#52525B] hover:text-[#111111]'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                }
              )}
            </div>
          </div>

          <div className="divide-y divide-[#18181B]/12 border-b border-[#18181B]/12">
            {filteredCategories.map((row) => (
              <div
                key={row.category}
                className="py-5 grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline"
              >
                <div className="md:col-span-3">
                  <span className="font-heading text-base font-bold text-[#111111]">
                    {row.category}
                  </span>
                </div>
                <div className="md:col-span-5 text-sm font-semibold text-[#111111]">
                  {row.items.map((item, idx) => (
                    <React.Fragment key={item}>
                      <span>{item}</span>
                      {idx < row.items.length - 1 && (
                        <span className="mx-2 text-[#E11D48]" aria-hidden="true">
                          ·
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
                <div className="md:col-span-4 text-xs sm:text-sm text-[#52525B] leading-relaxed">
                  {row.note}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* EDUCATION & SMART INDIA HACKATHON ACHIEVEMENT */}
        <section id="education" className="max-w-[1200px] mx-auto px-5 sm:px-8 py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Academic Milestones Card */}
            <div className="lg:col-span-7 bg-[#FAFAF8] border border-[#D4D4CE] p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#52525B]">
                  <GraduationCap className="w-4 h-4 text-[#E11D48]" aria-hidden="true" />
                  <span>Academic Record</span>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl tracking-tight text-[#111111] mt-2">
                  {EDUCATION.degree}
                </h2>
                <p className="text-sm text-[#3F3F46] mt-1">
                  {EDUCATION.institution} · {EDUCATION.expected}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-8 pt-6 border-t border-[#E4E4DE]">
                {EDUCATION.milestones.map((m) => (
                  <div key={m.label}>
                    <div className="font-display text-2xl sm:text-3xl font-mono-tabular text-[#111111]">
                      {m.value}
                    </div>
                    <div className="text-xs font-semibold text-[#111111] mt-1">{m.label}</div>
                    <div className="text-xs text-[#52525B] mt-0.5">{m.detail}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Smart India Hackathon Card */}
            <div className="lg:col-span-5 bg-[#111111] text-white p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#FDA4AF]">
                  <Award className="w-4 h-4 text-[#E11D48]" aria-hidden="true" />
                  <span>Hackathon Qualification</span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl tracking-tight text-white mt-2">
                  SMART INDIA HACKATHON
                </h3>
                <p className="text-xs font-mono-tabular text-white/70 mt-1">
                  Qualified Participant · Selection Evaluation Stage
                </p>
                <p className="text-sm text-white/85 leading-relaxed mt-5">
                  Collaborated with a cross-functional engineering team to conceptualize, architect,
                  and pitch a software solution that successfully qualified through the Smart India
                  Hackathon selection evaluation stage.
                </p>
              </div>

              <div className="mt-8 pt-5 border-t border-white/15 flex items-center justify-between text-xs text-white/70">
                <span>Team Architecture &amp; Technical Pitch</span>
                <GeometricMarks color="#E11D48" size={16} />
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="max-w-[1200px] mx-auto px-5 sm:px-8 py-14 md:py-20">
          <div className="bg-[#FAFAF8] border border-[#18181B] p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#E11D48]">
                  Get in Touch
                </p>
                <h2 className="font-display text-3xl sm:text-4xl tracking-tight text-[#111111] mt-2">
                  LET&apos;S BUILD SOMETHING USEFUL
                </h2>
                <p className="text-sm text-[#3F3F46] leading-relaxed mt-4">
                  Available for entry-level software engineering roles, AI &amp; ML internships, and
                  full-stack backend projects in Bengaluru or remote.
                </p>
              </div>

              <div className="mt-8 space-y-4">
                <div className="flex items-center justify-between gap-3 border-b border-[#E4E4DE] pb-3">
                  <a
                    href={`mailto:${PROFILE.email}`}
                    className="inline-flex items-center gap-2.5 text-sm font-medium text-[#111111] hover:text-[#E11D48] transition-colors truncate"
                  >
                    <Mail className="w-4 h-4 shrink-0 text-[#E11D48]" aria-hidden="true" />
                    <span className="truncate">{PROFILE.email}</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => handleCopy(PROFILE.email, 'email')}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium border border-[#D4D4CE] bg-white hover:bg-[#111111] hover:text-white transition-colors shrink-0"
                  >
                    {copiedField === 'email' ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between gap-3 border-b border-[#E4E4DE] pb-3">
                  <a
                    href={`tel:${PROFILE.phone}`}
                    className="inline-flex items-center gap-2.5 text-sm font-mono-tabular font-medium text-[#111111] hover:text-[#E11D48] transition-colors"
                  >
                    <Phone className="w-4 h-4 shrink-0 text-[#E11D48]" aria-hidden="true" />
                    <span>+91 {PROFILE.phone}</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => handleCopy(PROFILE.phone, 'phone')}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium border border-[#D4D4CE] bg-white hover:bg-[#111111] hover:text-white transition-colors shrink-0"
                  >
                    {copiedField === 'phone' ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setResumeOpen(true)}
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#111111] hover:text-[#E11D48] transition-colors"
                  >
                    <FileText className="w-4 h-4" aria-hidden="true" />
                    <span>Open Printable Resume</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Direct Message Form */}
            <form onSubmit={handleContactSubmit} className="lg:col-span-7 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-semibold text-[#111111] mb-1.5"
                  >
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Recruiter or collaborator name"
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#D4D4CE] focus:border-[#111111] focus:outline-none"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-semibold text-[#111111] mb-1.5"
                  >
                    Your Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#D4D4CE] focus:border-[#111111] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-semibold text-[#111111] mb-1.5"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  required
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  placeholder="Share details about an internship, software developer role, or project..."
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#D4D4CE] focus:border-[#111111] focus:outline-none resize-none"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold bg-[#111111] text-white hover:bg-[#E11D48] transition-colors whitespace-nowrap shrink-0"
                >
                  <Send className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Send Email</span>
                </button>

                {formSubmitted && (
                  <span className="text-xs font-medium text-[#111111]">
                    Opening your email client with the pre-filled message.
                  </span>
                )}
              </div>
            </form>
          </div>
        </section>
      </main>

      {/* Clean Editorial Footer */}
      <footer className="border-t border-[#18181B]/12 bg-[#ECECE7]/70 no-print">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#52525B]">
          <span>
            © {PROFILE.year} {PROFILE.fullName} · {PROFILE.location}
          </span>
          <div className="flex items-center gap-5">
            <a href="#about" className="hover:text-[#111111]">
              About
            </a>
            <a href="#work" className="hover:text-[#111111]">
              Skill Passport
            </a>
            <button
              type="button"
              onClick={() => setResumeOpen(true)}
              className="hover:text-[#111111]"
            >
              Resume
            </button>
          </div>
        </div>
      </footer>

      {/* Interactive Printable Resume Modal */}
      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </div>
  );
}
