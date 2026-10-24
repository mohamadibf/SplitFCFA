import type { InertiaLinkProps } from '@inertiajs/react';
import { clsx } from 'clsx';
import type { ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

// Les tailles de texte personnalisées (@theme) doivent être connues de
// tailwind-merge, sinon `text-headline-lg` est pris pour une couleur et
// supprimé dès qu'une vraie couleur `text-*` est présente dans le même cn().
const twMerge = extendTailwindMerge({
    extend: {
        classGroups: {
            'font-size': [
                {
                    text: [
                        'display-lg',
                        'headline-lg',
                        'headline-lg-mobile',
                        'headline-md',
                        'body-lg',
                        'body-md',
                        'label-md',
                        'label-sm',
                    ],
                },
            ],
        },
    },
});

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function toUrl(url: NonNullable<InertiaLinkProps['href']>): string {
    return typeof url === 'string' ? url : url.url;
}
