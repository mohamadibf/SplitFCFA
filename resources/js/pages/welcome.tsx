import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowRight, BarChart3, Handshake, Receipt } from 'lucide-react';
import { Atmosphere } from '@/components/splitfcfa/atmosphere';
import splitfcfaLogo from '@/images/splitfcfa-logo.png';
import { dashboard, login, register } from '@/routes';

const FEATURES = [
    {
        icon: Receipt,
        title: 'Dépenses partagées',
        text: 'Ajoutez une dépense en quelques secondes et répartissez-la équitablement entre les membres.',
    },
    {
        icon: Handshake,
        title: 'Qui doit quoi',
        text: 'Les dettes sont simplifiées pour minimiser le nombre de remboursements.',
    },
    {
        icon: BarChart3,
        title: 'Analyses claires',
        text: 'Suivez vos dépenses par semaine, mois ou année, et par catégorie.',
    },
];

export default function Welcome() {
    const { auth } = usePage().props;

    return (
        <>
            <Head title="Accueil" />
            <div className="relative min-h-screen bg-surface font-body-md text-body-md text-on-surface antialiased">
                <Atmosphere />
                <header className="mx-auto flex max-w-6xl items-center justify-between px-margin-mobile py-lg md:px-margin-desktop">
                    <div className="flex items-center gap-3">
                        <img
                            src={splitfcfaLogo}
                            alt="SplitFCFA"
                            className="size-10 rounded-full object-cover"
                        />
                        <span className="font-headline-md text-headline-md text-primary">
                            SplitFCFA
                        </span>
                    </div>
                    <nav className="flex items-center gap-2 font-label-md text-label-md">
                        {auth.user ? (
                            <Link
                                href={dashboard()}
                                className="rounded-lg bg-primary px-5 py-2 text-on-primary"
                            >
                                Mon tableau de bord
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={login()}
                                    className="rounded-lg px-5 py-2 text-on-surface-variant transition-colors hover:text-primary"
                                >
                                    Se connecter
                                </Link>
                                <Link
                                    href={register()}
                                    className="rounded-lg bg-primary px-5 py-2 text-on-primary"
                                >
                                    S&apos;inscrire
                                </Link>
                            </>
                        )}
                    </nav>
                </header>

                <main className="mx-auto max-w-6xl px-margin-mobile pb-xl md:px-margin-desktop">
                    <section className="py-xl text-center">
                        <p className="mb-2 font-label-md text-label-md tracking-wider text-primary uppercase">
                            Dépenses de groupe en FCFA
                        </p>
                        <h1 className="mx-auto max-w-3xl font-headline-lg-mobile text-headline-lg-mobile md:font-display-lg md:text-display-lg">
                            Partagez les frais, gardez l&apos;harmonie.
                        </h1>
                        <p className="mx-auto mt-4 max-w-xl font-body-lg text-body-lg text-on-surface-variant">
                            SplitFCFA aide vos groupes à suivre qui a payé quoi
                            et à régler leurs comptes simplement.
                        </p>
                        <div className="mt-lg flex flex-col items-center justify-center gap-3 sm:flex-row">
                            <Link
                                href="/preview/dashboard"
                                className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-label-md text-label-md text-on-primary shadow-card transition-transform hover:-translate-y-0.5"
                            >
                                Voir la démo
                                <ArrowRight className="size-4" />
                            </Link>
                            {!auth.user && (
                                <Link
                                    href={register()}
                                    className="rounded-xl border border-outline-variant px-6 py-3 font-label-md text-label-md text-on-surface-variant transition-colors hover:border-primary hover:text-primary"
                                >
                                    Créer un compte
                                </Link>
                            )}
                        </div>
                    </section>

                    <section className="grid gap-gutter md:grid-cols-3">
                        {FEATURES.map((feature) => (
                            <div
                                key={feature.title}
                                className="rounded-xl bg-surface-container-lowest p-lg shadow-card"
                            >
                                <feature.icon className="mb-3 size-7 text-primary" />
                                <h2 className="font-headline-md text-headline-md">
                                    {feature.title}
                                </h2>
                                <p className="mt-1 text-on-surface-variant">
                                    {feature.text}
                                </p>
                            </div>
                        ))}
                    </section>
                </main>
            </div>
        </>
    );
}
