import { Head, Link, usePage } from '@inertiajs/react';
import { Bell, Settings } from 'lucide-react';
import { SplitSidebar } from '@/components/splitfcfa/app-sidebar';
import { Atmosphere } from '@/components/splitfcfa/atmosphere';
import { StatCard } from '@/components/splitfcfa/stat-card';
import { UserAvatar } from '@/components/splitfcfa/user-avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UserMenuContent } from '@/components/user-menu-content';
import { currentGroup } from '@/lib/splitfcfa-mock-data';
import { staggerReveal } from '@/lib/stagger-reveal';
import { edit } from '@/routes/profile';

const STAT_CARDS = [
    { key: 'total', label: 'Total du groupe', valueKey: 'groupTotal' as const },
    { key: 'balance', label: 'Votre solde', valueKey: 'yourBalance' as const, accent: 'primary' as const, trend: true },
    { key: 'receive', label: 'À recevoir', valueKey: 'toReceive' as const, accent: 'primary' as const },
    { key: 'pay', label: 'À payer', valueKey: 'toPay' as const, accent: 'secondary' as const },
];

export default function Dashboard() {
    const { stats } = currentGroup;
    const { auth } = usePage().props;
    const user = auth.user;

    return (
        <div className="flex h-screen flex-col overflow-hidden bg-surface font-body-md text-body-md text-on-surface antialiased md:flex-row">
            <Head title="Dashboard" />

            <SplitSidebar active="dashboard" />

            <main className="relative min-h-0 flex-1 overflow-y-auto bg-surface-container-low md:ml-64">
                <Atmosphere />
                <div className="relative mx-auto max-w-7xl px-margin-mobile py-lg md:px-margin-desktop md:py-xl">
                    <div className="mb-8 flex items-end justify-between">
                        <div>
                            <p className="mb-1 font-label-md text-label-md text-primary uppercase tracking-wider">
                                Résumé de groupe
                            </p>
                            <h2 className="font-display-lg text-display-lg text-on-surface max-md:hidden">
                                {currentGroup.name}
                            </h2>
                            <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface md:hidden">
                                {currentGroup.name}
                            </h2>
                        </div>
                        <div className="hidden items-center gap-4 md:flex">
                            <button
                                type="button"
                                className="rounded-full p-2 text-on-surface-variant transition-colors duration-200 hover:bg-surface-variant hover:text-primary active:scale-95"
                            >
                                <Bell className="size-5" />
                            </button>
                            <Link
                                href={edit()}
                                className="rounded-full p-2 text-on-surface-variant transition-colors duration-200 hover:bg-surface-variant hover:text-primary active:scale-95"
                            >
                                <Settings className="size-5" />
                            </Link>
                            {user ? (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <button type="button">
                                            <UserAvatar
                                                member={{ id: 'me', name: user.name, tone: 'primary' }}
                                                className="size-10 cursor-pointer border-2 border-surface-container-highest transition-opacity hover:opacity-80"
                                            />
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-56">
                                        <UserMenuContent user={user} />
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                <UserAvatar
                                    member={{ id: 'guest', name: 'Vous', tone: 'primary' }}
                                    className="size-10 border-2 border-surface-container-highest"
                                />
                            )}
                        </div>
                    </div>

                    <div className="mb-xl grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-gutter">
                        {STAT_CARDS.map((card, index) => {
                            const reveal = staggerReveal(index);

                            return (
                                <StatCard
                                    key={card.key}
                                    label={card.label}
                                    value={stats[card.valueKey]}
                                    suffix="CFA"
                                    accent={card.accent}
                                    trend={card.trend}
                                    className={reveal.className}
                                    style={reveal.style}
                                />
                            );
                        })}
                    </div>
                </div>
            </main>
        </div>
    );
}