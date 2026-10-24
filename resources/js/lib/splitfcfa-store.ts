import { useSyncExternalStore } from 'react';
import {
    currentUser,
    expenses as seedExpenses,
    settlements as seedSettlements,
} from '@/lib/splitfcfa-mock-data';
import type {
    ExpenseCategory,
    MockExpense,
    MockSettlement,
} from '@/lib/splitfcfa-mock-data';

// Mini-store en mémoire pour la vitrine : survit à la navigation Inertia
// (SPA) et remplace le backend tant que les écrans sont en données mockées.
type State = {
    expenses: MockExpense[];
    settlements: MockSettlement[];
    addExpenseOpen: boolean;
};

let state: State = {
    expenses: seedExpenses,
    settlements: seedSettlements,
    addExpenseOpen: false,
};

const listeners = new Set<() => void>();

function setState(patch: Partial<State>) {
    state = { ...state, ...patch };
    listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
    listeners.add(listener);

    return () => {
        listeners.delete(listener);
    };
}

export function useSplitStore<T>(selector: (current: State) => T): T {
    return useSyncExternalStore(
        subscribe,
        () => selector(state),
        () => selector(state),
    );
}

export function setAddExpenseOpen(open: boolean) {
    setState({ addExpenseOpen: open });
}

export function formatFcfa(value: number): string {
    return `${Math.round(Math.abs(value)).toLocaleString('en-US')} FCFA`;
}

export function formatFcfaShort(value: number): string {
    return value >= 1000 ? `${Math.round(value / 1000)}k` : String(value);
}

export function expenseTotal(expenses: MockExpense[]): number {
    return expenses.reduce((sum, expense) => sum + expense.amountValue, 0);
}

type NewExpense = {
    description: string;
    amount: number;
    category: ExpenseCategory;
    date: Date;
};

export function addExpense({
    description,
    amount,
    category,
    date,
}: NewExpense) {
    const share = amount / 2;
    const expense: MockExpense = {
        id: `exp-${Date.now()}`,
        date: date.toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        }),
        description,
        category,
        paidBy: currentUser,
        amount: formatFcfa(amount),
        amountValue: amount,
        yourShare: `+${formatFcfa(share)}`,
        yourShareIsPositive: true,
    };

    setState({ expenses: [expense, ...state.expenses] });
}

export function settleDebt(id: string) {
    setState({
        settlements: state.settlements.filter(
            (settlement) => settlement.id !== id,
        ),
    });
}

export function resetDemo() {
    setState({ expenses: seedExpenses, settlements: seedSettlements });
}
