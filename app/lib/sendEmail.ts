'use server';

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

const pendingVerifications = new Map<string, {
    code: string;
    expiry: number;
    attempts: number;
    name: string;
    subject: string;
    message: string;
}>();

export async function sendContactEmail(formData: FormData) {
    const email = formData.get('email') as string;
    const name = formData.get('name') as string;
    const subject = formData.get('subject') as string;
    const message = formData.get('message') as string;

    if (!name || !email || !subject || !message)
        return { error: 'Tous les champs sont requis.' };

    // Nettoyage des vérifications expirées
    for (const [key, val] of pendingVerifications.entries()) {
        if (Date.now() > val.expiry) pendingVerifications.delete(key);
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = Date.now() + 10 * 60 * 1000;

    pendingVerifications.set(email, { code, expiry, attempts: 0, name, subject, message });

    try {
        await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL!,
            to: [email],
            subject: `Code de vérification : ${code}`,
            html: `
                <!DOCTYPE html>
                <html>
                    <head><meta charset="UTF-8"></head>
                    <body style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                        <h2 style="color: #333;">Vérification de votre email</h2>
                        <p>Bonjour <strong>${name}</strong>,</p>
                        <p>Vous avez tenté d'envoyer un message via mon portfolio. Voici votre code de vérification :</p>
                        <div style="background: #f8f9fa; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0;">
                            <span style="font-size: 36px; font-weight: bold; letter-spacing: 8px; color: #333;">${code}</span>
                        </div>
                        <p style="color: #666;">Ce code expire dans <strong>10 minutes</strong>.</p>
                        <p style="color: #999; font-size: 12px;">Si vous n'êtes pas à l'origine de cette demande, ignorez ce mail.</p>
                    </body>
                </html>
            `,
        });

        return { codeSent: true };
    } catch (error) {
        const resendError = error as { message?: string };
        console.error('Erreur envoi code:', resendError.message);
        return { error: "Impossible d'envoyer le code. Vérifie ton adresse email." };
    }
}

export async function verifyAndSend(email: string, inputCode: string) {
    const entry = pendingVerifications.get(email);

    if (!entry)
        return { error: 'Aucune vérification en cours. Recommence depuis le début.' };

    if (Date.now() > entry.expiry) {
        pendingVerifications.delete(email);
        return { error: 'Code expiré. Recommence depuis le début.' };
    }

    if (entry.attempts >= 3) {
        pendingVerifications.delete(email);
        return { error: 'Trop de tentatives. Recommence depuis le début.' };
    }

    if (entry.code !== inputCode) {
        pendingVerifications.set(email, { ...entry, attempts: entry.attempts + 1 });
        const remaining = 3 - (entry.attempts + 1);
        return { error: `Code incorrect. ${remaining} tentative(s) restante(s).` };
    }

    pendingVerifications.delete(email);

    try {
        await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL!,
            to: [process.env.RESEND_TO_EMAIL!],
            subject: `Portfolio: ${entry.subject}`,
            html: `
                <!DOCTYPE html>
                <html>
                    <head><meta charset="UTF-8"></head>
                    <body style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                        <h2 style="color: #333;">📧 Nouveau message portfolio</h2>
                        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                            <p><strong>👤 Expéditeur :</strong> ${entry.name}</p>
                            <p><strong>📧 Email :</strong> <a href="mailto:${email}">${email}</a></p>
                            <p><strong>📋 Sujet :</strong> ${entry.subject}</p>
                            <hr style="border: 1px solid #eee;">
                            <p><strong>💬 Message :</strong></p>
                            <div style="background: white; padding: 15px; border-left: 4px solid #007bff; white-space: pre-line;">${entry.message}</div>
                        </div>
                        <p style="color: #666; font-size: 12px;">Envoyé via portfolio — ${new Date().toLocaleString('fr-FR')}</p>
                    </body>
                </html>
            `,
        });

        return { success: true };
    } catch (error) {
        const resendError = error as { message?: string; code?: string };
        console.error('Erreur Resend:', resendError.message);
        return {
            error: resendError.code === 'INVALID_FROM'
                ? "Erreur configuration email. Contacte l'admin."
                : 'Erreur envoi. Réessaie plus tard.'
        };
    }
}