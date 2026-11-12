import React, { useEffect, useState } from 'react';

interface CutoutPortraitProps {
  src: string;
  alt: string;
  variant?: 'tornBand' | 'badge' | 'clean';
  className?: string;
}

/**
 * Removes uniform outer studio white background via edge-seeded flood fill
 * (preserving inner white clothing such as the collared shirt inside the dark blazer)
 * and optionally generates the signature crimson jagged sticker outline from the reference.
 */
export const CutoutPortrait: React.FC<CutoutPortraitProps> = ({
  src,
  alt,
  variant = 'clean',
  className = '',
}) => {
  const [processedUrl, setProcessedUrl] = useState<string | null>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.referrerPolicy = 'no-referrer';

    img.onload = () => {
      if (cancelled) return;
      try {
        // Scale down to a crisp working resolution for fast canvas processing
        const maxH = variant === 'badge' ? 320 : 720;
        const scale = Math.min(1, maxH / img.height);
        const w = Math.max(1, Math.round(img.width * scale));
        const h = Math.max(1, Math.round(img.height * scale));

        const pad = variant === 'tornBand' ? 24 : 0;
        const cw = w + pad * 2;
        const ch = h + pad * 2;

        const workCanvas = document.createElement('canvas');
        workCanvas.width = w;
        workCanvas.height = h;
        const wCtx = workCanvas.getContext('2d', { willReadFrequently: true });
        if (!wCtx) return;

        wCtx.drawImage(img, 0, 0, w, h);
        const imgData = wCtx.getImageData(0, 0, w, h);
        const data = imgData.data;

        // Edge-seeded BFS flood-fill to mark outer white background pixels
        const visited = new Uint8Array(w * h);
        const bgMask = new Uint8Array(w * h);
        const queue = new Int32Array(w * h);
        let head = 0;
        let tail = 0;

        const isNearWhite = (idx: number) => {
          const p = idx * 4;
          const r = data[p];
          const g = data[p + 1];
          const b = data[p + 2];
          return r >= 232 && g >= 232 && b >= 232 && Math.max(r, g, b) - Math.min(r, g, b) < 22;
        };

        const enqueue = (x: number, y: number) => {
          if (x < 0 || x >= w || y < 0 || y >= h) return;
          // Never allow flood-fill to enter the torso / white shirt region
          if (y > h * 0.46 && x > w * 0.25 && x < w * 0.75) return;
          const idx = y * w + x;
          if (visited[idx]) return;
          visited[idx] = 1;
          if (isNearWhite(idx)) {
            bgMask[idx] = 1;
            queue[tail++] = idx;
          }
        };

        // Seed only top, left, and right outer edges (never bottom edge where shirt meets frame)
        for (let x = 0; x < w; x++) {
          enqueue(x, 0);
        }
        for (let y = 0; y < h - 2; y++) {
          enqueue(0, y);
          enqueue(w - 1, y);
        }

        while (head < tail) {
          const curr = queue[head++];
          const cx = curr % w;
          const cy = (curr - cx) / w;
          enqueue(cx + 1, cy);
          enqueue(cx - 1, cy);
          enqueue(cx, cy + 1);
          enqueue(cx, cy - 1);
        }

        // Seal any interior transparent hole between left and right subject bounds on torso rows
        for (let y = Math.floor(h * 0.45); y < h; y++) {
          let leftBound = -1;
          let rightBound = -1;
          for (let x = 0; x < w; x++) {
            if (!bgMask[y * w + x]) {
              if (leftBound === -1) leftBound = x;
              rightBound = x;
            }
          }
          if (leftBound !== -1 && rightBound > leftBound) {
            for (let x = leftBound; x <= rightBound; x++) {
              bgMask[y * w + x] = 0;
            }
          }
        }

        // Apply transparency + soft anti-aliased edge feathering
        for (let y = 0; y < h; y++) {
          for (let x = 0; x < w; x++) {
            const idx = y * w + x;
            const p = idx * 4;
            if (bgMask[idx]) {
              data[p + 3] = 0;
            } else {
              // Check 1px neighborhood for subtle edge feather
              let bgNeighbors = 0;
              if (x > 0 && bgMask[idx - 1]) bgNeighbors++;
              if (x < w - 1 && bgMask[idx + 1]) bgNeighbors++;
              if (y > 0 && bgMask[idx - w]) bgNeighbors++;
              if (y < h - 1 && bgMask[idx + w]) bgNeighbors++;

              if (bgNeighbors > 0) {
                const lum = (data[p] + data[p + 1] + data[p + 2]) / 3;
                if (lum > 205) {
                  data[p + 3] = Math.round(data[p + 3] * 0.35);
                } else {
                  data[p + 3] = Math.round(data[p + 3] * 0.82);
                }
              }
            }
          }
        }

        wCtx.putImageData(imgData, 0, 0);

        const outCanvas = document.createElement('canvas');
        outCanvas.width = cw;
        outCanvas.height = ch;
        const outCtx = outCanvas.getContext('2d');
        if (!outCtx) return;

        if (variant === 'tornBand') {
          // Draw signature jagged crimson sticker outline behind the cutout silhouette
          const strokeRadius = Math.max(10, Math.round(w * 0.032));
          const tempSil = document.createElement('canvas');
          tempSil.width = cw;
          tempSil.height = ch;
          const sCtx = tempSil.getContext('2d');
          if (sCtx) {
            sCtx.drawImage(workCanvas, pad, pad);
            sCtx.globalCompositeOperation = 'source-in';
            sCtx.fillStyle = '#EF233C';
            sCtx.fillRect(0, 0, cw, ch);
            sCtx.globalCompositeOperation = 'source-over';

            // Faceted polygonal paper-cut outline along upper/side silhouette (omit downward offsets so shoulders merge into black band)
            const steps = 16;
            for (let i = 0; i < steps; i++) {
              const angle = (i / steps) * Math.PI * 2;
              const dyRaw = Math.sin(angle);
              if (dyRaw > 0.35) continue;
              const mod = i % 2 === 0 ? 1.18 : 0.92;
              const dx = Math.cos(angle) * strokeRadius * mod;
              const dy = dyRaw * strokeRadius * mod;
              outCtx.drawImage(tempSil, dx, dy);
            }
          }
          // Draw crisp foreground portrait on top
          outCtx.drawImage(workCanvas, pad, pad);
        } else if (variant === 'badge') {
          // High-contrast graphic editorial stamp for the PORTFOLIO 'O'
          outCtx.drawImage(workCanvas, 0, 0);
          outCtx.globalCompositeOperation = 'source-atop';
          outCtx.fillStyle = 'rgba(17, 17, 17, 0.08)';
          outCtx.fillRect(0, 0, cw, ch);
        } else {
          outCtx.drawImage(workCanvas, 0, 0);
        }

        if (!cancelled) {
          setProcessedUrl(outCanvas.toDataURL('image/png'));
        }
      } catch {
        // Silently retain original image fallback
      }
    };

    img.onerror = () => {
      if (!cancelled) setHasError(true);
    };

    img.src = src;
    return () => {
      cancelled = true;
    };
  }, [src, variant]);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-[#E7E7E2] text-[#18181B] border border-[#D4D4CE] p-6 text-center ${className}`}
      >
        <span className="font-display text-2xl tracking-tight">BB</span>
        <span className="text-xs text-[#52525B] mt-1">{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={processedUrl ?? src}
      alt={alt}
      referrerPolicy="no-referrer"
      className={className}
    />
  );
};
