import React, { useEffect } from 'react';
import { Printer, X } from 'lucide-react';
import { EDUCATION, PROFILE, SKILL_CATEGORIES } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-heading"
      onClick={onClose}
    >
      <div
        className="bg-white border border-[#18181B] max-w-3xl w-full my-8 p-6 sm:p-10 shadow-2xl relative text-[#111111]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Action Bar */}
        <div className="flex items-center justify-between gap-4 pb-5 mb-6 border-b border-[#E4E4DE] no-print">
          <span className="text-xs font-semibold text-[#52525B] uppercase tracking-wider">
            Curriculum Vitae
          </span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold bg-[#111111] text-white hover:bg-[#E11D48] transition-colors whitespace-nowrap shrink-0"
            >
              <Printer className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Print / Save PDF</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close resume modal"
              className="w-9 h-9 flex items-center justify-center border border-[#D4D4CE] hover:bg-[#111111] hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Resume Content faithfully matching Bhavadesh's PDF */}
        <div className="space-y-6 text-sm leading-relaxed">
          <header className="text-center border-b border-[#E4E4DE] pb-5">
            <h2
              id="resume-modal-heading"
              className="font-heading text-xl sm:text-2xl font-extrabold tracking-tight uppercase text-[#111111]"
            >
              {PROFILE.fullName}
            </h2>
            <p className="text-xs font-bold tracking-wider uppercase text-[#3F3F46] mt-1">
              SOFTWARE DEVELOPER | COMPUTER SCIENCE · AI &amp; ML
            </p>
            <p className="text-xs text-[#52525B] mt-2 font-mono-tabular">
              {PROFILE.location} · {PROFILE.phone} · {PROFILE.email}
            </p>
          </header>

          <section>
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#111111] border-b border-[#111111] pb-1 mb-2">
              Profile
            </h3>
            <p className="text-[#27272A]">
              B.Tech Computer Science and Engineering (AI &amp; ML) student at Jain University,
              graduating in 2029. Built an AI-powered career platform with resume analysis, role
              matching, and learning roadmaps. Interested in entry-level software development roles,
              with project experience in backend APIs, databases, and AI integration.
            </p>
          </section>

          <section>
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#111111] border-b border-[#111111] pb-1 mb-2">
              Education
            </h3>
            <div className="flex flex-wrap justify-between gap-2 font-semibold text-[#111111]">
              <span>{EDUCATION.degree}</span>
              <span>{EDUCATION.institution}</span>
            </div>
            <p className="text-xs text-[#52525B] font-mono-tabular mt-1">
              Expected 2029 · Semester 1–2: 8.0 CGPA · Class 12: 96.2% · Class 10: 93%
            </p>
          </section>

          <section>
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#111111] border-b border-[#111111] pb-1 mb-2">
              Project
            </h3>
            <p className="font-semibold text-[#111111]">
              Skill Passport | Full-stack AI career platform
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1.5 text-[#27272A]">
              <li>
                Developed student, recruiter, and administrator portals with JWT authentication,
                password hashing, and role-based access control.
              </li>
              <li>
                Built PDF and DOCX resume parsing to extract skills, projects, and certifications,
                generate AI-based suggestions, and calculate weighted role-match scores with
                skill-gap insights.
              </li>
              <li>
                Created personalized learning roadmaps, progress tracking, and job and internship
                application management; integrated Google Gemini API with a local NLP fallback.
              </li>
              <li>
                Implemented backend APIs using Python and FastAPI with SQLite and SQLAlchemy; added
                15 automated tests and Docker support.
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#111111] border-b border-[#111111] pb-1 mb-2">
              Technical Skills
            </h3>
            <div className="space-y-1.5 text-[#27272A]">
              {SKILL_CATEGORIES.map((cat) => (
                <div key={cat.category} className="flex flex-col sm:flex-row sm:gap-3">
                  <span className="font-semibold text-[#111111] sm:w-32 shrink-0">
                    {cat.category}
                  </span>
                  <span>{cat.items.join(', ')}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#111111] border-b border-[#111111] pb-1 mb-2">
              Achievement
            </h3>
            <p className="text-[#27272A]">
              <span className="font-semibold text-[#111111]">
                Smart India Hackathon (SIH) — Qualified Participant
              </span>{' '}
              | Collaborated with a team to conceptualize, architect, and pitch a software solution
              that qualified through the selection evaluation stage.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
