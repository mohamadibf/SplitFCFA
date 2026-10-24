import { Head } from '@inertiajs/react';
import { Car, ChefHat, TrendingUp, Ticket, Award } from 'lucide-react';
import { useState } from 'react';
import { SplitSidebar } from '@/components/splitfcfa/app-sidebar';
import { Atmosphere } from '@/components/splitfcfa/atmosphere';
import { analyticsByPeriod } from '@/lib/splitfcfa-mock-data';
import type { AnalyticsPeriod } from '@/lib/splitfcfa-mock-data';
import { staggerReveal } from '@/lib/stagger-reveal';
import { cn } from '@/lib/utils';

type Period = AnalyticsPeriod;

const PERIODS: { key: Period; label: string }[] = [
    { key: 'semaine', label: 'Semaine' },
    { key: 'mois', label: 'Mois' },
    { key: 'annee', label: 'Année' },
];

const BREAKDOWN_STYLE: Record<string, { dot: string; icon: typeof Car }> = {
    transport: { dot: 'bg-primary/15 text-primary', icon: Car },
    repas: { dot: 'bg-tertiary-fixed/30 text-tertiary', icon: ChefHat },
    loisirs: { dot: 'bg-secondary-container/20 text-secondary', icon: Ticket },
};

const CATEGORY_COLOR: Record<string, string> = {
    repas: '#956e00',
    transport: '#00685f',
    loisirs: '#fe7488',
};

function donutGradient(
    breakdown: { category: string; percent: number }[],
): string {
    let from = 0;
    const stops = breakdown.map(({ category, percent }) => {
        const stop = `${CATEGORY_COLOR[category]} ${from}% ${from + percent}%`;
        from += percent;

        return stop;
    });

    return `conic-gradient(${stops.join(', ')})`;
}

