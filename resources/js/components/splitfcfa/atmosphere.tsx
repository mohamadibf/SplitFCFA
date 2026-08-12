const GRAIN_SVG =
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

type AtmosphereProps = {
    /** 'warm' leans coral/amber (auth cards), 'cool' leans teal (app screens). */
    variant?: 'warm' | 'cool';
};

/**
 * The shared "aurora + grain" background layer behind SplitFCFA screens.
 * Render as the first child of a `relative` container — it's absolutely
 * positioned, pointer-events-none, and sits behind normal-flow content.
 */
export function Atmosphere({ variant = 'cool' }: AtmosphereProps) {
    return (
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
            <div
                className="absolute -top-1/4 -left-1/4 size-[70vmax] rounded-full opacity-[0.16] blur-[110px]"
                style={{
                    background:
                        variant === 'warm'
                            ? 'radial-gradient(circle, #fe7488, transparent 70%)'
                            : 'radial-gradient(circle, #008378, transparent 70%)',
                }}
            />
            <div
                className="absolute -right-1/4 -bottom-1/4 size-[65vmax] rounded-full opacity-[0.14] blur-[110px]"
                style={{
                    background:
                        variant === 'warm'
                            ? 'radial-gradient(circle, #f9bd22, transparent 70%)'
                            : 'radial-gradient(circle, #fe7488, transparent 70%)',
                }}
            />
            <div
                className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
                style={{ backgroundImage: GRAIN_SVG }}
            />
        </div>
    );
}
