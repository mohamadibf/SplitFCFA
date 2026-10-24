import { Head, Link, usePage } from '@inertiajs/react';
import { Bell, Settings } from 'lucide-react';
import { toast } from 'sonner';
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
import { currentGroup, memberBalances } from '@/lib/splitfcfa-mock-data';
import {
    expenseTotal,
    formatFcfaShort,
    useSplitStore,
} from '@/lib/splitfcfa-store';
import { staggerReveal } from '@/lib/stagger-reveal';
import { cn } from '@/lib/utils';
import { edit } from '@/routes/profile';

const STAT_CARDS = [
    { key: 'total', label: 'Total du groupe', valueKey: 'groupTotal' as const },
    {
        key: 'balance',
        label: 'Votre solde',
        valueKey: 'yourBalance' as const,
        accent: 'primary' as const,
        trend: true,
    },
    {
        key: 'receive',
        label: 'À recevoir',
        valueKey: 'toReceive' as const,
        accent: 'primary' as const,
    },
    {
        key: 'pay',
        label: 'À payer',
        valueKey: 'toPay' as const,
        accent: 'secondary' as const,
    },
];

export default function Dashboard() {
    const allExpenses = useSplitStore((store) => store.expenses);
    const expenses = allExpenses.slice(0, 4);
    const stats = {
        ...currentGroup.stats,
        groupTotal: formatFcfaShort(expenseTotal(allExpenses)),
    };
    const { auth } = usePage().props;
    const user = auth.user;

    return (
        <div className="flex min-h-screen w-full flex-col bg-surface font-body-md text-body-md text-on-surface antialiased md:flex-row">
            <Head title="Dashboard" />

            <SplitSidebar active="dashboard" />

            <main className="relative min-w-0 flex-1 bg-surface-container-low md:ml-64">
                <Atmosphere />
                <div className="relative w-full px-margin-mobile py-lg md:px-margin-desktop md:py-xl">
                    <div className="mb-8 flex items-end justify-between">
                        <div>
                            <p className="mb-1 font-label-md text-label-md tracking-wider text-primary uppercase">
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
                                onClick={() =>
                                    toast('Aucune nouvelle notification')
                                }
                                aria-label="Notifications"
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
                                                member={{
                                                    id: 'me',
                                                    name: user.name,
                                                    tone: 'primary',
                                                }}
                                                className="size-10 cursor-pointer border-2 border-surface-container-highest transition-opacity hover:opacity-80"
                                            />
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        align="end"
                                        className="w-56"
                                    >
                                        <UserMenuContent user={user} />
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                <UserAvatar
                                    member={{
                                        id: 'guest',
                                        name: 'Vous',
                                        tone: 'primary',
                                    }}
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

                    <div className="grid grid-cols-1 gap-gutter lg:grid-cols-5">
                        <section className="rounded-xl bg-surface-container-lowest p-lg shadow-card lg:col-span-3">
                            <div className="mb-md flex items-center justify-between">
                                <h3 className="font-headline-md text-headline-md text-on-surface">
                                    Dépenses récentes
                                </h3>
                                <Link
                                    href="/preview/expenses"
                                    className="font-label-md text-label-md text-primary hover:underline"
                                >
                                    Tout voir
                                </Link>
                            </div>
                            <ul className="divide-y divide-surface-container-highest">
                                {expenses.map((expense) => (
                                    <li
                                        key={expense.id}
                                        className="flex items-center gap-3 py-3"
                                    >
                                        <UserAvatar
                                            member={expense.paidBy}
                                            className="size-9 shrink-0"
                                        />
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate font-body-md text-body-md font-medium text-on-surface">
                                                {expense.description}
                                            </p>
                                            <p className="font-label-sm text-label-sm text-on-surface-variant">
                                                {expense.paidBy.name} ·{' '}
                                                {expense.date}
                                            </p>
                                        </div>
                                        <div className="shrink-0 text-right">
                                            <p className="font-body-md text-body-md font-medium text-on-surface">
                                                {expense.amount}
                                            </p>
                                            <p
                                                className={cn(
                                                    'font-label-sm text-label-sm',
                                                    expense.yourShareIsPositive
                                                        ? 'text-primary'
                                                        : 'text-error',
                                                )}
                                            >
                                                {expense.yourShare}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <section className="rounded-xl bg-surface-container-lowest p-lg shadow-card lg:col-span-2">
                            <div className="mb-md flex items-center justify-between">
                                <h3 className="font-headline-md text-headline-md text-on-surface">
                                    Soldes
                                </h3>
                                <Link
                                    href="/preview/settle-up"
                                    className="font-label-md text-label-md text-primary hover:underline"
                                >
                                    Régler
                                </Link>
                            </div>
                            <ul className="divide-y divide-surface-container-highest">
                                {memberBalances.map(
                                    ({ member, amount, positive }) => (
                                        <li
                                            key={member.id}
                                            className="flex items-center gap-3 py-3"
                                        >
                                            <UserAvatar
                                                member={member}
                                                className="size-9 shrink-0"
                                            />
                                            <span className="flex-1 font-body-md text-body-md text-on-surface">
                                                {member.name}
                                            </span>
                                            <span
                                                className={cn(
                                                    'font-body-md text-body-md font-medium',
                                                    positive
                                                        ? 'text-primary'
                                                        : 'text-error',
                                                )}
                                            >
                                                {amount}
                                            </span>
                                        </li>
                                    ),
                                )}
                            </ul>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
}
