'use client';

import CustomCursor from '@/app/components/common/CustomCursor';
import Footer from '@/app/components/layout/Footer';
import Nav from '@/app/components/layout/Nav';
import { sendContactEmail, verifyAndSend } from '@/app/lib/sendEmail';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

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

const inputClass =
    "w-full border-2 border-black text-pixel-sm cursor-none hoverable text-base md:text-pixel-sm";
const inputStyle = { padding: '8px 10px' };

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
    exit: { opacity: 0, y: -16, transition: { duration: 0.3, ease: 'easeIn' as const } },
};

const ContactPage = () => {
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
        if (error) { setEmailError(error); return; }

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
            if (result.error?.includes('Recommence')) setStep('form');
        }
    };

    const handleBack = () => {
        setStep('form');
        setOtp('');
        setStatus(null);
    };

    return (
        <>
            <CustomCursor />
            <Nav />
            <main className="min-h-dvh w-full flex flex-col items-center justify-center scroll-mt-[8dvh] bg-[url('/svg/bg/map.svg')] bg-no-repeat bg-cover relative overflow-hidden">

                {/* Hero SVG */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                    style={{ width: '100%' }}
                >
                    <svg
                        viewBox="0 0 1560 420"
                        xmlns="http://www.w3.org/2000/svg"
                        role="img"
                        aria-label="Contact"
                        style={{ width: '100%', height: 'auto', display: 'block' }}
                        preserveAspectRatio="xMidYMid meet"
                    >
                        <rect width="1560" height="420" fill="none" />
                        <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle"
                            fontSize="150" fontWeight="900" letterSpacing="-10"
                            fill="#E8E0DA" opacity="0.9"
                        >
                            CONTACT
                        </text>
                        <text x="50%" y="60%" textAnchor="middle" dominantBaseline="middle"
                            fontSize="100" fontWeight="900" letterSpacing="-6"
                            fill="#411222"
                        >
                            CONTACT
                        </text>
                    </svg>
                </motion.div>

                <section className="z-2 mb-30 w-full">
                    <motion.div
                        className="bg-[#f7f4e7] mx-auto w-full max-w-3xl px-4 py-6 sm:px-6 lg:px-8"
                        initial={{ opacity: 0, y: 32 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
                    >
                        <AnimatePresence mode="wait">

                            {/* Étape formulaire */}
                            {step === 'form' && (
                                <motion.form
                                    key="form"
                                    action={handleSubmit}
                                    className="w-full"
                                    variants={fadeUp}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                >
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
                                        <div className="flex flex-col gap-2">
                                            <label htmlFor="name" className="text-sm font-medium">Nom</label>
                                            <input
                                                id="name" name="name" type="text"
                                                className="min-h-12 w-full border border-black/15 bg-white px-4 py-3 text-base outline-none transition focus:border-black"
                                            />
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <label htmlFor="firstname" className="text-sm font-medium">Prénom</label>
                                            <input
                                                id="firstname" name="firstname" type="text"
                                                className="min-h-12 w-full border border-black/15 bg-white px-4 py-3 text-base outline-none transition focus:border-black"
                                            />
                                        </div>

                                        <div className="flex flex-col gap-2 md:col-span-2">
                                            <label htmlFor="email" className="text-sm font-medium">Email</label>
                                            <input
                                                id="email" name="email" type="email"
                                                onChange={handleEmailChange}
                                                className="min-h-12 w-full border border-black/15 bg-white px-4 py-3 text-base outline-none transition focus:border-black"
                                            />
                                            <AnimatePresence>
                                                {emailError && (
                                                    <motion.p
                                                        className="mt-1 text-xs text-red-600"
                                                        initial={{ opacity: 0, y: -4 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: -4 }}
                                                        transition={{ duration: 0.2 }}
                                                    >
                                                        {emailError}
                                                    </motion.p>
                                                )}
                                            </AnimatePresence>
                                            <p className="mt-1 text-xs opacity-40">Acceptés : Gmail, Outlook, iCloud</p>
                                        </div>

                                        <div className="flex flex-col gap-2 md:col-span-2">
                                            <label htmlFor="subject" className="text-sm font-medium">Sujet</label>
                                            <input
                                                id="subject" name="subject" type="text"
                                                className="min-h-12 w-full border border-black/15 bg-white px-4 py-3 text-base outline-none transition focus:border-black"
                                            />
                                        </div>

                                        <div className="flex flex-col gap-2 md:col-span-2">
                                            <label htmlFor="message" className="text-sm font-medium">Message</label>
                                            <textarea
                                                id="message" name="message" rows={6}
                                                className="w-full border border-black/15 bg-white px-4 py-3 text-base outline-none transition focus:border-black"
                                            />
                                        </div>

                                        <div className="md:col-span-2">
                                            <button
                                                type="submit"
                                                disabled={isLoading || !!emailError}
                                                className="min-h-12 w-full bg-black px-5 py-3 text-sm font-semibold text-[#f7f4e7] transition hover:bg-[#222] disabled:opacity-50"
                                            >
                                                {isLoading ? 'Envoi du code...' : 'Envoyer'}
                                            </button>
                                        </div>
                                    </div>
                                </motion.form>
                            )}

                            {/* Étape vérification OTP */}
                            {step === 'verify' && (
                                <motion.div
                                    key="verify"
                                    className="w-full space-y-4"
                                    variants={fadeUp}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                >
                                    <p className="text-sm">
                                        Un code à 6 chiffres a été envoyé à <strong>{verifyEmail}</strong>. Saisis-le ci-dessous pour confirmer l&apos;envoi.
                                    </p>

                                    <div>
                                        <label className="mb-1 block text-pixel-sm cursor-none">
                                            Code de vérification
                                        </label>
                                        <input
                                            value={otp}
                                            onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                            placeholder="123456"
                                            maxLength={6}
                                            className={inputClass}
                                            style={{ ...inputStyle, letterSpacing: '6px', fontSize: '20px' }}
                                        />
                                        <p className="mt-1 text-xs opacity-40">Expire dans 10 minutes.</p>
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
                                </motion.div>
                            )}

                        </AnimatePresence>

                        {/* Messages de statut */}
                        <AnimatePresence>
                            {status?.success && (
                                <motion.p
                                    className="mt-6 w-full border-2 border-green-500 bg-green-100 p-4 text-pixel-sm text-green-800"
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 12 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    Merci ! Ton message m&apos;est bien parvenu. Je te réponds sous 48h.
                                </motion.p>
                            )}

                            {status?.error && (
                                <motion.p
                                    className="mt-6 w-full border-2 border-red-500 bg-red-100 p-4 text-pixel-sm text-red-800"
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 12 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    {status.error}
                                </motion.p>
                            )}
                        </AnimatePresence>

                    </motion.div>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default ContactPage;