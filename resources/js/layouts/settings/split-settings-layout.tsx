import { Link } from '@inertiajs/react';
import type { PropsWithChildren } from 'react';
import { SplitSidebar } from '@/components/splitfcfa/app-sidebar';
import { Atmosphere } from '@/components/splitfcfa/atmosphere';
import { useCurrentUrl } from '@/hooks/use-current-url';
import { cn } from '@/lib/utils';
import { edit as editAppearance } from '@/routes/appearance';
import { edit } from '@/routes/profile';
import { edit as editSecurity } from '@/routes/security';

const SETTINGS_NAV_ITEMS = [
    { title: 'Profil', href: edit() },
    { title: 'Sécurité', href: editSecurity() },
    { title: 'Apparence', href: editAppearance() },
];

export function SplitSettingsLayout({ children }: PropsWithChildren) {
    const { isCurrentOrParentUrl } = useCurrentUrl();

    return (
        <div className="flex min-h-screen w-full flex-col bg-surface text-on-surface antialiased md:flex-row">
            <SplitSidebar />

            <main className="relative w-full flex-1 md:ml-64">
                <Atmosphere />
                <div className="relative mx-auto max-w-4xl space-y-lg p-margin-mobile md:p-margin-desktop">
                    <div>
                        <p className="mb-1 font-label-md text-label-md text-primary uppercase tracking-wider">
                            Votre compte
                        </p>
                        <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface md:font-headline-lg md:text-headline-lg">
                            Réglages
                        </h2>
                        <p className="mt-1 font-body-md text-body-md text-on-surface-variant">
                            Gérez votre profil et les paramètres de votre compte.
                        </p>
                    </div>

                    <nav className="flex gap-2 border-b border-surface-container-highest">
                        {SETTINGS_NAV_ITEMS.map((item) => (
                            <Link
                                key={item.title}
                                href={item.href}
                                className={cn(
                                    'border-b-2 px-1 pb-3 font-label-md text-label-md whitespace-nowrap transition-colors duration-200',
                                    isCurrentOrParentUrl(item.href)
                                        ? 'border-primary font-bold text-primary'
                                        : 'border-transparent text-on-surface-variant hover:text-primary',
                                )}
                            >
                                {item.title}
                            </Link>
                        ))}
                    </nav>

                    <div className="split-stagger space-y-12 rounded-xl bg-surface-container-lowest p-lg shadow-card md:p-xl">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}
