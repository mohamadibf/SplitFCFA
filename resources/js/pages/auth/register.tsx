import { Form, Head } from '@inertiajs/react';
import { ArrowRight, Eye, EyeOff, Lock, Mail, User } from 'lucide-react';
import { useState } from 'react';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Checkbox } from '@/components/ui/checkbox';
import splitfcfaLogo from '@/images/splitfcfa-logo.png';
import { login } from '@/routes';
import { store } from '@/routes/register';

type Props = {
    passwordRules: string;
};

export default function Register({ passwordRules }: Props) {
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] =
        useState(false);

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC] p-4">
            <Head title="Inscription" />

            <main className="split-stagger relative w-full max-w-md overflow-hidden rounded-lg bg-white p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] sm:p-10">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#006D5B] to-[#F56C6C]" />

                <div className="mb-8 text-center">
                    <img
                        src={splitfcfaLogo}
                        alt="SplitFCFA"
                        className="mx-auto mb-4 size-16 rounded-lg border border-gray-100 object-contain shadow-sm"
                    />
                    <h1 className="mb-2 font-['Instrument_Serif'] text-4xl font-normal text-gray-900">
                        Créez votre compte
                    </h1>
                    <p className="text-sm text-[#4A5568]">
                        Rejoignez-nous pour simplifier vos dépenses communes.
                    </p>
                </div>

                <Form
                    {...store.form()}
                    resetOnSuccess={['password', 'password_confirmation']}
                    disableWhileProcessing
                    className="space-y-5"
                >
                    {({ processing, errors }) => (
                        <>
                            <div>
                                <label
                                    htmlFor="name"
                                    className="mb-1.5 block text-sm font-semibold text-gray-800"
                                >
                                    Nom complet
                                </label>
                                <div className="relative">
                                    <User className="pointer-events-none absolute inset-y-0 left-0 my-auto ml-3 size-5 text-gray-400" />
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        required
                                        autoFocus
                                        autoComplete="name"
                                        placeholder="Jean Dupont"
                                        className="block w-full rounded-md border-transparent bg-[#EEF2F6] py-2.5 pr-3 pl-10 text-sm text-gray-900 transition-colors duration-200 focus:border-transparent focus:bg-white focus:ring-2 focus:ring-[#006D5B]"
                                    />
                                </div>
                                <InputError
                                    message={errors.name}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="email"
                                    className="mb-1.5 block text-sm font-semibold text-gray-800"
                                >
                                    Adresse e-mail
                                </label>
                                <div className="relative">
                                    <Mail className="pointer-events-none absolute inset-y-0 left-0 my-auto ml-3 size-5 text-gray-400" />
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        autoComplete="email"
                                        placeholder="nom@exemple.com"
                                        className="block w-full rounded-md border-transparent bg-[#EEF2F6] py-2.5 pr-3 pl-10 text-sm text-gray-900 transition-colors duration-200 focus:border-transparent focus:bg-white focus:ring-2 focus:ring-[#006D5B]"
                                    />
                                </div>
                                <InputError message={errors.email} />
                            </div>

                            <div>
                                <label
                                    htmlFor="password"
                                    className="mb-1.5 block text-sm font-semibold text-gray-800"
                                >
                                    Mot de passe
                                </label>
                                <div className="relative">
                                    <Lock className="pointer-events-none absolute inset-y-0 left-0 my-auto ml-3 size-5 text-gray-400" />
                                    <input
                                        id="password"
                                        name="password"
                                        type={
                                            showPassword ? 'text' : 'password'
                                        }
                                        required
                                        autoComplete="new-password"
                                        placeholder="••••••••"
                                        passwordrules={passwordRules}
                                        className="block w-full rounded-md border-transparent bg-[#EEF2F6] py-2.5 pr-10 pl-10 text-sm text-gray-900 transition-colors duration-200 focus:border-transparent focus:bg-white focus:ring-2 focus:ring-[#006D5B]"
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
                                        className="absolute inset-y-0 right-0 my-auto mr-3 text-gray-500 hover:text-gray-700"
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

                            <div>
                                <label
                                    htmlFor="password_confirmation"
                                    className="mb-1.5 block text-sm font-semibold text-gray-800"
                                >
                                    Confirmer le mot de passe
                                </label>
                                <div className="relative">
                                    <Lock className="pointer-events-none absolute inset-y-0 left-0 my-auto ml-3 size-5 text-gray-400" />
                                    <input
                                        id="password_confirmation"
                                        name="password_confirmation"
                                        type={
                                            showPasswordConfirmation
                                                ? 'text'
                                                : 'password'
                                        }
                                        required
                                        autoComplete="new-password"
                                        placeholder="••••••••"
                                        passwordrules={passwordRules}
                                        className="block w-full rounded-md border-transparent bg-[#EEF2F6] py-2.5 pr-10 pl-10 text-sm text-gray-900 transition-colors duration-200 focus:border-transparent focus:bg-white focus:ring-2 focus:ring-[#006D5B]"
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPasswordConfirmation(
                                                (prev) => !prev,
                                            )
                                        }
                                        aria-label={
                                            showPasswordConfirmation
                                                ? 'Masquer le mot de passe'
                                                : 'Afficher le mot de passe'
                                        }
                                        className="absolute inset-y-0 right-0 my-auto mr-3 text-gray-500 hover:text-gray-700"
                                    >
                                        {showPasswordConfirmation ? (
                                            <EyeOff className="size-5" />
                                        ) : (
                                            <Eye className="size-5" />
                                        )}
                                    </button>
                                </div>
                                <InputError
                                    message={errors.password_confirmation}
                                />
                            </div>

                            <div className="mt-4 flex items-start">
                                <div className="flex h-5 items-center">
                                    <Checkbox
                                        id="terms"
                                        name="terms"
                                        required
                                        className="rounded border-gray-300 focus-visible:ring-[#006D5B]/50 data-[state=checked]:border-[#006D5B] data-[state=checked]:bg-[#006D5B]"
                                    />
                                </div>
                                <div className="ml-2 text-sm">
                                    <label
                                        htmlFor="terms"
                                        className="font-medium text-[#4A5568]"
                                    >
                                        J&apos;accepte les{' '}
                                        <a
                                            href="#"
                                            className="text-[#006D5B] hover:underline"
                                        >
                                            conditions d&apos;utilisation
                                        </a>{' '}
                                        et la{' '}
                                        <a
                                            href="#"
                                            className="text-[#006D5B] hover:underline"
                                        >
                                            politique de confidentialité
                                        </a>
                                        .
                                    </label>
                                </div>
                            </div>

                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    data-test="register-user-button"
                                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-[#006D5B] px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors duration-200 hover:bg-[#005a4a] focus:ring-2 focus:ring-[#006D5B] focus:ring-offset-2 focus:outline-none disabled:opacity-70"
                                >
                                    S&apos;inscrire
                                    <ArrowRight className="ml-2 size-4" />
                                </button>
                            </div>
                        </>
                    )}
                </Form>

                <div className="mt-8 text-center text-sm text-[#4A5568]">
                    Déjà un compte ?{' '}
                    <TextLink
                        href={login()}
                        className="font-medium text-[#006D5B] decoration-transparent hover:underline"
                    >
                        Se connecter
                    </TextLink>
                </div>
            </main>
        </div>
    );
}
