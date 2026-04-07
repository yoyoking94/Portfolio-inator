'use client';

import { sendContactEmail, verifyAndSend } from '@/app/lib/sendEmail';
import { useState } from 'react';

const ALLOWED_DOMAINS = [
    'gmail.com', 'outlook.com', 'outlook.fr',
    'hotmail.com', 'hotmail.fr', 'live.com',
    'icloud.com', 'me.com', 'mac.com'
];

function validateEmail(email: string): string | null {
    const domain = email.split('@')[1]?.toLowerCase();
    if (!domain) return "Adresse email invalide.";
    if (!ALLOWED_DOMAINS.includes(domain))
        return `Seules les adresses Gmail, Outlook et iCloud sont acceptées.`;
    return null;
}

const inputClass = "w-full border-2 border-black text-pixel-sm cursor-none hoverable text-base md:text-pixel-sm";
const inputStyle = { padding: '8px 10px' };

const Contact = () => {
    const [step, setStep] = useState<'form' | 'verify'>('form');
    const [verifyEmail, setVerifyEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<{ success?: boolean; error?: string } | null>(null);
    const [emailError, setEmailError] = useState<string | null>(null);

    function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
        const val = e.target.value;
        if (val.includes('@')) {
            setEmailError(validateEmail(val));
        } else {
            setEmailError(null);
        }
    }

    const handleSubmit = async (formData: FormData) => {
        const email = formData.get('email') as string;
        const error = validateEmail(email);
        if (error) {
            setEmailError(error);
            return;
        }

        setIsLoading(true);
        setStatus(null);
        const result = await sendContactEmail(formData);
        setIsLoading(false);

        if (result.codeSent) {
            setVerifyEmail(email);
            setOtp('');
            setStep('verify');
        } else {
            setStatus({ error: result.error });
        }
    };

    const handleVerify = async () => {
        setIsLoading(true);
        setStatus(null);
        const result = await verifyAndSend(verifyEmail, otp);
        setIsLoading(false);

        if (result.success) {
            setStatus({ success: true });
            setStep('form');
            setOtp('');
        } else {
            setStatus({ error: result.error });
            // Si "Recommence depuis le début", on remet le formulaire
            if (result.error?.includes('Recommence')) {
                setStep('form');
            }
        }
    };

    const handleBack = () => {
        setStep('form');
        setOtp('');
        setStatus(null);
    };

    return (
        <section id='contact' className="min-h-dvh w-full flex flex-col items-center justify-center scroll-mt-[10dvh]">
            <h2 className="text-center my-10">
                Contact
            </h2>

            {/* ── ÉTAPE 1 : Formulaire ── */}
            {step === 'form' && (
                <form action={handleSubmit} className="space-y-4 w-full max-w-lg">

                    <div>
                        <label className="block text-pixel-sm mb-1 cursor-none">Nom</label>
                        <input
                            name="name"
                            className={inputClass}
                            style={inputStyle}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-pixel-sm mb-1 cursor-none">Email</label>
                        <input
                            name="email"
                            type="email"
                            onChange={handleEmailChange}
                            className={`${inputClass} ${emailError ? 'border-red-500' : ''}`}
                            style={inputStyle}
                            required
                        />
                        {emailError && (
                            <p className="text-red-600 text-xs mt-1">{emailError}</p>
                        )}
                        <p className="text-xs opacity-40 mt-1">
                            Acceptés : Gmail, Outlook, iCloud
                        </p>
                    </div>

                    <div>
                        <label className="block text-pixel-sm mb-1 cursor-none">Sujet</label>
                        <input
                            name="subject"
                            placeholder="Ex: Candidature React, Question projet..."
                            className={inputClass}
                            style={inputStyle}
                            required
                            maxLength={100}
                        />
                    </div>

                    <div>
                        <label className="block text-pixel-sm mb-1 cursor-none">Message</label>
                        <textarea
                            name="message"
                            className={`${inputClass} h-32 md:h-24`}
                            style={inputStyle}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading || !!emailError}
                        className="w-full bg-black text-white text-pixel-sm hover:bg-gray-800 transition-all cursor-none hoverable disabled:opacity-50"
                        style={{ padding: '10px 4px' }}
                    >
                        {isLoading ? 'Envoi du code...' : 'Envoyer'}
                    </button>

                </form>
            )}

            {/* ── ÉTAPE 2 : Vérification OTP ── */}
            {step === 'verify' && (
                <div className="space-y-4 w-full max-w-lg">

                    <p className="text-sm">
                        Un code à 6 chiffres a été envoyé à <strong>{verifyEmail}</strong>. Saisis-le ci-dessous pour confirmer l&apos;envoi.
                    </p>

                    <div>
                        <label className="block text-pixel-sm mb-1 cursor-none">Code de vérification</label>
                        <input
                            value={otp}
                            onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                            placeholder="123456"
                            maxLength={6}
                            className={inputClass}
                            style={{ ...inputStyle, letterSpacing: '6px', fontSize: '20px' }}
                        />
                        <p className="text-xs opacity-40 mt-1">Expire dans 10 minutes.</p>
                    </div>

                    <button
                        onClick={handleVerify}
                        disabled={isLoading || otp.length !== 6}
                        className="w-full bg-black text-white text-pixel-sm hover:bg-gray-800 transition-all cursor-none hoverable disabled:opacity-50"
                        style={{ padding: '10px 4px' }}
                    >
                        {isLoading ? 'Vérification...' : 'Valider le code'}
                    </button>

                    <button
                        onClick={handleBack}
                        disabled={isLoading}
                        className="w-full border-2 border-black text-pixel-sm hover:bg-gray-100 transition-all cursor-none hoverable disabled:opacity-50"
                        style={{ padding: '10px 4px' }}
                    >
                        ← Retour
                    </button>

                </div>
            )}

            {/* ── Messages de statut ── */}
            {status?.success && (
                <p className="mt-4 p-4 border-2 border-green-500 bg-green-100 text-pixel-sm text-green-800 w-full max-w-lg">
                    Merci ! Ton message m&apos;est bien parvenu. Je te réponds sous 48h.
                </p>
            )}
            {status?.error && (
                <p className="mt-4 p-4 border-2 border-red-500 bg-red-100 text-pixel-sm text-red-800 w-full max-w-lg">
                    {status.error}
                </p>
            )}

        </section>
    );
};

export default Contact;