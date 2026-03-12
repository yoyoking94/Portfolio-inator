import Link from 'next/link';
import React from 'react';

export default function PolitiqueConfidentialite() {
    return (
        <main style={{ padding: '5% 10%', maxWidth: '800px', margin: '0 auto' }}>
            <Link href="/" className="text-sm underline hover:opacity-60 cursor-none hoverable">
                ← Retour
            </Link>

            <h1 className="uppercase tracking-widest font-bold text-2xl mt-6 mb-8">
                Politique de confidentialité
            </h1>

            <section className="space-y-6">
                <article>
                    <h2 className="uppercase tracking-widest font-bold border-b border-black pb-1 mb-2">
                        Données collectées
                    </h2>
                    <p>Ce site collecte uniquement les données que vous transmettez volontairement via le formulaire de contact :</p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                        <li>Nom</li>
                        <li>Adresse email</li>
                        <li>Sujet et message</li>
                    </ul>
                </article>

                <article>
                    <h2 className="uppercase tracking-widest font-bold border-b border-black pb-1 mb-2">
                        Utilisation des données
                    </h2>
                    <p>Les données collectées via le formulaire de contact sont utilisées exclusivement pour répondre à votre message. Elles ne sont ni vendues, ni partagées avec des tiers.</p>
                </article>

                <article>
                    <h2 className="uppercase tracking-widest font-bold border-b border-black pb-1 mb-2">
                        Cookies
                    </h2>
                    <p>Ce site n&apos;utilise pas de cookies de traçage ou publicitaires. Aucun cookie tiers n&apos;est déposé sur votre navigateur.</p>
                </article>

                <article>
                    <h2 className="uppercase tracking-widest font-bold border-b border-black pb-1 mb-2">
                        Hébergement des données
                    </h2>
                    <p>Les données de la base de données sont hébergées sur <strong>Neon</strong> (infrastructure cloud sécurisée). Les déploiements sont gérés par <strong>Vercel</strong>.</p>
                </article>

                <article>
                    <h2 className="uppercase tracking-widest font-bold border-b border-black pb-1 mb-2">
                        Vos droits
                    </h2>
                    <p>Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification et de suppression de vos données. Pour exercer ces droits, contactez : <a href="mailto:contact@yovish.space" className="underline hoverable cursor-none">contact@yovish.space</a></p>
                </article>

                <article>
                    <h2 className="uppercase tracking-widest font-bold border-b border-black pb-1 mb-2">
                        Contact DPO
                    </h2>
                    <p>Responsable du traitement : Yovish MOONESAMY — <a href="mailto:contact@yovish.space" className="underline hoverable cursor-none">contact@yovish.space</a></p>
                </article>
            </section>
        </main>
    );
}
