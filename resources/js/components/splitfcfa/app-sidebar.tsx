import { Link, usePage } from '@inertiajs/react';
import { BarChart3, Bell, Handshake, LayoutDashboard, Plus, Receipt } from 'lucide-react';
import { UserAvatar } from '@/components/splitfcfa/user-avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UserMenuContent } from '@/components/user-menu-content';
import splitfcfaLogo from '@/images/splitfcfa-logo.png';
import { staggerReveal } from '@/lib/stagger-reveal';
import { cn } from '@/lib/utils';
import { dashboard } from '@/routes';

export type SplitNavKey = 'dashboard' | 'expenses' | 'settle-up' | 'analytics';

const NAV_ITEMS: { key: SplitNavKey; label: string; icon: typeof LayoutDashboard; href: string }[] = [
    { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: dashboard().url },
    { key: 'expenses', label: 'Expenses', icon: Receipt, href: '/preview/expenses' },
    { key: 'settle-up', label: 'Settle Up', icon: Handshake, href: '/preview/settle-up' },
    { key: 'analytics', label: 'Analytics', icon: BarChart3, href: '/preview/analytics' },
];

type SplitSidebarProps = {
    active?: SplitNavKey;
    onAddExpense?: () => void;
};

export function SplitSidebar({ active, onAddExpense }: SplitSidebarProps) {
    const { auth } = usePage().props;
    const user = auth.user;

    return (
        <>
            {/* Desktop sidebar — solid teal: the dominant-color statement of
                the "Warm Ledger" direction, not just a pale accent tint. In
                dark mode, primary itself becomes a bright mint (correct per
                Material Design 3, but wrong for a "rail" surface), so the
                rail pins to primary-container/on-primary-container instead
                — a darker, constant teal variant of the same identity. */}
            <nav className="fixed top-0 left-0 z-50 hidden h-screen w-64 flex-col gap-sm bg-primary py-lg shadow-[4px_0_32px_rgba(0,32,29,0.28)] md:flex dark:bg-primary-container">
                <div className="mb-8 flex items-center gap-3 px-6">
                    <img
                        src={splitfcfaLogo}
                        alt="SplitFCFA"
                        className="size-10 rounded-full object-cover ring-2 ring-on-primary/20 dark:ring-on-primary-container/20"
                    />
                    <div>
                        <h1 className="font-headline-md text-headline-md text-on-primary dark:text-on-primary-container">
                            SplitFCFA
                        </h1>
                        <p className="font-label-sm text-label-sm text-primary-fixed-dim/80">
                            Collaborative Harmony
                        </p>
                    </div>
                </div>
                <div className="flex flex-1 flex-col gap-2 px-4">
                    {NAV_ITEMS.map((item, index) => {
                        const reveal = staggerReveal(index);

                        return (
                            <Link
                                key={item.key}
                                href={item.href}
                                className={cn(
                                    'mx-2 flex items-center gap-4 rounded-xl px-4 py-3 font-label-md text-label-md transition-all duration-200 active:scale-98',
                                    reveal.className,
                                    active === item.key
                                        ? 'bg-primary-fixed text-on-primary-fixed shadow-sm'
                                        : 'text-on-primary/75 hover:translate-x-1 hover:bg-on-primary/10 hover:text-on-primary dark:text-on-primary-container/75 dark:hover:bg-on-primary-container/10 dark:hover:text-on-primary-container',
                                )}
                                style={reveal.style}
                            >
                                <item.icon className="size-5" />
                                {item.label}
                            </Link>
                        );
                    })}
                </div>
                <div className="mt-auto px-4">
                    <button
                        type="button"
                        onClick={onAddExpense}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary-fixed py-3 font-label-md text-label-md text-on-primary-fixed transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(0,0,0,0.25)] active:scale-95"
                    >
                        <Plus className="size-5" />
                        Add Expense
                    </button>
                    {user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button
                                    type="button"
                                    className="mt-lg flex w-full items-center gap-3 rounded-xl px-2 py-1 text-left transition-colors hover:bg-on-primary/10 dark:hover:bg-on-primary-container/10"
                                >
                                    <UserAvatar
                                        member={{ id: 'me', name: user.name, tone: 'primary' }}
                                        className="size-10 bg-primary-fixed text-on-primary-fixed ring-2 ring-on-primary/20 dark:ring-on-primary-container/20"
                                    />
                                    <div className="min-w-0">
                                        <p className="truncate font-label-md text-label-md text-on-primary dark:text-on-primary-container">
                                            {user.name}
                                        </p>
                                        <p className="font-label-sm text-label-sm text-on-primary/60 dark:text-on-primary-container/60">
                                            Profil
                                        </p>
                                    </div>
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start" side="top" className="w-56">
                                <UserMenuContent user={user} />
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <div className="mt-lg flex items-center gap-3 px-2">
                            <UserAvatar
                                member={{ id: 'guest', name: 'Vous', tone: 'primary' }}
                                className="size-10 bg-primary-fixed text-on-primary-fixed ring-2 ring-on-primary/20 dark:ring-on-primary-container/20"
                            />
                            <div>
                                <p className="font-label-md text-label-md text-on-primary dark:text-on-primary-container">
                                    Vous
                                </p>
                                <p className="font-label-sm text-label-sm text-on-primary/60 dark:text-on-primary-container/60">
                                    Profil
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </nav>

            {/* Mobile header */}
            <header className="sticky top-0 z-40 flex items-center justify-between bg-surface px-margin-mobile py-4 shadow-[0_4px_20px_rgba(0,104,95,0.1)] md:hidden">
                <h1 className="flex items-center gap-2 font-headline-md text-headline-md text-primary font-bold">
                    <img
                        src={splitfcfaLogo}
                        alt="SplitFCFA"
                        className="size-8 rounded-full object-cover"
                    />
                    SplitFCFA
                </h1>
                <div className="flex gap-4">
                    <button
                        type="button"
                        className="text-on-surface-variant transition-colors duration-200 hover:text-primary active:scale-95"
                    >
                        <Bell className="size-5" />
                    </button>
                    {user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button type="button">
                                    <UserAvatar
                                        member={{ id: 'me', name: user.name, tone: 'primary' }}
                                        className="size-8 border-2 border-surface-container-highest"
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
                            className="size-8 border-2 border-surface-container-highest"
                        />
                    )}
                </div>
            </header>
            <div className="sticky top-[64px] z-30 flex gap-4 overflow-x-auto border-b border-surface-container-highest bg-surface px-margin-mobile py-2 md:hidden">
                {NAV_ITEMS.map((item) => (
                    <Link
                        key={item.key}
                        href={item.href}
                        className={cn(
                            'shrink-0 pb-1 font-label-md text-label-md whitespace-nowrap',
                            active === item.key
                                ? 'border-b-2 border-primary font-bold text-primary'
                                : 'text-on-surface-variant transition-colors duration-200 hover:text-primary',
                        )}
                    >
                        {item.label}
                    </Link>
                ))}
            </div>
        </>
    );
}
