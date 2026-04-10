import CustomCursor from "@/app/components/common/CustomCursor";
import Footer from "@/app/components/layout/Footer";
import Nav from "@/app/components/layout/Nav";

export default function PolitiqueConfidentialite() {
    return (
        <>
            <CustomCursor />
            <Nav></Nav>
            <main className="min-h-dvh flex flex-col items-center justify-center py-20">
                <section>
                    <h2 className="uppercase tracking-widest font-bold text-2xl mt-6 mb-8 text-center">
                        Politique de confidentialité
                    </h2>
                    <article className="py-5">
                        <h3 className="uppercase tracking-widest font-bold border-b border-black pb-1 mb-2">
                            Données collectées
                        </h3>
                        <p>Ce site collecte uniquement les données que vous transmettez volontairement via le formulaire de contact :</p>
                        <ul className="list-disc list-inside mt-2 space-y-1">
                            <li>Nom</li>
                            <li>Adresse email</li>
                            <li>Sujet et message</li>
                        </ul>
                    </article>

                    <article className="py-5">
                        <h3 className="uppercase tracking-widest font-bold border-b border-black pb-1 mb-2">
                            Utilisation des données
                        </h3>
                        <p>Les données collectées via le formulaire de contact sont utilisées exclusivement pour répondre à votre message. Elles ne sont ni vendues, ni partagées avec des tiers.</p>
                    </article>

                    <article className="py-5">
                        <h3 className="uppercase tracking-widest font-bold border-b border-black pb-1 mb-2">
                            Cookies
                        </h3>
                        <p>Ce site n&apos;utilise pas de cookies de traçage ou publicitaires. Aucun cookie tiers n&apos;est déposé sur votre navigateur.</p>
                    </article>

                    <article className="py-5">
                        <h3 className="uppercase tracking-widest font-bold border-b border-black pb-1 mb-2">
                            Hébergement des données
                        </h3>
                        <p>Les données de la base de données sont hébergées sur <strong>Neon</strong> (infrastructure cloud sécurisée). Les déploiements sont gérés par <strong>Vercel</strong>.</p>
                    </article>

                    <article className="py-5">
                        <h3 className="uppercase tracking-widest font-bold border-b border-black pb-1 mb-2">
                            Vos droits
                        </h3>
                        <p>Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification et de suppression de vos données. Pour exercer ces droits, contactez : <a href="mailto:yovish.pro@gmail.com" className="underline hoverable cursor-none">contact@yovish.space</a></p>
                    </article>

                    <article className="py-5">
                        <h3 className="uppercase tracking-widest font-bold border-b border-black pb-1 mb-2">
                            Contact DPO
                        </h3>
                        <p>Responsable du traitement : Yovish MOONESAMY — <a href="mailto:yovish.pro@gmail.com" className="underline hoverable cursor-none">contact@yovish.space</a></p>
                    </article>
                </section>
            </main>
            <Footer></Footer>
        </>
    );
}
