import { Form, Head } from '@inertiajs/react';
import { OTPInputContext, REGEXP_ONLY_DIGITS } from 'input-otp';
import { RefreshCw } from 'lucide-react';
import { useContext, useMemo, useState } from 'react';
import InputError from '@/components/input-error';
import { Atmosphere } from '@/components/splitfcfa/atmosphere';
import { InputOTP, InputOTPGroup } from '@/components/ui/input-otp';
import { OTP_MAX_LENGTH } from '@/hooks/use-two-factor-auth';
import splitfcfaLogo from '@/images/splitfcfa-logo.png';
import { cn } from '@/lib/utils';
import { store } from '@/routes/two-factor/login';

function OtpSlot({ index }: { index: number }) {
    const context = useContext(OTPInputContext);
    const { char, isActive } = context.slots[index];

    return (
        <div
            className={cn(
                // Inter + tabular-nums here, not the serif headline font: a
                // security code needs unambiguous digits, not editorial flair.
                'flex h-14 w-12 items-center justify-center rounded-lg bg-surface-container-high font-body-md text-headline-md text-on-surface tabular-nums outline-none transition-colors duration-200',
                isActive && 'bg-surface-container-lowest ring-2 ring-primary',
            )}
        >
            {char}
        </div>
    );
}

export default function TwoFactorChallenge() {
    const [showRecoveryInput, setShowRecoveryInput] = useState<boolean>(false);
    const [code, setCode] = useState<string>('');

    const content = useMemo(() => {
        if (showRecoveryInput) {
            return {
                title: 'Code de récupération',
                description:
                    'Confirmez votre identité en entrant l\'un de vos codes de récupération.',
                toggleText: 'utiliser un code d\'authentification',
            };
        }

        return {
            title: 'Vérifiez votre code',
            description: 'Entrez le code à 6 chiffres envoyé à votre adresse.',
            toggleText: 'utiliser un code de récupération',
        };
    }, [showRecoveryInput]);

    const toggleRecoveryMode = (clearErrors: () => void): void => {
        setShowRecoveryInput(!showRecoveryInput);
        clearErrors();
        setCode('');
    };

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-surface p-4">
            <Head title="Vérification en deux étapes" />
            <Atmosphere />

            <main className="split-stagger relative w-full max-w-md">
                <div className="flex flex-col items-center rounded-xl bg-surface-container-lowest p-8 text-center shadow-card md:p-10">
                    <img
                        src={splitfcfaLogo}
                        alt="SplitFCFA"
                        className="mx-auto mb-8 size-24 object-contain"
                    />

                    <div className="mb-8">
                        <h1 className="mb-4 font-headline-lg-mobile text-headline-lg-mobile text-on-surface md:font-headline-lg md:text-headline-lg">
                            {content.title}
                        </h1>
                        <p className="mx-auto max-w-[280px] font-body-md text-body-md text-on-surface-variant">
                            {content.description}
                        </p>
                    </div>

                    <Form
                        {...store.form()}
                        className="flex w-full flex-col items-center gap-8"
                        resetOnError
                        resetOnSuccess={!showRecoveryInput}
                    >
                        {({ errors, processing, clearErrors }) => (
                            <>
                                {showRecoveryInput ? (
                                    <div className="w-full">
                                        <input
                                            name="recovery_code"
                                            type="text"
                                            placeholder="Entrez le code de récupération"
                                            autoFocus={showRecoveryInput}
                                            required
                                            className="w-full rounded-lg bg-surface-container-high px-4 py-3 text-center font-body-md text-body-md text-on-surface outline-none focus:ring-2 focus:ring-primary"
                                        />
                                        <InputError message={errors.recovery_code} className="mt-2" />
                                    </div>
                                ) : (
                                    <div className="flex w-full flex-col items-center gap-3">
                                        <InputOTP
                                            name="code"
                                            maxLength={OTP_MAX_LENGTH}
                                            value={code}
                                            onChange={(value) => setCode(value)}
                                            disabled={processing}
                                            pattern={REGEXP_ONLY_DIGITS}
                                            autoFocus
                                            containerClassName="w-full max-w-[320px] justify-between gap-2"
                                        >
                                            <InputOTPGroup className="w-full justify-between gap-2">
                                                {Array.from({ length: OTP_MAX_LENGTH }, (_, index) => (
                                                    <OtpSlot key={index} index={index} />
                                                ))}
                                            </InputOTPGroup>
                                        </InputOTP>
                                        <InputError message={errors.code} />
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full rounded-full bg-primary py-4 font-label-md text-label-md text-on-primary shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:scale-95 disabled:opacity-70"
                                >
                                    Vérifier le code
                                </button>

                                <div className="flex flex-col items-center gap-2 text-center">
                                    {!showRecoveryInput && (
                                        <>
                                            <span className="font-body-md text-body-md text-on-surface-variant">
                                                Vous n&apos;avez pas reçu le code ?
                                            </span>
                                            <button
                                                type="button"
                                                className="mx-auto flex items-center justify-center gap-1 font-label-md text-label-md text-primary transition-colors duration-200 hover:text-primary-container"
                                            >
                                                <RefreshCw className="size-[18px]" />
                                                Renvoyer le code
                                            </button>
                                        </>
                                    )}
                                    <button
                                        type="button"
                                        className="font-label-sm text-label-sm text-on-surface-variant underline decoration-outline-variant underline-offset-4 transition-colors hover:text-primary"
                                        onClick={() => toggleRecoveryMode(clearErrors)}
                                    >
                                        ou {content.toggleText}
                                    </button>
                                </div>
                            </>
                        )}
                    </Form>
                </div>
            </main>
        </div>
    );
}