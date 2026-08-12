import { TrendingUp } from 'lucide-react';
import type { CSSProperties } from 'react';
import { useCountUp } from '@/hooks/use-count-up';
import { cn } from '@/lib/utils';

type StatCardProps = {
    label: string;
    value: string;
    suffix?: string;
    accent?: 'primary' | 'secondary';
    trend?: boolean;
    className?: string;
    style?: CSSProperties;
};

const ACCENT_VALUE_CLASSES: Record<'default' | 'primary' | 'secondary', string> = {
    default: 'text-on-surface',
    primary: 'text-primary',
    secondary: 'text-secondary',
};

const ACCENT_SUFFIX_CLASSES: Record<'default' | 'primary' | 'secondary', string> = {
    default: 'text-on-surface-variant',
    primary: 'text-primary/70',
    secondary: 'text-secondary/70',
};

const ACCENT_BORDER_CLASSES: Record<'primary' | 'secondary', string> = {
    primary: 'border-l-4 border-primary',
    secondary: 'border-l-4 border-secondary',
};

const ACCENT_DECOR_CLASSES: Record<'primary' | 'secondary', string> = {
    primary: 'bg-primary-container/10',
    secondary: 'bg-secondary/5',
};

export function StatCard({ label, value, suffix, accent, trend, className, style }: StatCardProps) {
    const tone = accent ?? 'default';
    const animatedValue = useCountUp(value);

    return (
        <div
            className={cn(
                'group relative flex flex-col gap-2 overflow-hidden rounded-xl bg-surface-container-lowest p-4 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-lg md:p-6',
                accent && ACCENT_BORDER_CLASSES[accent],
                className,
            )}
            style={style}
        >
            <div
                className={cn(
                    '-top-4 -right-4 absolute size-24 rounded-full opacity-100 transition-all duration-500 group-hover:scale-150 group-hover:opacity-70',
                    accent ? ACCENT_DECOR_CLASSES[accent] : 'bg-primary/5',
                )}
            />
            <p className="relative z-10 font-label-md text-label-md text-on-surface-variant">
                {label}
            </p>
            <div
                className={cn(
                    'relative z-10 font-headline-lg text-headline-lg tabular-nums',
                    ACCENT_VALUE_CLASSES[tone],
                )}
            >
                {animatedValue}
                {suffix && (
                    <span
                        className={cn(
                            'font-body-md text-body-md',
                            ACCENT_SUFFIX_CLASSES[tone],
                        )}
                    >
                        {' '}
                        {suffix}
                    </span>
                )}
            </div>
            {trend && (
                <TrendingUp className="absolute top-4 right-4 size-5 text-primary transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            )}
        </div>
    );
}
