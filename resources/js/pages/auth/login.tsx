import { Form, Head } from '@inertiajs/react';
import { ArrowRight, Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { useState } from 'react';
import InputError from '@/components/input-error';
import { Atmosphere } from '@/components/splitfcfa/atmosphere';
import TextLink from '@/components/text-link';
import splitfcfaLogo from '@/images/splitfcfa-logo.png';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';

type Props = {
    status?: string;
    canResetPassword: boolean;
};

export default function Login({ status, canResetPassword }: Props) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-surface p-margin-mobile text-on-surface antialiased md:p-margin-desktop">
            <Head title="Connexion" />
            <Atmosphere variant="warm" />

            <main className="split-stagger relative flex w-full max-w-md flex-col items-center gap-lg overflow-hidden rounded-xl bg-surface-container-lowest p-lg shadow-card md:p-xl">
                <div className="absolute top-0 left-0 h-2 w-full bg-gradient-to-r from-primary to-secondary-container" />

                <header className="z-10 mt-sm flex w-full flex-col items-center gap-sm text-center">
                    <img
                        src={splitfcfaLogo}
                        alt="SplitFCFA"
                        className="size-20 object-contain drop-shadow-sm"
                    />
                    <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface md:font-headline-lg md:text-headline-lg">
                        Content de vous revoir !
                    </h1>
                    <p className="font-body-md text-body-md text-on-surface-variant">
                        Connectez-vous pour gérer vos dépenses communes.
                    </p>
                </header>

                {status && (
                    <p className="z-10 text-center font-label-md text-label-md text-primary">
                        {status}
                    </p>
                )}

                <Form
                    {...store.form()}
                    resetOnSuccess={['password']}
                    className="z-10 flex w-full flex-col gap-md"
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="flex flex-col gap-xs">
                                <label
                                    htmlFor="email"
                                    className="font-label-md text-label-md text-on-surface"
                                >
                                    Adresse e-mail
                                </label>
                                <div className="relative flex items-center">
                                    <Mail className="absolute left-sm size-5 text-outline" />
                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        required
                                        autoFocus
                                        autoComplete="email"
                                        placeholder="nom@exemple.com"
                                        className="w-full rounded-lg border border-transparent bg-surface-container py-sm pr-sm pl-xl font-body-md text-body-md text-on-surface transition-all focus:border-primary focus:ring-2 focus:ring-primary-container/20"
                                    />
                                </div>
                                <InputError message={errors.email} />
                            </div>

                            <div className="flex flex-col gap-xs">
                                <div className="flex items-center justify-between">
                                    <label
                                        htmlFor="password"
                                        className="font-label-md text-label-md text-on-surface"
                                    >
                                        Mot de passe
                                    </label>
                                    {canResetPassword && (
                                        <TextLink
                                            href={request()}
                                            className="font-label-sm text-label-sm text-primary decoration-transparent hover:text-surface-tint"
                                        >
                                            Mot de passe oublié ?
                                        </TextLink>
                                    )}
                                </div>
                                <div className="relative flex items-center">
                                    <Lock className="absolute left-sm size-5 text-outline" />
                                    <input
                                        id="password"
                                        type={
                                            showPassword ? 'text' : 'password'
                                        }
                                        name="password"
                                        required
                                        autoComplete="current-password"
                                        placeholder="••••••••"
                                        className="w-full rounded-lg border border-transparent bg-surface-container py-sm pr-xl pl-xl font-body-md text-body-md text-on-surface transition-all focus:border-primary focus:ring-2 focus:ring-primary-container/20"
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword((prev) => !prev)
                                        }
                                        aria-label={
                                            showPassword
                                                ? 'Masquer le mot de passe'
                                                : 'Afficher le mot de passe'
                                        }
                                        className="absolute right-sm text-outline transition-colors hover:text-on-surface-variant"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="size-5" />
                                        ) : (
                                            <Eye className="size-5" />
                                        )}
                                    </button>
                                </div>
                                <InputError message={errors.password} />
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                data-test="login-button"
                                className="mt-sm flex w-full items-center justify-center gap-xs rounded-lg bg-primary py-sm font-label-md text-label-md text-on-primary transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,104,95,0.15)] disabled:opacity-70"
                            >
                                Se connecter
                                <ArrowRight className="size-[18px]" />
                            </button>
                        </>
                    )}
                </Form>

                <footer className="z-10 mt-sm w-full text-center">
                    <p className="font-body-md text-body-md text-on-surface-variant">
                        Vous n&apos;avez pas de compte ?{' '}
                        <TextLink
                            href={register()}
                            className="font-label-md text-primary decoration-primary decoration-2 underline-offset-2"
                        >
                            Inscrivez-vous
                        </TextLink>
                    </p>
                </footer>
            </main>
        </div>
    );
}
