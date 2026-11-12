import React, { useEffect, useState } from 'react';
import { ArrowUpRight, CheckCircle2, Layers, ShieldCheck, Terminal, X } from 'lucide-react';
import {
  PROJECT_SNAPSHOTS,
  SKILL_PASSPORT_PORTALS,
  type SnapshotCard,
} from '../data/portfolioData';

export const SkillPassportShowcase: React.FC = () => {
  const [activePortalId, setActivePortalId] = useState<'student' | 'recruiter' | 'admin'>('student');
  const [selectedSnapshot, setSelectedSnapshot] = useState<SnapshotCard | null>(null);

  const activePortal =
    SKILL_PASSPORT_PORTALS.find((p) => p.id === activePortalId) ?? SKILL_PASSPORT_PORTALS[0];

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedSnapshot(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <section id="work" className="max-w-[1200px] mx-auto px-5 sm:px-8 py-14 md:py-20">
      {/* Editorial Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#18181B]/15 pb-8">
        <div>
          <p className="text-xs font-medium tracking-wider uppercase text-[#52525B] mb-2">
            Featured Engineering Build · Full-Stack AI Platform
          </p>
          <h2 className="font-display text-3xl sm:text-5xl tracking-tight text-[#111111]">
            SKILL PASSPORT
          </h2>
        </div>
        <div className="text-sm text-[#3F3F46] max-w-md leading-relaxed">
          An AI-powered career platform engineered with FastAPI, SQLAlchemy, PyMuPDF, and the
          Google Gemini API — complete with 3 role-based portals, 15 automated tests, and Docker
          packaging.
        </div>
      </div>

      {/* Interactive 3-Portal Architecture Explorer */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Portal Switcher + Live Architectural Summary */}
        <div className="lg:col-span-7 bg-[#FAFAF8] border border-[#D4D4CE] p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#E4E4DE]">
            <div>
              <span className="text-xs font-medium text-[#71717A]">Interactive Architecture</span>
              <h3 className="font-heading text-lg font-bold text-[#111111] mt-0.5">
                Multi-Portal RBAC System
              </h3>
            </div>

            {/* Segmented Portal Control */}
            <div
              className="inline-flex items-center p-1 bg-[#ECECE7] border border-[#D4D4CE]"
              role="tablist"
              aria-label="Skill Passport Portals"
            >
              {SKILL_PASSPORT_PORTALS.map((portal) => {
                const isActive = portal.id === activePortalId;
                return (
                  <button
                    key={portal.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActivePortalId(portal.id)}
                    className={`px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E11D48] ${
                      isActive
                        ? 'bg-[#111111] text-white'
                        : 'text-[#52525B] hover:text-[#111111]'
                    }`}
                  >
                    {portal.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-6">
            <div className="flex items-center gap-2 text-xs font-medium text-[#E11D48]">
              <ShieldCheck className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>{activePortal.roleTitle}</span>
            </div>

            <p className="mt-3 text-[15px] leading-relaxed text-[#27272A]">
              {activePortal.summary}
            </p>

            <ul className="mt-6 space-y-3">
              {activePortal.capabilities.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-[#3F3F46] leading-relaxed">
                  <CheckCircle2
                    className="w-4 h-4 text-[#111111] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-5 border-t border-[#E4E4DE] flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#52525B]">
              <span className="font-semibold text-[#111111]">Core Stack:</span>
              {activePortal.stackUsed.map((tech, idx) => (
                <React.Fragment key={tech}>
                  <span className="font-mono-tabular">{tech}</span>
                  {idx < activePortal.stackUsed.length - 1 && (
                    <span aria-hidden="true">·</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Quantitative Engineering Metrics & Highlights */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-[#111111] text-white p-6 sm:p-8">
            <div className="flex items-center justify-between border-b border-white/15 pb-4">
              <span className="text-xs font-medium text-white/70">System Proof Points</span>
              <Terminal className="w-4 h-4 text-[#E11D48]" aria-hidden="true" />
            </div>

            <div className="grid grid-cols-2 gap-6 mt-6">
              <div>
                <div className="font-display text-3xl sm:text-4xl font-mono-tabular text-white">
                  3
                </div>
                <div className="text-xs text-white/70 mt-1">
                  RBAC Portals (Student, Recruiter, Admin)
                </div>
              </div>
              <div>
                <div className="font-display text-3xl sm:text-4xl font-mono-tabular text-[#E11D48]">
                  15
                </div>
                <div className="text-xs text-white/70 mt-1">
                  Automated Backend &amp; API Tests
                </div>
              </div>
              <div>
                <div className="font-display text-2xl sm:text-3xl text-white">
                  PDF/DOCX
                </div>
                <div className="text-xs text-white/70 mt-1">
                  PyMuPDF Skill &amp; Project Extraction
                </div>
              </div>
              <div>
                <div className="font-display text-2xl sm:text-3xl text-white">
                  Docker
                </div>
                <div className="text-xs text-white/70 mt-1">
                  Containerized FastAPI + SQLite Setup
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#FAFAF8] border border-[#D4D4CE] p-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#111111]">
              <Layers className="w-4 h-4 text-[#E11D48]" aria-hidden="true" />
              <span>Resilient AI Design</span>
            </div>
            <p className="mt-2.5 text-sm text-[#3F3F46] leading-relaxed">
              Combines Google Gemini API reasoning for resume feedback and learning roadmaps with a
              local NLP fallback engine — ensuring weighted role-match scoring and skill-gap
              insights stay operational under any network condition.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Tilted Polaroid Snapshots Strip (echoing the reference bottom gallery) */}
      <div className="mt-16">
        <div className="text-center mb-10">
          <p className="text-xs font-medium tracking-wider uppercase text-[#52525B] mb-1">
            Click any snapshot to inspect technical details
          </p>
          <h3 className="font-display text-2xl sm:text-3xl tracking-tight text-[#111111]">
            THE ARCHITECTURE SNAPSHOTS
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {PROJECT_SNAPSHOTS.map((snap) => (
            <button
              key={snap.id}
              type="button"
              onClick={() => setSelectedSnapshot(snap)}
              className={`group text-left bg-white border border-[#D4D4CE] p-4 pb-6 shadow-[0_10px_28px_rgba(0,0,0,0.06)] transition-transform duration-200 hover:rotate-0 hover:-translate-y-1.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E11D48] ${snap.tiltClass}`}
            >
              {/* Polaroid inner dark engineering preview frame */}
              <div className="bg-[#121214] text-white p-5 aspect-[4/3] flex flex-col justify-between border border-[#27272A]">
                <div className="flex items-center justify-between text-[11px] font-mono-tabular text-white/60">
                  <span>{snap.tag}</span>
                  <ArrowUpRight
                    className="w-4 h-4 text-white/60 group-hover:text-[#E11D48] transition-colors"
                    aria-hidden="true"
                  />
                </div>

                <div className="space-y-2.5 my-auto">
                  {snap.previewLines.map((line) => (
                    <div
                      key={line.label}
                      className="flex items-center justify-between text-xs border-b border-white/10 pb-1.5"
                    >
                      <span className="text-white/60">{line.label}</span>
                      <span className="font-mono-tabular font-medium text-white">
                        {line.value}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="text-[11px] font-mono-tabular text-[#FDA4AF]">
                  {snap.metrics}
                </div>
              </div>

              {/* Polaroid bottom caption */}
              <div className="mt-4 px-1">
                <h4 className="font-heading text-base font-bold text-[#111111] group-hover:text-[#E11D48] transition-colors">
                  {snap.title}
                </h4>
                <p className="text-xs text-[#52525B] mt-1">{snap.subtitle}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox Modal for Snapshot Details */}
      {selectedSnapshot && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="snapshot-modal-title"
          onClick={() => setSelectedSnapshot(null)}
        >
          <div
            className="bg-[#FAFAF8] border border-[#18181B] max-w-xl w-full p-6 sm:p-8 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedSnapshot(null)}
              aria-label="Close detail dialog"
              className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center border border-[#D4D4CE] bg-white text-[#111111] hover:bg-[#111111] hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <p className="text-xs font-mono-tabular text-[#E11D48] font-semibold">
              {selectedSnapshot.tag}
            </p>
            <h3
              id="snapshot-modal-title"
              className="font-display text-2xl sm:text-3xl text-[#111111] mt-2 pr-10"
            >
              {selectedSnapshot.title}
            </h3>
            <p className="text-xs text-[#52525B] mt-1 font-mono-tabular">
              {selectedSnapshot.metrics}
            </p>

            <p className="mt-5 text-[15px] leading-relaxed text-[#27272A]">
              {selectedSnapshot.description}
            </p>

            <div className="mt-6 pt-5 border-t border-[#E4E4DE]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#111111] mb-3">
                Implementation Highlights
              </h4>
              <ul className="space-y-2.5">
                {selectedSnapshot.highlights.map((hl) => (
                  <li key={hl} className="flex items-start gap-2.5 text-sm text-[#3F3F46]">
                    <CheckCircle2
                      className="w-4 h-4 text-[#E11D48] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-7 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedSnapshot(null)}
                className="px-5 py-2.5 text-xs font-semibold bg-[#111111] text-white hover:bg-[#E11D48] transition-colors whitespace-nowrap shrink-0"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
