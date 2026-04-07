import CustomCursor from "@/app/components/common/CustomCursor";
import Footer from "@/app/components/layout/Footer";
import Nav from "@/app/components/layout/Nav";

export default function MentionsLegales() {
    return (
        <>
            <CustomCursor />
            <Nav></Nav>
            <main style={{ padding: '5% 10%', height: '86dvh' }}>
                <section className="space-y-6" style={{ height: 'auto', minHeight: 'auto', alignItems: 'start' }}>
                    <h1 className="uppercase tracking-widest font-bold text-2xl mt-6 mb-8">
                        Mentions légales
                    </h1>
                    <article>
                        <h2 className="uppercase tracking-widest font-bold border-b border-black pb-1 mb-2">
                            Éditeur du site
                        </h2>
                        <p>Nom : Yovish MOONESAMY</p>
                        <p>Statut : Particulier</p>
                        <p>Email : <a href="mailto:yovish.pro@gmail.com" className="underline hoverable cursor-none">contact@yovish.space</a></p>
                        <p>Site web : <a href="https://yovish.space" className="underline hoverable cursor-none">yovish.space</a></p>
                    </article>

                    <article>
                        <h2 className="uppercase tracking-widest font-bold border-b border-black pb-1 mb-2">
                            Hébergeur
                        </h2>
                        <p>Vercel Inc.</p>
                        <p>440 N Barranca Ave #4133, Covina, CA 91723, États-Unis</p>
                        <p><a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="underline hoverable cursor-none">vercel.com</a></p>
                    </article>

                    <article>
                        <h2 className="uppercase tracking-widest font-bold border-b border-black pb-1 mb-2">
                            Propriété intellectuelle
                        </h2>
                        <p>L&apos;ensemble du contenu de ce site (textes, images, code source) est la propriété exclusive de Yovish MOONESAMY. Toute reproduction, même partielle, est interdite sans autorisation préalable.</p>
                    </article>

                    <article>
                        <h2 className="uppercase tracking-widest font-bold border-b border-black pb-1 mb-2">
                            Responsabilité
                        </h2>
                        <p>L&apos;éditeur s&apos;efforce d&apos;assurer l&apos;exactitude des informations publiées sur ce site. Toutefois, il ne saurait être tenu responsable des erreurs, omissions ou des résultats qui pourraient être obtenus par un mauvais usage de ces informations.</p>
                    </article>
                </section>
            </main>
            <Footer></Footer>
        </>
    );
}