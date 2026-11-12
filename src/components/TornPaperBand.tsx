import React from 'react';
import { CutoutPortrait } from './CutoutPortrait';
import { GeometricMarks } from './GeometricMarks';
import { PROFILE } from '../data/portfolioData';

/**
 * Full-width torn-paper black editorial banner matching the video reference:
 * jagged paper tears top & bottom, continuous kinetic marquee cycling
 * "PORTFOLIO ✸ ✦ ♣ 2026 ✸ ✦ ♣ SOFTWARE DEVELOPER ✸ ✦ ♣ AI & ML ENGINEER",
 * and Bhavadesh's crimson-outlined cutout portrait anchored center.
 */
export const TornPaperBand: React.FC = () => {
  return (
    <section
      aria-label="Featured Portrait Banner"
      className="relative w-full my-12 md:my-16 select-none"
    >
      {/* Top torn-paper jagged edge */}
      <div className="w-full overflow-hidden leading-none translate-y-[1px]">
        <svg
          viewBox="0 0 1440 52"
          preserveAspectRatio="none"
          className="w-full h-8 sm:h-11 md:h-14 block"
          aria-hidden="true"
        >
          <path
            d="M0,52 L0,26 L34,13 L72,30 L110,9 L154,28 L198,15 L242,33 L288,11 L336,27 L384,14 L432,32 L480,8 L528,29 L576,12 L624,30 L672,10 L720,26 L768,12 L816,31 L864,9 L912,28 L960,14 L1008,32 L1056,11 L1104,27 L1152,13 L1200,30 L1248,10 L1296,26 L1344,15 L1392,29 L1440,14 L1440,52 Z"
            fill="#0B0B0C"
          />
        </svg>
      </div>

      {/* Main black torn-paper body */}
      <div className="relative bg-[#0B0B0C] text-white overflow-visible">
        {/* Subtle crumpled paper sheen inside dark band */}
        <div
          className="absolute inset-0 opacity-25 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle at 22% 35%, rgba(255,255,255,0.09) 0%, transparent 45%), radial-gradient(circle at 78% 65%, rgba(255,255,255,0.07) 0%, transparent 45%)',
          }}
          aria-hidden="true"
        />

        {/* Continuous kinetic marquee text & symbols behind the central portrait */}
        <div className="relative overflow-hidden py-14 sm:py-16 md:py-20 flex items-center">
          <div className="flex items-center whitespace-nowrap animate-band-marquee">
            {[0, 1].map((dup) => (
              <div key={dup} className="flex items-center gap-10 sm:gap-14 pr-10 sm:pr-14">
                <span className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white uppercase">
                  PORTFOLIO
                </span>
                <GeometricMarks color="#FFFFFF" size={28} animated={false} />
                <span className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white uppercase font-mono-tabular">
                  2026
                </span>
                <GeometricMarks color="#FFFFFF" size={28} animated={false} />
                <span className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white uppercase">
                  SOFTWARE DEVELOPER
                </span>
                <GeometricMarks color="#FFFFFF" size={28} animated={false} />
                <span className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-[#EF233C] uppercase">
                  AI &amp; ML ENGINEER
                </span>
                <GeometricMarks color="#FFFFFF" size={28} animated={false} />
                <span className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white uppercase">
                  BHAVADESH BAYANA
                </span>
                <GeometricMarks color="#FFFFFF" size={28} animated={false} />
              </div>
            ))}
          </div>
        </div>

        {/* Center crimson-outlined cutout portrait overlapping the torn band */}
        <div className="absolute inset-x-0 bottom-0 flex justify-center pointer-events-none z-10">
          <div className="w-[230px] sm:w-[270px] md:w-[310px] lg:w-[335px] -mt-20 sm:-mt-24 md:-mt-28">
            <CutoutPortrait
              src={PROFILE.portraitPath}
              alt={`${PROFILE.shortName} studio portrait`}
              variant="tornBand"
              className="w-full h-auto object-contain drop-shadow-[0_18px_32px_rgba(0,0,0,0.5)]"
            />
          </div>
        </div>
      </div>

      {/* Bottom torn-paper jagged edge */}
      <div className="w-full overflow-hidden leading-none -translate-y-[1px] relative z-20">
        <svg
          viewBox="0 0 1440 52"
          preserveAspectRatio="none"
          className="w-full h-8 sm:h-11 md:h-14 block"
          aria-hidden="true"
        >
          <path
            d="M0,0 L1440,0 L1440,22 L1392,37 L1344,18 L1296,35 L1248,14 L1200,33 L1152,19 L1104,36 L1056,15 L1008,34 L960,20 L912,38 L864,16 L816,32 L768,18 L720,35 L672,14 L624,33 L576,17 L528,37 L480,15 L432,34 L384,18 L336,36 L288,15 L240,32 L192,19 L144,35 L96,17 L48,33 L0,20 Z"
            fill="#0B0B0C"
          />
        </svg>
      </div>
    </section>
  );
};