export default function Analytics() {
    const [period, setPeriod] = useState<Period>('mois');
    const analytics = analyticsByPeriod[period];

    return (
        <div className="flex min-h-screen w-full flex-col bg-surface text-on-surface antialiased md:flex-row">
            <Head title="Analyses" />

            <SplitSidebar active="analytics" />

            <main className="relative flex w-full flex-1 flex-col gap-lg bg-surface p-margin-mobile md:ml-64 md:gap-xl md:p-margin-desktop">
                <Atmosphere />
                <div className="relative flex flex-col justify-between gap-md md:flex-row md:items-center">
                    <div>
                        <p className="mb-1 font-label-md text-label-md tracking-wider text-primary uppercase">
                            Analyses
                        </p>
                        <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface md:font-headline-lg md:text-headline-lg">
                            Graphiques de dépenses
                        </h2>
                        <p className="mt-1 font-body-md text-body-md text-on-surface-variant">
                            Aperçu de vos activités partagées.
                        </p>
                    </div>
                    <div className="flex self-start rounded-lg bg-surface-container-low p-1">
                        {PERIODS.map((item) => (
                            <button
                                key={item.key}
                                type="button"
                                aria-pressed={period === item.key}
                                onClick={() => setPeriod(item.key)}
                                className={cn(
                                    'rounded-md px-4 py-2 font-label-md text-label-md transition-colors',
                                    period === item.key
                                        ? 'bg-surface-container-lowest text-primary shadow-sm'
                                        : 'text-on-surface-variant hover:bg-surface-container-highest',
                                )}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="relative grid grid-cols-1 gap-gutter md:grid-cols-12 md:gap-lg">
                    <div
                        className={cn(
                            'rounded-xl bg-surface-container-lowest p-lg shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-lg md:col-span-8',
                            staggerReveal(0).className,
                        )}
                        style={staggerReveal(0).style}
                    >
                        <div className="mb-6 flex items-start justify-between">
                            <div>
                                <h3 className="font-headline-md text-headline-md text-on-surface">
                                    Évolution des dépenses
                                </h3>
                                <p className="mt-1 font-label-md text-label-md text-on-surface-variant">
                                    {analytics.subtitle}
                                </p>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex items-center gap-2">
                                    <span className="size-3 rounded-full bg-primary" />
                                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                                        Vous
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="size-3 rounded-full bg-secondary-container" />
                                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                                        Groupe
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 flex min-h-[200px] flex-1 items-end justify-between gap-2 border-b border-surface-dim pb-2">
                            {analytics.bars.map((week) => (
                                <div
                                    key={week.label}
                                    className="flex w-full flex-col items-center gap-2"
                                >
                                    <div className="flex h-40 w-full items-end justify-center gap-1">
                                        <div
                                            className="w-1/3 rounded-t-sm bg-primary transition-[height] duration-700"
                                            style={{ height: `${week.you}%` }}
                                        />
                                        <div
                                            className="w-1/3 rounded-t-sm bg-secondary-container transition-[height] duration-700"
                                            style={{ height: `${week.group}%` }}
                                        />
                                    </div>
                                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                                        {week.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div
                        className={cn(
                            'rounded-xl bg-surface-container-lowest p-lg shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-lg md:col-span-4',
                            staggerReveal(1).className,
                        )}
                        style={staggerReveal(1).style}
                    >
                        <h3 className="mb-6 font-headline-md text-headline-md text-on-surface">
                            Répartition
                        </h3>
                        <div className="flex flex-1 flex-col items-center justify-center">
                            <div
                                className="relative mb-6 flex size-40 items-center justify-center rounded-full shadow-sm"
                                style={{
                                    background: donutGradient(
                                        analytics.breakdown,
                                    ),
                                }}
                            >
                                <div className="flex size-24 flex-col items-center justify-center rounded-full bg-surface-container-lowest">
                                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                                        Total
                                    </span>
                                    <span className="font-body-md text-body-md font-bold text-on-surface">
                                        {analytics.total}
                                    </span>
                                </div>
                            </div>
                            <div className="flex w-full flex-col gap-3">
                                {analytics.breakdown.map((item) => {
                                    const style =
                                        BREAKDOWN_STYLE[item.category];
                                    const Icon = style.icon;

                                    return (
                                        <div
                                            key={item.category}
                                            className="flex items-center justify-between"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className={cn(
                                                        'flex size-8 items-center justify-center rounded-full',
                                                        style.dot,
                                                    )}
                                                >
                                                    <Icon className="size-4" />
                                                </div>
                                                <span className="font-body-md text-body-md text-on-surface">
                                                    {item.label}
                                                </span>
                                            </div>
                                            <span className="font-label-md text-label-md text-on-surface">
                                                {item.percent}%
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <div
                        className={cn(
                            'flex items-center justify-between rounded-xl bg-surface-container-lowest p-lg shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-lg md:col-span-5',
                            staggerReveal(2).className,
                        )}
                        style={staggerReveal(2).style}
                    >
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <div className="flex size-16 items-center justify-center rounded-full border-2 border-surface-container-lowest bg-surface-variant shadow-sm">
                                    <span className="font-headline-md text-headline-md text-on-surface-variant">
                                        {analytics.topSpender.name.charAt(0)}
                                    </span>
                                </div>
                                <div className="absolute -right-1 -bottom-1 flex size-6 items-center justify-center rounded-full border-2 border-surface-container-lowest bg-tertiary-fixed text-on-tertiary-fixed-variant">
                                    <Award className="size-3.5" />
                                </div>
                            </div>
                            <div>
                                <p className="font-label-sm text-label-sm tracking-wider text-on-surface-variant uppercase">
                                    Top Dépenseur
                                </p>
                                <h4 className="font-headline-md text-headline-md text-on-surface">
                                    {analytics.topSpender.name}
                                </h4>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="font-headline-lg-mobile text-headline-lg-mobile text-secondary md:font-headline-lg md:text-headline-lg">
                                {analytics.topSpender.amount}
                            </p>
                            <p className="font-label-sm text-label-sm text-on-surface-variant">
                                FCFA payés
                            </p>
                        </div>
                    </div>

                    <div
                        className={cn(
                            'relative flex flex-col justify-between overflow-hidden rounded-xl bg-primary-container p-lg text-on-primary-container shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-lg md:col-span-7',
                            staggerReveal(3).className,
                        )}
                        style={staggerReveal(3).style}
                    >
                        <div className="absolute -top-8 -right-8 size-32 rounded-full bg-primary opacity-20 blur-xl" />
                        <div className="absolute -bottom-8 -left-8 size-24 rounded-full bg-primary-fixed opacity-20 blur-xl" />
                        <div className="relative z-10 mb-4 flex items-center gap-2">
                            <TrendingUp className="size-5" />
                            <h3 className="font-label-md text-label-md font-bold tracking-wider uppercase">
                                Aperçu du mois
                            </h3>
                        </div>
                        <div className="relative z-10 flex gap-8">
                            <div>
                                <p className="mb-1 font-label-sm text-label-sm opacity-80">
                                    Vous devez
                                </p>
                                <p className="font-headline-md text-headline-md text-on-primary-container">
                                    {analytics.summary.youOwe}
                                </p>
                            </div>
                            <div className="h-10 w-px self-center bg-on-primary-container/20" />
                            <div>
                                <p className="mb-1 font-label-sm text-label-sm opacity-80">
                                    On vous doit
                                </p>
                                <p className="font-headline-md text-headline-md text-primary-fixed">
                                    {analytics.summary.owedToYou}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
