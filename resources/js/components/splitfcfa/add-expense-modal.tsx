import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Calendar, ChevronDown, Shapes, X } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { UserAvatar } from '@/components/splitfcfa/user-avatar';
import {
    Dialog,
    DialogDescription,
    DialogPortal,
    DialogTitle,
} from '@/components/ui/dialog';
import { currentUser, groupMembers } from '@/lib/splitfcfa-mock-data';
import type { ExpenseCategory } from '@/lib/splitfcfa-mock-data';
import {
    addExpense,
    formatFcfa,
    setAddExpenseOpen,
    useSplitStore,
} from '@/lib/splitfcfa-store';
import { cn } from '@/lib/utils';

type SplitMode = 'egale' | 'personnalisee' | 'pourcentage';

const SPLIT_TABS: { key: SplitMode; label: string }[] = [
    { key: 'egale', label: 'Égale' },
    { key: 'personnalisee', label: 'Personnalisée' },
    { key: 'pourcentage', label: 'Pourcentage' },
];

const CATEGORY_OPTIONS: { value: ExpenseCategory; label: string }[] = [
    { value: 'repas', label: 'Nourriture' },
    { value: 'transport', label: 'Transport' },
    { value: 'loisirs', label: 'Loisirs' },
];

const today = () => new Date().toISOString().slice(0, 10);

