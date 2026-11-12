import React from 'react';
import { motion } from 'motion/react';

interface MarksProps {
  className?: string;
  color?: string;
  size?: number;
  animated?: boolean;
}

/**
 * Signature 3-symbol motif from the reference portfolio video:
 * 8-point starburst (continuous spin), 4-point diamond star (gentle pulse),
 * and 4-leaf clover/club mark (playful rock/spin).
 */
export const GeometricMarks: React.FC<MarksProps> = ({
  className = '',
  color = 'currentColor',
  size = 24,
  animated = true,
}) => {
  return (
    <div
      className={`inline-flex items-center gap-3.5 select-none ${className}`}
      aria-hidden="true"
    >
      {/* 8-point asymmetric starburst */}
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        animate={animated ? { rotate: 360 } : undefined}
        transition={
          animated
            ? { duration: 9, repeat: Infinity, ease: 'linear' }
            : undefined
        }
      >
        <path
          d="M16 1L18.7 10.6L27.5 5.2L21.4 13.5L31 16L21.4 18.5L27.5 26.8L18.7 21.4L16 31L13.3 21.4L4.5 26.8L10.6 18.5L1 16L10.6 13.5L4.5 5.2L13.3 10.6L16 1Z"
          fill={color}
        />
      </motion.svg>

      {/* 4-point diamond star */}
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        animate={animated ? { scale: [1, 1.14, 1], rotate: [0, 90, 180] } : undefined}
        transition={
          animated
            ? { duration: 6, repeat: Infinity, ease: 'easeInOut' }
            : undefined
        }
      >
        <path
          d="M16 1C17.2 10.2 21.8 14.8 31 16C21.8 17.2 17.2 21.8 16 31C14.8 21.8 10.2 17.2 1 16C10.2 14.8 14.8 10.2 16 1Z"
          fill={color}
        />
      </motion.svg>

      {/* 4-leaf clover / editorial club */}
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        animate={animated ? { rotate: -360 } : undefined}
        transition={
          animated
            ? { duration: 12, repeat: Infinity, ease: 'linear' }
            : undefined
        }
      >
        <circle cx="16" cy="8.5" r="5.5" fill={color} />
        <circle cx="16" cy="23.5" r="5.5" fill={color} />
        <circle cx="8.5" cy="16" r="5.5" fill={color} />
        <circle cx="23.5" cy="16" r="5.5" fill={color} />
        <rect x="12" y="12" width="8" height="8" fill={color} />
      </motion.svg>
    </div>
  );
};
