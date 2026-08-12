import { ShoppingCart, TrainFront, Umbrella } from 'lucide-react';
import type { ExpenseCategory } from '@/lib/splitfcfa-mock-data';
import { cn } from '@/lib/utils';

const CATEGORY_CONFIG: Record<
    ExpenseCategory,
    { label: string; icon: typeof ShoppingCart; classes: string }
> = {
    repas: {
        label: 'Repas',
        icon: ShoppingCart,
        classes: 'bg-primary/15 text-primary',
    },
    transport: {
        label: 'Transport',
        icon: TrainFront,
        classes: 'bg-secondary/15 text-secondary',
    },
    loisirs: {
        label: 'Loisirs',
        icon: Umbrella,
        classes: 'bg-tertiary/15 text-tertiary',
    },
};

type CategoryBadgeProps = {
    category: ExpenseCategory;
    className?: string;
};

export function CategoryBadge({ category, className }: CategoryBadgeProps) {
    const config = CATEGORY_CONFIG[category];
    const Icon = config.icon;

    return (
        <span
            className={cn(
                'inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-label-sm text-label-sm',
                config.classes,
                className,
            )}
        >
            <Icon className="size-4" />
            {config.label}
        </span>
    );
}
