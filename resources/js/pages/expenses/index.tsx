import { Head } from '@inertiajs/react';
import {
    ChevronLeft,
    ChevronRight,
    ListFilter,
    Plus,
    Search,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { SplitSidebar } from '@/components/splitfcfa/app-sidebar';
import { Atmosphere } from '@/components/splitfcfa/atmosphere';
import { CategoryBadge } from '@/components/splitfcfa/category-badge';
import { UserAvatar } from '@/components/splitfcfa/user-avatar';
import type { ExpenseCategory } from '@/lib/splitfcfa-mock-data';
import { setAddExpenseOpen, useSplitStore } from '@/lib/splitfcfa-store';
import { staggerReveal } from '@/lib/stagger-reveal';
import { cn } from '@/lib/utils';

const CATEGORY_FILTERS: { value: ExpenseCategory | 'all'; label: string }[] = [
    { value: 'all', label: 'Toutes' },
    { value: 'repas', label: 'Repas' },
    { value: 'transport', label: 'Transport' },
    { value: 'loisirs', label: 'Loisirs' },
];

export default function ExpensesIndex() {
    const allExpenses = useSplitStore((store) => store.expenses);
    const [query, setQuery] = useState('');
    const [category, setCategory] = useState<ExpenseCategory | 'all'>('all');
    const [filtersOpen, setFiltersOpen] = useState(false);

    const expenses = useMemo(() => {
        const needle = query.trim().toLowerCase();

        return allExpenses.filter(
            (expense) =>
                (category === 'all' || expense.category === category) &&
                (needle === '' ||
                    expense.description.toLowerCase().includes(needle) ||
                    expense.paidBy.name.toLowerCase().includes(needle)),
        );
    }, [allExpenses, query, category]);
    const isFiltered = query.trim() !== '' || category !== 'all';

    return (
        <div className="flex min-h-screen w-full flex-col bg-surface font-body-md text-on-surface antialiased md:flex-row">
            <Head title="Liste des dépenses" />

            <SplitSidebar active="expenses" />

            <main className="relative w-full flex-1 md:ml-64">
                <Atmosphere />
                <div className="relative space-y-lg p-margin-mobile md:p-margin-desktop">
                    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                        <div>
                            <p className="mb-1 font-label-md text-label-md tracking-wider text-primary uppercase">
                                Dépenses du groupe
                            </p>
                            <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface md:font-headline-lg md:text-headline-lg">
                                Liste des dépenses
                            </h2>
                            <p className="mt-1 font-body-md text-body-md text-on-surface-variant">
                                Gérez et suivez toutes les transactions du
                                groupe.
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={() => setAddExpenseOpen(true)}
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 font-label-md text-label-md text-on-primary shadow-card transition-all duration-200 active:scale-95 md:hidden"
                        >
                            <Plus className="size-5" />
                            Nouvelle dépense
                        </button>
                    </div>

                    <div className="flex flex-col items-center gap-4 sm:flex-row">
                        <div className="relative w-full sm:w-96">
                            <Search className="absolute top-1/2 left-3 size-5 -translate-y-1/2 text-outline" />
                            <input
                                type="search"
                                value={query}
                                onChange={(event) =>
                                    setQuery(event.target.value)
                                }
                                placeholder="Rechercher une dépense..."
                                className="w-full rounded-xl border-none bg-surface-container-low py-3 pr-4 pl-10 font-body-md text-body-md text-on-surface transition-shadow focus:ring-2 focus:ring-primary"
                            />
                        </div>
                        <button
                            type="button"
                            onClick={() => setFiltersOpen((open) => !open)}
                            aria-expanded={filtersOpen}
                            className={cn(
                                'flex w-full items-center justify-center gap-2 rounded-xl border px-6 py-3 font-label-md text-label-md transition-all duration-200 hover:border-primary hover:bg-surface-container-low hover:text-primary sm:w-auto',
                                category !== 'all'
                                    ? 'border-primary text-primary'
                                    : 'border-outline-variant text-on-surface-variant',
                            )}
                        >
                            <ListFilter className="size-5" />
                            Filtrer
                        </button>
                    </div>

                    {filtersOpen && (
                        <div className="flex flex-wrap gap-2">
                            {CATEGORY_FILTERS.map((item) => (
                                <button
                                    key={item.value}
                                    type="button"
                                    onClick={() => setCategory(item.value)}
                                    aria-pressed={category === item.value}
                                    className={cn(
                                        'rounded-full px-4 py-1.5 font-label-md text-label-md transition-colors',
                                        category === item.value
                                            ? 'bg-primary text-on-primary'
                                            : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-highest',
                                    )}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    )}

                    {expenses.length === 0 && (
                        <div className="rounded-xl bg-surface-container-lowest p-xl text-center shadow-card">
                            <p className="font-body-lg text-body-lg text-on-surface-variant">
                                Aucune dépense trouvée.
                            </p>
                            <button
                                type="button"
                                onClick={() => {
                                    setQuery('');
                                    setCategory('all');
                                }}
                                className="mt-2 font-label-md text-label-md text-primary hover:underline"
                            >
                                Réinitialiser les filtres
                            </button>
                        </div>
                    )}

                    <ul className="space-y-3 md:hidden">
                        {expenses.map((expense) => (
                            <li
                                key={expense.id}
                                className="rounded-xl bg-surface-container-lowest p-4 shadow-card"
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div className="min-w-0">
                                        <p className="font-medium text-on-surface">
                                            {expense.description}
                                        </p>
                                        <p className="font-label-sm text-label-sm text-on-surface-variant">
                                            {expense.date}
                                        </p>
                                    </div>
                                    <CategoryBadge
                                        category={expense.category}
                                        className="shrink-0"
                                    />
                                </div>
                                <div className="mt-3 flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-2 font-label-md text-label-md text-on-surface-variant">
                                        <UserAvatar
                                            member={expense.paidBy}
                                            className="size-6 text-[10px]"
                                        />
                                        Payé par {expense.paidBy.name}
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium text-on-surface">
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
                                </div>
                            </li>
                        ))}
                    </ul>

                    <div className="overflow-hidden rounded-xl bg-surface-container-lowest shadow-card max-md:hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse text-left">
                                <thead>
                                    <tr className="border-b border-surface-container-highest bg-surface-container">
                                        <th className="px-6 py-4 font-label-md text-label-md text-on-surface-variant">
                                            Date
                                        </th>
                                        <th className="px-6 py-4 font-label-md text-label-md text-on-surface-variant">
                                            Description
                                        </th>
                                        <th className="px-6 py-4 font-label-md text-label-md text-on-surface-variant">
                                            Catégorie
                                        </th>
                                        <th className="px-6 py-4 font-label-md text-label-md text-on-surface-variant">
                                            Payé par
                                        </th>
                                        <th className="px-6 py-4 text-right font-label-md text-label-md text-on-surface-variant">
                                            Montant total
                                        </th>
                                        <th className="px-6 py-4 text-right font-label-md text-label-md text-on-surface-variant">
                                            Votre part
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="font-body-md text-body-md text-on-surface">
                                    {expenses.map((expense, index) => {
                                        const reveal = staggerReveal(index, 50);

                                        return (
                                            <tr
                                                key={expense.id}
                                                className={cn(
                                                    'border-b border-surface-container-highest transition-colors last:border-none hover:bg-surface-container-low',
                                                    index % 2 === 1 &&
                                                        'bg-surface',
                                                    reveal.className,
                                                )}
                                                style={reveal.style}
                                            >
                                                <td className="px-6 py-4 whitespace-nowrap text-on-surface-variant">
                                                    {expense.date}
                                                </td>
                                                <td className="px-6 py-4 font-medium">
                                                    {expense.description}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <CategoryBadge
                                                        category={
                                                            expense.category
                                                        }
                                                    />
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <UserAvatar
                                                            member={
                                                                expense.paidBy
                                                            }
                                                            className="size-6 text-[10px]"
                                                        />
                                                        {expense.paidBy.name}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-right font-medium">
                                                    {expense.amount}
                                                </td>
                                                <td
                                                    className={cn(
                                                        'px-6 py-4 text-right font-medium',
                                                        expense.yourShareIsPositive
                                                            ? 'text-primary'
                                                            : 'text-error',
                                                    )}
                                                >
                                                    {expense.yourShare}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <div className="flex items-center justify-between border-t border-surface-container-highest bg-surface px-6 py-4">
                            <p className="font-label-sm text-label-sm text-on-surface-variant">
                                Affichage de {expenses.length === 0 ? 0 : 1} à{' '}
                                {expenses.length} sur{' '}
                                {isFiltered
                                    ? expenses.length
                                    : allExpenses.length}{' '}
                                dépenses
                            </p>
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    disabled
                                    aria-label="Page précédente"
                                    className="flex size-8 items-center justify-center rounded-lg border border-outline-variant text-on-surface-variant transition-colors hover:bg-surface-container hover:text-primary disabled:opacity-50"
                                >
                                    <ChevronLeft className="size-5" />
                                </button>
                                <button
                                    type="button"
                                    disabled
                                    aria-label="Page suivante"
                                    className="flex size-8 items-center justify-center rounded-lg border border-outline-variant text-on-surface-variant transition-colors hover:bg-surface-container hover:text-primary disabled:opacity-50"
                                >
                                    <ChevronRight className="size-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
