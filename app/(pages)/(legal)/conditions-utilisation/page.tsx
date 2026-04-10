import CustomCursor from "@/app/components/common/CustomCursor";
import Footer from "@/app/components/layout/Footer";
import Nav from "@/app/components/layout/Nav";

export default function ConditionsUtilisation() {
    return (
        <>
            <CustomCursor />
            <Nav></Nav>
            <main className="min-h-dvh flex flex-col items-center justify-center py-20">
                <h2 className="uppercase tracking-widest font-bold text-2xl mt-6 mb-8 text-center">Conditions d&apos;utilisation</h2>
                <section>
                    <article className="py-5">
                        <h3 className="uppercase tracking-widest font-bold border-b border-black pb-1 mb-2">Objet :</h3>
                        <p className="text-justify">
                            Les présentes conditions régissent l&apos;utilisation du site portfolio{" "}
                            <strong>yovish.space</strong>, développé et maintenu par Yovish MOONESAMY.
                        </p>
                    </article>

                    <article className="py-5">
                        <h3 className="uppercase tracking-widest font-bold border-b border-black pb-1 mb-2">Accès au site :</h3>
                        <p className="text-justify">
                            L&apos;accès au site est gratuit et ouvert à tout utilisateur disposant
                            d&apos;une connexion internet. L&apos;éditeur se réserve le droit de modifier,
                            suspendre ou interrompre l&apos;accès au site à tout moment sans préavis.
                        </p>
                    </article>

                    <article className="py-5">
                        <h3 className="uppercase tracking-widest font-bold border-b border-black pb-1 mb-2">Utilisation autorisée :</h3>
                        <p className="text-justify">Ce site est un portfolio à visée professionnelle. Vous êtes autorisé à :</p>
                        <ul className="list-disc list-inside mt-2 space-y-1">
                            <li>Consulter le contenu à titre personnel</li>
                            <li>Partager l&apos;URL du site</li>
                            <li>Contacter l&apos;auteur via le formulaire de contact</li>
                        </ul>
                    </article>

                    <article className="py-5">
                        <h3 className="uppercase tracking-widest font-bold border-b border-black pb-1 mb-2">Utilisation interdite :</h3>
                        <p className="text-justify">Il est interdit de :</p>
                        <ul className="pt-2">
                            <li>Reproduire ou copier le contenu sans autorisation écrite</li>
                            <li>Utiliser le site à des fins commerciales ou illégales</li>
                            <li>Tenter d&apos;accéder aux parties non publiques de l&apos;infrastructure</li>
                        </ul>
                    </article>

                    <article className="py-5">
                        <h3 className="uppercase tracking-widest font-bold border-b border-black pb-1 mb-2">Droit applicable :</h3>
                        <p className="text-justify">
                            Les présentes conditions sont soumises au droit français.
                            En cas de litige, les tribunaux français seront seuls compétents.
                        </p>
                    </article>

                    <article className="py-5">
                        <h3 className="uppercase tracking-widest font-bold border-b border-black pb-1 mb-2">Mise à jour :</h3>
                        <p className="text-justify">
                            Ces conditions peuvent être modifiées à tout moment.
                            La date de dernière mise à jour est le <strong>12 mars 2026</strong>.
                        </p>
                    </article>

                </section>
            </main>
            <Footer></Footer>
        </>
    );
}
