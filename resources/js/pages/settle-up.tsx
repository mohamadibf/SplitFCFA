import { Head } from '@inertiajs/react';
import {
    ArrowRight,
    BellRing,
    CheckCheck,
    RotateCcw,
    Wallet,
} from 'lucide-react';
import { toast } from 'sonner';
import { SplitSidebar } from '@/components/splitfcfa/app-sidebar';
import { Atmosphere } from '@/components/splitfcfa/atmosphere';
import { UserAvatar } from '@/components/splitfcfa/user-avatar';
import { resetDemo, settleDebt, useSplitStore } from '@/lib/splitfcfa-store';
import { staggerReveal } from '@/lib/stagger-reveal';
import { cn } from '@/lib/utils';

export default function SettleUp() {
    const settlements = useSplitStore((store) => store.settlements);

    return (
        <div className="flex min-h-screen w-full flex-col bg-surface text-on-surface antialiased md:flex-row">
            <Head title="Settle Up" />

            <SplitSidebar active="settle-up" />

            <main className="relative min-w-0 flex-1 md:ml-64">
                <Atmosphere />
                <div className="relative flex w-full flex-col gap-lg p-margin-mobile md:p-margin-desktop">
                    <header className="mb-md flex flex-col gap-xs">
                        <p className="font-label-md text-label-md tracking-wider text-primary uppercase">
                            Entre vous
                        </p>
                        <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface md:font-headline-lg md:text-headline-lg">
                            Qui doit quoi
                        </h2>
                        <p className="max-w-2xl font-body-md text-body-md text-on-surface-variant">
                            Dettes simplifiées pour minimiser les transactions.
                            Réglez vos comptes et gardez l&apos;harmonie
                            collaborative.
                        </p>
                    </header>

                    <div className="flex flex-col gap-md">
                        {settlements.map((settlement, index) => {
                            const reveal = staggerReveal(index, 90);

                            return (
                                <div
                                    key={settlement.id}
                                    className={cn(
                                        'relative flex flex-col items-start justify-between gap-md rounded-xl border border-surface-variant/50 bg-surface-container-lowest p-md shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-lg sm:flex-row sm:items-center md:p-lg',
                                        reveal.className,
                                    )}
                                    style={reveal.style}
                                >
                                    {settlement.involvesYou && (
                                        <div className="absolute top-0 bottom-0 left-0 w-1 rounded-l-xl bg-primary-container" />
                                    )}
                                    <div
                                        className={cn(
                                            'flex w-full items-center gap-md sm:w-auto',
                                            settlement.involvesYou && 'pl-sm',
                                        )}
                                    >
                                        <div className="flex flex-col items-center gap-xs">
                                            <UserAvatar
                                                member={settlement.from}
                                                className="size-12 text-label-md shadow-sm md:size-14"
                                            />
                                            <span className="font-label-md text-label-md text-on-surface">
                                                {settlement.from.name}
                                            </span>
                                        </div>
                                        <div className="flex flex-col items-center px-sm text-outline-variant">
                                            <span className="mb-1 font-label-sm text-label-sm text-on-surface-variant">
                                                doit à
                                            </span>
                                            <ArrowRight className="size-5" />
                                        </div>
                                        <div className="flex flex-col items-center gap-xs">
                                            <UserAvatar
                                                member={settlement.to}
                                                className="size-12 font-headline-md text-headline-md shadow-sm md:size-14"
                                            />
                                            <span
                                                className={cn(
                                                    'font-label-md text-label-md',
                                                    settlement.involvesYou
                                                        ? 'font-bold text-primary'
                                                        : 'text-on-surface',
                                                )}
                                            >
                                                {settlement.to.name}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="mt-sm flex w-full flex-row items-center justify-between gap-md border-t border-surface-variant pt-md sm:mt-0 sm:w-auto sm:flex-col sm:items-end sm:justify-center sm:gap-sm sm:border-t-0 sm:pt-0">
                                        <div
                                            className={cn(
                                                'font-headline-md text-headline-md font-bold tracking-tight',
                                                settlement.involvesYou
                                                    ? 'text-primary'
                                                    : 'text-on-surface',
                                            )}
                                        >
                                            {settlement.amount}
                                        </div>
                                        {settlement.involvesYou ? (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    toast.success(
                                                        `Rappel envoyé à ${settlement.from.name}`,
                                                        {
                                                            description: `${settlement.from.name} vous doit ${settlement.amount}.`,
                                                        },
                                                    )
                                                }
                                                className="flex items-center gap-2 rounded-lg bg-surface-variant px-6 py-2.5 font-label-md text-label-md whitespace-nowrap text-on-surface-variant shadow-sm transition-all duration-200 hover:bg-surface-dim active:scale-95"
                                            >
                                                <BellRing className="size-4" />
                                                Rappeler
                                            </button>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    settleDebt(settlement.id);
                                                    toast.success(
                                                        'Dette réglée',
                                                        {
                                                            description: `${settlement.from.name} a remboursé ${settlement.amount} à ${settlement.to.name}.`,
                                                        },
                                                    );
                                                }}
                                                className="flex items-center gap-2 rounded-lg bg-secondary px-6 py-2.5 font-label-md text-label-md whitespace-nowrap text-on-secondary shadow-sm transition-all duration-200 hover:bg-secondary-container hover:shadow-md active:scale-95"
                                            >
                                                <Wallet className="size-4" />
                                                Régler
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {settlements.length === 0 && (
                        <div className="mt-xl flex flex-col items-center justify-center py-xl text-center">
                            <div className="mb-md flex size-24 items-center justify-center rounded-full bg-surface-container-low">
                                <CheckCheck className="size-12 text-outline-variant" />
                            </div>
                            <p className="font-body-lg text-body-lg text-on-surface-variant">
                                Plus aucune dette à régler.
                            </p>
                            <p className="font-body-md text-body-md text-outline">
                                Vous êtes à jour avec le reste du groupe.
                            </p>
                            <button
                                type="button"
                                onClick={resetDemo}
                                className="mt-md flex items-center gap-2 rounded-lg border border-outline-variant px-4 py-2 font-label-md text-label-md text-on-surface-variant transition-colors hover:border-primary hover:text-primary"
                            >
                                <RotateCcw className="size-4" />
                                Réinitialiser la démo
                            </button>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
