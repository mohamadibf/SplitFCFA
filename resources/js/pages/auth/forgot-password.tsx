import { Form, Head } from '@inertiajs/react';
import { ArrowLeft, ArrowRight, Mail } from 'lucide-react';
import InputError from '@/components/input-error';
import { Atmosphere } from '@/components/splitfcfa/atmosphere';
import TextLink from '@/components/text-link';
import splitfcfaLogo from '@/images/splitfcfa-logo.png';
import { login } from '@/routes';
import { email } from '@/routes/password';

export default function ForgotPassword({ status }: { status?: string }) {
    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-surface p-margin-mobile text-on-surface antialiased md:p-margin-desktop">
            <Head title="Mot de passe oublié" />
            <Atmosphere variant="warm" />

            <main className="split-stagger relative z-10 w-full max-w-md">
                <div className="mb-xl flex justify-center">
                    <img
                        src={splitfcfaLogo}
                        alt="SplitFCFA"
                        className="size-24 object-contain drop-shadow-md transition-transform duration-300 hover:scale-105"
                    />
                </div>

                <div className="relative overflow-hidden rounded-[24px] border border-surface-variant bg-surface p-lg shadow-card md:p-xl">
                    <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-primary to-secondary" />

                    <div className="mb-lg text-center">
                        <h1 className="mb-sm font-headline-md text-headline-md text-on-surface">
                            Mot de passe oublié&nbsp;?
                        </h1>
                        <p className="font-body-md text-body-md text-on-surface-variant">
                            Entrez l&apos;adresse e-mail associée à votre compte et nous vous enverrons un
                            lien pour réinitialiser votre mot de passe.
                        </p>
                    </div>

                    {status && (
                        <p className="mb-md text-center font-label-md text-label-md text-primary">
                            {status}
                        </p>
                    )}

                    <Form {...email.form()} className="flex flex-col gap-md">
                        {({ processing, errors }) => (
                            <>
                                <div className="flex flex-col gap-xs">
                                    <label
                                        htmlFor="email"
                                        className="ml-1 font-label-sm text-label-sm text-on-surface-variant"
                                    >
                                        Adresse e-mail
                                    </label>
                                    <div className="group relative">
                                        <Mail className="absolute top-1/2 left-3 size-5 -translate-y-1/2 text-outline-variant transition-colors group-focus-within:text-primary" />
                                        <input
                                            id="email"
                                            type="email"
                                            name="email"
                                            autoComplete="off"
                                            autoFocus
                                            required
                                            placeholder="nom@exemple.com"
                                            className="w-full rounded-xl border border-outline-variant bg-surface-container-low py-3 pr-4 pl-10 font-body-md text-body-md text-on-surface placeholder:text-outline focus:border-transparent focus:ring-2 focus:ring-primary focus:outline-none"
                                        />
                                    </div>
                                    <InputError message={errors.email} />
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    data-test="email-password-reset-link-button"
                                    className="group mt-sm flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-label-md text-label-md text-on-primary shadow-[0_4px_14px_rgba(0,104,95,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-surface-tint active:scale-95 disabled:opacity-70"
                                >
                                    <span>Envoyer le lien</span>
                                    <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
                                </button>
                            </>
                        )}
                    </Form>

                    <div className="mt-xl text-center">
                        <TextLink
                            href={login()}
                            className="group inline-flex items-center gap-2 font-label-md text-label-md text-on-surface-variant decoration-transparent hover:text-primary"
                        >
                            <ArrowLeft className="size-[18px] transition-transform group-hover:-translate-x-1" />
                            Retour à la connexion
                        </TextLink>
                    </div>
                </div>

                <div className="mt-lg text-center font-label-sm text-label-sm text-outline">
                    <p>
                        Besoin d&apos;aide ?{' '}
                        <a href="#" className="font-medium text-primary hover:underline">
                            Contacter le support
                        </a>
                    </p>
                </div>
            </main>
        </div>
    );
}