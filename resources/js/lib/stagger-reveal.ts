import type { CSSProperties } from 'react';

/**
 * The single choreographed reveal moment a SplitFCFA screen uses on mount:
 * pass the item's index in a list/grid and spread the result onto the node.
 * A plain function (not a hook) so it can be called from inside `.map()`.
 */
export function staggerReveal(
    index: number,
    baseDelayMs = 60,
): { className: string; style: CSSProperties } {
    return {
        className: 'split-stagger',
        style: { animationDelay: `${index * baseDelayMs}ms` },
    };
}
