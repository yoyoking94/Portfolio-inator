'use client';
import { sendContactEmail } from '@/app/lib/sendEmail';
import { useState } from 'react';

const Contact = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<{ success?: boolean; error?: string } | null>(null);

    const handleSubmit = async (formData: FormData) => {
        setIsLoading(true);
        setStatus(null);
        const result = await sendContactEmail(formData);
        setIsLoading(false);
        setStatus(result);
    };

    return (
        <section id='contact' className="scroll-mt-[8dvh]">
            <h2 className="flex items-center place-content-around" style={{ height: '50px', width: '100%' }}>
                Contact
            </h2>

            <form action={handleSubmit} className="space-y-4 w-full max-w-lg">

                <div>
                    <label className="block text-pixel-sm mb-1 cursor-none">Nom</label>
                    <input
                        name="name"
                        className={"w-full border-2 border-black text-pixel-sm cursor-none hoverable text-base md:text-pixel-sm"}
                        style={{ padding: '8px 10px' }}
                        required
                    />
                </div>

                <div>
                    <label className="block text-pixel-sm mb-1 cursor-none">Email</label>
                    <input
                        name="email"
                        type="email"
                        className={"w-full border-2 border-black text-pixel-sm cursor-none hoverable text-base md:text-pixel-sm"}
                        style={{ padding: '8px 10px' }}
                        required
                    />
                </div>

                <div>
                    <label className="block text-pixel-sm mb-1 cursor-none">Sujet</label>
                    <input
                        name="subject"
                        placeholder="Ex: Candidature React, Question projet..."
                        className={"w-full border-2 border-black text-pixel-sm cursor-none hoverable text-base md:text-pixel-sm"}
                        style={{ padding: '8px 10px' }}
                        required
                        maxLength={100}
                    />
                </div>

                <div>
                    <label className="block text-pixel-sm mb-1 cursor-none">Message</label>
                    <textarea
                        name="message"
                        className={"w-full border-2 border-black text-pixel-sm cursor-none hoverable text-base md:text-pixel-sm h-24"}
                        style={{ padding: '8px 10px' }}
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-black text-white text-pixel-sm hover:bg-gray-800 transition-all cursor-none hoverable disabled:opacity-50"
                    style={{ padding: '5px 4px' }}
                >
                    {isLoading ? 'Envoi...' : 'Envoyer'}
                </button>

            </form>

            {status?.success && (
                <p className="mt-4 p-4 border-2 border-green-500 bg-green-100 text-pixel-sm text-green-800 w-full max-w-lg">
                    Merci ! Ton message m&apos;est bien parvenu. Je te réponds sous 48h.
                </p>
            )}
            {status?.error && (
                <p className="mt-4 p-4 border-2 border-red-500 bg-red-100 text-pixel-sm text-red-800 w-full max-w-lg">
                    {status.error} (Essaie de rafraîchir la page)
                </p>
            )}

        </section>
    );
};

export default Contact;
