import { useEffect, useState } from 'react';

const VALUE_PATTERN = /^([+-]?)(\d+(?:[.,]\d+)?)(.*)$/;

/**
 * Animates a formatted value string ("450k", "+15k", "-28,333 FCFA") from 0
 * up to its target on mount. Falls back to rendering the target immediately
 * for strings it can't parse, or when the user prefers reduced motion.
 */
export function useCountUp(target: string, durationMs = 800): string {
    const [animated, setAnimated] = useState<string | null>(null);

    useEffect(() => {
        const match = target.match(VALUE_PATTERN);
        const prefersReducedMotion =
            typeof window !== 'undefined' &&
            window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

        if (!match || prefersReducedMotion) {
            return;
        }

        const [, sign, numberPart, rest] = match;
        const decimals = (numberPart.split(/[.,]/)[1] ?? '').length;
        const targetNumber = parseFloat(numberPart.replace(',', '.'));
        const start = performance.now();
        let frame: number;

        const tick = (now: number) => {
            const progress = Math.min(1, (now - start) / durationMs);
            const eased = 1 - (1 - progress) ** 3;
            setAnimated(`${sign}${(targetNumber * eased).toFixed(decimals)}${rest}`);

            if (progress < 1) {
                frame = requestAnimationFrame(tick);
            }
        };

        frame = requestAnimationFrame(tick);

        return () => cancelAnimationFrame(frame);
    }, [target, durationMs]);

    return animated ?? target;
}