export function AddExpenseModal() {
    const open = useSplitStore((store) => store.addExpenseOpen);
    const [splitMode, setSplitMode] = useState<SplitMode>('egale');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(today);
    const [category, setCategory] = useState<ExpenseCategory>('repas');
    const [touched, setTouched] = useState(false);

    const amountValue = Number(amount);
    const amountError = touched && !(amountValue > 0);
    const descriptionError = touched && description.trim() === '';

    const onOpenChange = (next: boolean) => {
        setAddExpenseOpen(next);

        if (!next) {
            setTouched(false);
        }
    };

    const submit = () => {
        setTouched(true);

        if (!(amountValue > 0) || description.trim() === '') {
            return;
        }

        addExpense({
            description: description.trim(),
            amount: amountValue,
            category,
            date: new Date(date || today()),
        });
        toast.success('Dépense ajoutée', {
            description: `${description.trim()} · ${formatFcfa(amountValue)}`,
        });
        setAmount('');
        setDescription('');
        setDate(today());
        setCategory('repas');
        onOpenChange(false);
    };

    const other =
        groupMembers.find((member) => member.id !== currentUser.id) ??
        groupMembers[1];

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogPortal>
                <DialogPrimitive.Overlay className="fixed inset-0 z-40 flex items-center justify-center bg-inverse-surface/40 p-4 backdrop-blur-sm data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
                <DialogPrimitive.Content className="fixed top-1/2 left-1/2 z-50 flex max-h-[85vh] w-full max-w-lg -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-xl bg-surface-container-lowest shadow-modal data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:slide-out-to-bottom-2 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-bottom-2">
                    <div className="flex items-center justify-between border-b border-outline-variant/30 bg-surface-container-low px-lg py-md">
                        <DialogTitle className="font-headline-md text-headline-md text-primary">
                            Ajouter une dépense
                        </DialogTitle>
                        <DialogDescription className="sr-only">
                            Formulaire d&apos;ajout d&apos;une dépense au
                            groupe.
                        </DialogDescription>
                        <DialogPrimitive.Close className="rounded-full p-2 text-on-surface-variant transition-colors hover:bg-surface-container-highest hover:text-primary">
                            <X className="size-5" />
                        </DialogPrimitive.Close>
                    </div>

                    <div className="flex flex-1 flex-col gap-lg overflow-y-auto p-lg">
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="mb-2 block font-label-md text-label-md text-on-surface-variant">
                                    Montant
                                </label>
                                <div className="relative">
                                    <span className="absolute top-1/2 left-4 -translate-y-1/2 font-headline-md text-headline-md text-primary">
                                        FCFA
                                    </span>
                                    <input
                                        type="number"
                                        min="0"
                                        inputMode="numeric"
                                        value={amount}
                                        onChange={(event) =>
                                            setAmount(event.target.value)
                                        }
                                        aria-invalid={amountError}
                                        placeholder="0"
                                        className="w-full rounded-lg border-none bg-surface-container py-3 pr-4 pl-20 font-headline-md text-headline-md text-on-surface placeholder:text-outline-variant focus:ring-2 focus:ring-primary aria-invalid:ring-2 aria-invalid:ring-error"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="mb-2 block font-label-md text-label-md text-on-surface-variant">
                                Description
                            </label>
                            <input
                                type="text"
                                value={description}
                                onChange={(event) =>
                                    setDescription(event.target.value)
                                }
                                aria-invalid={descriptionError}
                                placeholder="Ex: Dîner au restaurant..."
                                className="w-full rounded-lg border-none bg-surface-container px-4 py-3 font-body-md text-body-md text-on-surface placeholder:text-outline-variant focus:ring-2 focus:ring-primary aria-invalid:ring-2 aria-invalid:ring-error"
                            />
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="mb-2 block font-label-md text-label-md text-on-surface-variant">
                                    Date
                                </label>
                                <div className="relative">
                                    <Calendar className="absolute top-1/2 left-3 size-5 -translate-y-1/2 text-on-surface-variant" />
                                    <input
                                        type="date"
                                        value={date}
                                        onChange={(event) =>
                                            setDate(event.target.value)
                                        }
                                        className="w-full rounded-lg border-none bg-surface-container py-3 pr-4 pl-10 font-body-md text-body-md text-on-surface focus:ring-2 focus:ring-primary"
                                    />
                                </div>
                            </div>
                            <div className="flex-1">
                                <label className="mb-2 block font-label-md text-label-md text-on-surface-variant">
                                    Catégorie
                                </label>
                                <div className="relative">
                                    <Shapes className="absolute top-1/2 left-3 size-5 -translate-y-1/2 text-on-surface-variant" />
                                    <select
                                        value={category}
                                        onChange={(event) =>
                                            setCategory(
                                                event.target
                                                    .value as ExpenseCategory,
                                            )
                                        }
                                        className="w-full appearance-none rounded-lg border-none bg-surface-container py-3 pr-4 pl-10 font-body-md text-body-md text-on-surface focus:ring-2 focus:ring-primary"
                                    >
                                        {CATEGORY_OPTIONS.map((option) => (
                                            <option
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="mb-2 block font-label-md text-label-md text-on-surface-variant">
                                Payé par
                            </label>
                            <div className="flex cursor-pointer items-center gap-3 rounded-lg bg-surface-container p-3 transition-colors hover:bg-surface-container-highest">
                                <UserAvatar
                                    member={currentUser}
                                    className="size-10"
                                />
                                <span className="flex-1 font-label-md text-label-md text-on-surface">
                                    {currentUser.name}
                                </span>
                                <ChevronDown className="size-5 text-on-surface-variant" />
                            </div>
                        </div>

                        <div>
                            <label className="mb-2 block font-label-md text-label-md text-on-surface-variant">
                                Pour qui ?
                            </label>
                            <div className="flex rounded-lg bg-surface-container p-1">
                                {SPLIT_TABS.map((tab) => (
                                    <button
                                        key={tab.key}
                                        type="button"
                                        onClick={() => setSplitMode(tab.key)}
                                        className={cn(
                                            'flex-1 rounded-md py-2 text-center font-label-sm text-label-sm transition-all',
                                            splitMode === tab.key
                                                ? 'bg-primary-container text-on-primary-container shadow-sm'
                                                : 'text-on-surface-variant hover:text-on-surface',
                                        )}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-lg border border-outline-variant/20 bg-surface-container-low p-4">
                            <div className="mb-3 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <UserAvatar
                                        member={currentUser}
                                        className="size-8"
                                    />
                                    <span className="font-body-md text-body-md text-on-surface">
                                        {currentUser.name}
                                    </span>
                                </div>
                                <span className="font-label-md text-label-md text-on-surface">
                                    50%
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <UserAvatar
                                        member={other}
                                        className="size-8"
                                    />
                                    <span className="font-body-md text-body-md text-on-surface">
                                        {other.name}
                                    </span>
                                </div>
                                <span className="font-label-md text-label-md text-on-surface">
                                    50%
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 border-t border-outline-variant/30 bg-surface-container-lowest p-md">
                        <DialogPrimitive.Close className="rounded-lg px-6 py-2 font-label-md text-label-md text-on-surface-variant transition-colors hover:bg-surface-container">
                            Annuler
                        </DialogPrimitive.Close>
                        <button
                            type="button"
                            onClick={submit}
                            className="rounded-lg bg-primary px-6 py-2 font-label-md text-label-md text-on-primary shadow-[0_4px_12px_rgba(0,104,95,0.2)] transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(0,104,95,0.3)]"
                        >
                            Enregistrer
                        </button>
                    </div>
                </DialogPrimitive.Content>
            </DialogPortal>
        </Dialog>
    );
}
