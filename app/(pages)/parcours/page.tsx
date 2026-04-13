"use client"

import CustomCursor from "@/app/components/common/CustomCursor"
import Footer from "@/app/components/layout/Footer"
import Nav from "@/app/components/layout/Nav"
import { useEffect } from "react";

import "./style.css"

const ParcoursPage = () => {
    useEffect(() => {
        const timelines = document.querySelectorAll<HTMLElement>(
            ".cd-horizontal-timeline"
        );
        const eventsMinDistance = 120;

        if (timelines.length > 0) {
            timelines.forEach(initTimeline);
        }

        interface TimelineComponents {
            timelineWrapper: HTMLElement;
            eventsWrapper: HTMLElement;
            fillingLine: HTMLElement;
            timelineEvents: HTMLAnchorElement[];
            timelineDates: Date[];
            eventsMinLapse: number;
            timelineNavigation: HTMLElement;
            eventsContent: HTMLElement;
        }

        function initTimeline(timeline: HTMLElement): void {
            const timelineComponents: TimelineComponents = {
                timelineWrapper: timeline.querySelector(
                    ".events-wrapper"
                ) as HTMLElement,
                eventsWrapper: null!,
                fillingLine: null!,
                timelineEvents: [],
                timelineDates: [],
                eventsMinLapse: 0,
                timelineNavigation: timeline.querySelector(
                    ".cd-timeline-navigation"
                ) as HTMLElement,
                eventsContent: timeline.querySelector(".events-content") as HTMLElement,
            };

            timelineComponents.eventsWrapper =
                timelineComponents.timelineWrapper.querySelector(
                    ".events"
                ) as HTMLElement;
            timelineComponents.fillingLine =
                timelineComponents.eventsWrapper.querySelector(
                    ".filling-line"
                ) as HTMLElement;
            timelineComponents.timelineEvents = Array.from(
                timelineComponents.eventsWrapper.querySelectorAll("a")
            ) as HTMLAnchorElement[];
            timelineComponents.timelineDates = parseDate(
                timelineComponents.timelineEvents
            );
            timelineComponents.eventsMinLapse = minLapse(
                timelineComponents.timelineDates
            );

            setDatePosition(timelineComponents, eventsMinDistance);
            const timelineTotWidth = setTimelineWidth(
                timelineComponents,
                eventsMinDistance
            );
            timeline.classList.add("loaded");

            timelineComponents.timelineNavigation
                .querySelector(".next")
                ?.addEventListener("click", (e) => {
                    e.preventDefault();
                    updateSlide(timelineComponents, timelineTotWidth, "prev");
                });

            timelineComponents.timelineNavigation
                .querySelector(".prev")
                ?.addEventListener("click", (e) => {
                    e.preventDefault();
                    updateSlide(timelineComponents, timelineTotWidth, "next");
                });

            timelineComponents.timelineEvents.forEach((event) => {
                event.addEventListener("click", (e) => {
                    e.preventDefault();
                    timelineComponents.timelineEvents.forEach((ev) =>
                        ev.classList.remove("selected")
                    );
                    event.classList.add("selected");
                    updateOlderEvents(event);
                    updateFilling(
                        event,
                        timelineComponents.fillingLine,
                        timelineTotWidth
                    );
                    updateVisibleContent(event, timelineComponents.eventsContent);
                });
            });

            document.addEventListener("keyup", (e: KeyboardEvent) => {
                if (!elementInViewport(timeline)) return;

                if (e.key === "ArrowLeft") {
                    showNewContent(timelineComponents, timelineTotWidth, "prev");
                } else if (e.key === "ArrowRight") {
                    showNewContent(timelineComponents, timelineTotWidth, "next");
                }
            });
        }

        function updateSlide(
            components: TimelineComponents,
            totalWidth: number,
            direction: "next" | "prev"
        ): void {
            const translateValue = getTranslateValue(components.eventsWrapper);
            const wrapperWidth = components.timelineWrapper.offsetWidth;

            const newValue =
                direction === "next"
                    ? translateValue + wrapperWidth - eventsMinDistance
                    : translateValue - wrapperWidth + eventsMinDistance;

            translateTimeline(components, newValue, wrapperWidth - totalWidth);
        }

        function showNewContent(
            components: TimelineComponents,
            totalWidth: number,
            direction: "next" | "prev"
        ): void {
            const visible = components.eventsContent.querySelector(
                ".selected"
            ) as HTMLElement | null;
            if (!visible) return;

            const newContent =
                direction === "next"
                    ? visible.nextElementSibling
                    : visible.previousElementSibling;
            if (!newContent) return;

            const selected = components.eventsWrapper.querySelector(
                ".selected"
            ) as HTMLAnchorElement | null;
            if (!selected) return;

            const li = selected.closest("li");
            if (!li) return;

            const newLi =
                direction === "next"
                    ? li.nextElementSibling
                    : li.previousElementSibling;
            const newEvent = newLi?.querySelector("a") as HTMLAnchorElement | null;
            if (!newEvent) return;

            updateFilling(newEvent, components.fillingLine, totalWidth);
            updateVisibleContent(newEvent, components.eventsContent);
            newEvent.classList.add("selected");
            selected.classList.remove("selected");
            updateOlderEvents(newEvent);
            updateTimelinePosition(direction, newEvent, components, totalWidth);
        }

        function updateTimelinePosition(
            direction: "next" | "prev",
            event: HTMLAnchorElement,
            components: TimelineComponents,
            totalWidth: number
        ): void {
            const eventLeft = event.offsetLeft;
            const wrapperWidth = components.timelineWrapper.offsetWidth;
            const translate = getTranslateValue(components.eventsWrapper);

            const shouldTranslate =
                (direction === "next" && eventLeft > wrapperWidth - translate) ||
                (direction === "prev" && eventLeft < -translate);

            if (shouldTranslate) {
                translateTimeline(
                    components,
                    -eventLeft + wrapperWidth / 2,
                    wrapperWidth - totalWidth
                );
            }
        }

        function translateTimeline(
            components: TimelineComponents,
            value: number,
            minTranslate?: number
        ): void {
            value = Math.min(0, value);
            if (minTranslate !== undefined) value = Math.max(minTranslate, value);

            setTransform(components.eventsWrapper, `translateX(${value}px)`);

            const prev = components.timelineNavigation.querySelector(".prev")!;
            const next = components.timelineNavigation.querySelector(".next")!;

            prev.classList.toggle("inactive", value === 0);
            next.classList.toggle("inactive", value === minTranslate);
        }

        function updateFilling(
            event: HTMLAnchorElement,
            line: HTMLElement,
            totalWidth: number
        ): void {
            const eventLeft = event.offsetLeft + event.offsetWidth / 2;
            const scale = eventLeft / totalWidth;
            setTransform(line, `scaleX(${scale})`);
        }

        function setDatePosition(
            components: TimelineComponents,
            min: number
        ): void {
            components.timelineEvents.forEach((event, i) => {
                const distance = daydiff(
                    components.timelineDates[0],
                    components.timelineDates[i]
                );
                const norm = Math.round(distance / components.eventsMinLapse) + 2;
                event.style.left = `${norm * min}px`;
            });
        }

        function setTimelineWidth(
            components: TimelineComponents,
            min: number
        ): number {
            const dates = components.timelineDates;
            const span = daydiff(dates[0], dates[dates.length - 1]);
            const norm = Math.round(span / components.eventsMinLapse) + 4;
            const totalWidth = norm * min;

            components.eventsWrapper.style.width = `${totalWidth}px`;
            updateFilling(
                components.timelineEvents[0],
                components.fillingLine,
                totalWidth
            );
            return totalWidth;
        }

        function updateVisibleContent(
            event: HTMLAnchorElement,
            content: HTMLElement
        ): void {
            const newDate = event.dataset.date;
            const visible = content.querySelector(".selected") as HTMLElement | null;
            const newContent = content.querySelector(
                `[data-date="${newDate}"]`
            ) as HTMLElement | null;

            if (!newContent || !visible) return;

            const enter =
                newContent.compareDocumentPosition(visible) &
                    Node.DOCUMENT_POSITION_FOLLOWING
                    ? "selected enter-left"
                    : "selected enter-right";
            const leave =
                newContent.compareDocumentPosition(visible) &
                    Node.DOCUMENT_POSITION_FOLLOWING
                    ? "leave-right"
                    : "leave-left";

            newContent.className = enter;
            visible.className = leave;

            const onEnd = () => {
                visible.classList.remove("leave-right", "leave-left");
                newContent.classList.remove("enter-right", "enter-left");
                visible.removeEventListener("animationend", onEnd);
            };

            visible.addEventListener("animationend", onEnd);
            content.style.height = `${newContent.offsetHeight}px`;
        }

        function updateOlderEvents(event: HTMLAnchorElement): void {
            const li = event.closest("li");
            if (!li) return;

            let prev = li.previousElementSibling;
            while (prev) {
                const a = prev.querySelector("a");
                if (a) a.classList.add("older-event");
                prev = prev.previousElementSibling;
            }

            let next = li.nextElementSibling;
            while (next) {
                const a = next.querySelector("a");
                if (a) a.classList.remove("older-event");
                next = next.nextElementSibling;
            }
        }

        function getTranslateValue(el: HTMLElement): number {
            const style = window.getComputedStyle(el);
            const transform = style.transform || "none";
            if (transform.includes("matrix")) {
                const values = transform.split(", ");
                return parseFloat(values[4]) || 0;
            }
            return 0;
        }

        function setTransform(el: HTMLElement, value: string): void {
            el.style.transform = value;
        }

        function parseDate(events: HTMLAnchorElement[]): Date[] {
            return events.map((event) => {
                const [d, m, y] = (event.dataset.date || "01/01/2000")
                    .split("/")
                    .map(Number);
                return new Date(y, m - 1, d);
            });
        }

        function daydiff(a: Date, b: Date): number {
            return b.getTime() - a.getTime();
        }

        function minLapse(dates: Date[]): number {
            const lapses = [];
            for (let i = 1; i < dates.length; i++) {
                lapses.push(daydiff(dates[i - 1], dates[i]));
            }
            return Math.min(...lapses);
        }

        function elementInViewport(el: HTMLElement): boolean {
            const rect = el.getBoundingClientRect();
            return (
                rect.top < window.innerHeight &&
                rect.left < window.innerWidth &&
                rect.bottom > 0 &&
                rect.right > 0
            );
        }
    }, []);
    return (
        <>
            <CustomCursor />
            <Nav />
            <main className="min-h-[84dvh] flex flex-col items-center justify-center py-20">
                <h2 className='text-center'>Parcours</h2>
                <section className="cd-horizontal-timeline">
                    <div className="timeline">
                        <div className="events-wrapper">
                            <div className="events">
                                <ol>
                                    <li>
                                        <a href="#0" data-date="16/01/2014" className="selected hoverable">
                                            Sept 2024
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#0" data-date="28/02/2014" className="hoverable">
                                            Mai 2024
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#0" data-date="20/04/2014" className="hoverable">
                                            Fév 2022
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#0" data-date="20/05/2014" className="hoverable">
                                            Fév 2022
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#0" data-date="09/07/2014" className="hoverable">
                                            Déc 2019
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#0" data-date="30/08/2014" className="hoverable">
                                            Sep 2019
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#0" data-date="15/09/2014" className="hoverable">
                                            Sep 2018
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#0" data-date="01/11/2014" className="hoverable">
                                            Fév 2018
                                        </a>
                                    </li>
                                </ol>
                                <span className="filling-line" aria-hidden="true"></span>
                            </div>
                        </div>

                        <ul className="cd-timeline-navigation">
                            <li>
                                <a href="#0" className="prev inactive hoverable">
                                    Prev
                                </a>
                            </li>
                            <li>
                                <a href="#0" className="next hoverable">
                                    Next
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="events-content">
                        <ol>
                            <li className="selected" data-date="16/01/2014">
                                <div className="flex justify-between align-center">
                                    <span>ISCOD - Paris</span>
                                    <span>Septembre 2024 → Juillet 2026</span>
                                </div>
                                <p><span className="underline">Diplôme :</span> Master Bac +5 - Expert en Ingénierie du Logiciel</p>
                                <p><span className="underline">Thématique :</span> Analyse et conseil, Gestion de projet, Développement Logiciel, Technologie avancées</p>
                                <p><span className="underline">Technologie :</span> JS, TSX, Angular, Java, Kotlin, Docker, GIT, NoSQL</p>
                                <p>
                                    <span className="underline">Cours :</span> Analyse des besoins et rédaction de spécifications, Gestion de projet Agile (Scrum/Kanban), Architecture logicielle et design patterns, Développement front-end Angular & React, Développement back-end Java & Node.js, Programmation mobile Android (Kotlin), Conteneurisation avec Docker, Gestion de versions GIT avancée, Bases de données NoSQL (MongoDB), Sécurité applicative et DevOps
                                </p>
                                <p>
                                    L&apos;ISCOD (Institut Supérieur des Compétences de Demain) est une école 100% en ligne et 100% en alternance, spécialisée dans les métiers du numérique, du marketing, du commerce, du management et des ressources humaines. Elle propose des formations diplômantes allant du Bac+2 au Bac+5, reconnues par l&apos;État, avec un rythme pensé pour les apprentis : 1 jour de formation pour 4 jours en entreprise. Membre du groupe AD Education (premier réseau européen de formations créatives, présent dans 10 pays), l&apos;ISCOD bénéficie d&apos;un accompagnement personnalisé à chaque étape du parcours grâce à des chargés d&apos;admission, des learning coachs et un réseau de plus de 600 entreprises partenaires.
                                </p>
                            </li>

                            <li data-date="28/02/2014">
                                <div className="flex justify-between align-center">
                                    <span>Lactalis International - Choisy-Le-Roi</span>
                                    <span>Mai 2024 → Aujourd’hui</span>
                                </div>
                                <p><span className="underline">Chiffre d&apos;affaire (2024):</span> 30 Mds €</p>
                                <p><span className="underline">Poste :</span> Technicien Support Application et Micro-Informatique</p>
                                <p><span className="underline">Mission :</span> Assurer le bon fonctionnement des logiciels</p>

                                <p>Support et Résolution d&apos;Incidents : Diagnostic et résolution rapide des problèmes applicatifs et micro-informatiques, assistance technique aux utilisateurs</p>
                                <p>Gestion du Parc : Installation, configuration, maintenance des équipements et logiciels, application des correctifs (Windev, Webdev, SQL Developper)</p>
                                <p>Suivi des Demandes : Enregistrement et gestion des incidents via un système de ticketing, communication avec les utilisateurs</p>
                                <p>Documentation et Formation : Création de supports, formation des utilisateurs aux outils informatiques (Microsoft 365)</p>
                                <p>Amélioration Continue : Collaboration avec les équipes pour optimiser les systèmes et les applications</p>
                            </li>

                            <li data-date="20/04/2014">
                                <div className="flex justify-between align-center">
                                    <span>Cloud Campus - Paris</span>
                                    <span>Février 2022 → Février 2023</span>
                                </div>
                                <p><span className="underline">Diplôme :</span> Licence Bac +3 - Développeur Web Full-Stack</p>
                                <p><span className="underline">Thématique :</span> SEO, Front-end</p>
                                <p><span className="underline">Technologie :</span> HTML, CSS, JS, React (jsx, tsx), Node.js, GIT, Figma</p>
                                <p>
                                    <span className="underline">Cours :</span> Intégration web HTML/CSS avancée, JavaScript ES6+ et TypeScript, Développement React (JSX/TSX), API REST avec Node.js & Express, Gestion de projet GIT & GitHub, Optimisation SEO, Maquettage UI/UX avec Figma, Déploiement et hébergement web
                                </p>
                                <p>
                                    Cloud Campus est un centre de formation en alternance basé à Compiègne (Oise), dédié aux métiers du numérique et de la relation client. Il propose des formations du Bac+2 au Bac+5, notamment un BTS NDRC (Négociation et Digitalisation de la Relation Client), un titre de Développeur Web Full Stack (Bac+3/4) accessible en full remote, et un Bac+5 Chef de projet digital avec parcours Cybersécurité et Cloud. La pédagogie repose sur 80% de mise en pratique et 20% de théorie, avec des formateurs issus du monde professionnel, et Cloud Campus assure un accompagnement complet de la recherche d&apos;alternance jusqu&apos;à l&apos;obtention du diplôme.
                                </p>
                            </li>

                            <li data-date="20/05/2014">
                                <div className="flex justify-between align-center">
                                    <span>Elyotech - Asnières-sur-Seine</span>
                                    <span>Mai 2024 → Aujourd’hui</span>
                                </div>
                                <p><span className="underline">Chiffre d&apos;affaire (2024):</span> 114 039 €</p>
                                <p><span className="underline">Poste :</span> Développeur web et mobile - Full-stack</p>
                                <p><span className="underline">Mission :</span> Assurer le bon fonctionnement des logiciels</p>

                                <p>Conception et développement : Création d&apos;applications web et mobiles de A à Z, en travaillant sur le front-end, le back-end, et les bases de données (React.tsx, HTML, SCSS, Node.js, Firebase et AWS S3)</p>
                                <p>Analyse des besoins : Compréhension et traduction des besoins clients en solutions techniques adaptées</p>
                                <p>Programmation : Codage des fonctionnalités en utilisant divers langages de programmation</p>
                            </li>

                            <li data-date="09/07/2014">
                                <div className="flex justify-between align-center">
                                    <span>CFA UTEC - Emerainville</span>
                                    <span>Septembre 2019 → Janvier 2022</span>
                                </div>
                                <p><span className="underline">Diplôme :</span> BTS Bac +2 - Système Informatique aux Organisation</p>
                                <p><span className="underline">Thématique :</span> Serveur, Front-end et Back-end, Base de données, Domotique, Algorithme, Prototypage</p>
                                <p><span className="underline">Technologie :</span> HTML, CSS, PHP, Python, JAVA, PostgreSQL</p>
                                <p>
                                    <span className="underline">Cours :</span> Administration systèmes et réseaux, Développement front-end & back-end PHP, Bases de données PostgreSQL, Programmation Python & Java, Domotique et IoT, Algorithmique et structures de données, Prototypage et modélisation UML, Cybersécurité des systèmes d&apos;information
                                </p>
                                <p>
                                    Le CFA UTEC, situé à Émerainville en Seine-et-Marne (77), est l&apos;école de la CCI Seine-et-Marne et forme environ 2 000 jeunes par an à travers une cinquantaine de diplômes, du CAP au Bac+5. Ses formations sont organisées en quatre pôles d&apos;expertise : Gastronomie Academy, Hospitality (Hôtellerie-Restauration-Tourisme), IT Cyber Academy (Informatique, Cybersécurité, Fibre optique) et Management & Marketing (Commerce, Comptabilité, Gestion). L&apos;établissement se distingue par un encadrement pédagogique individualisé assuré par des professionnels confirmés, ainsi qu&apos;un service de conseillers relation entreprise qui aide les candidats à trouver leur contrat d&apos;apprentissage.
                                </p>
                            </li>

                            <li data-date="30/08/2014">
                                <div className="flex justify-between align-center">
                                    <span>Circeo - Paris</span>
                                    <span>Décembre 2019 → Juillet 2021</span>
                                </div>
                                <p><span className="underline">Chiffre d&apos;affaire (2024):</span> 1M €</p>
                                <p><span className="underline">Poste :</span> Développeur web - Front-end</p>
                                <p><span className="underline">Mission :</span> Création de parcours de souscription pour BNP Paribas, Société Générale, Fiat, Renault, Carrefour</p>

                                <p>Analyse des besoins : Recueil et étude des cahiers des charges auprès des clients</p>
                                <p>Conception et développement : Création et habillage des différents composants d&apos;interface utilisateur (HTML, CSS, JS)</p>
                                <p>Intégration et tests : Mise en place de l&apos;intégration continue et réalisation de tests pour assurer la qualité et la performance des applications</p>
                                <p>Collaboration : Travail en équipe avec d&apos;autres développeurs, designers et chefs de projet pour mener à bien les projets</p>
                            </li>

                            <li data-date="15/09/2014">
                                <div className="flex justify-between align-center">
                                    <span>IUT de Valenciennes - Maubeuge</span>
                                    <span>Septembre 2018 → Juillet 2019</span>
                                </div>
                                <p><span className="underline">Diplôme :</span> DUT Bac +2 - Informatique</p>
                                <p><span className="underline">Thématique :</span> Système d&apos;exploitation, Serveur, Front-end, Base de données, POO</p>
                                <p><span className="underline">Technologie :</span> JAVA, Linux (Debian, Ubuntu), MySQL</p>
                                <p>
                                    <span className="underline">Cours :</span> Programmation orientée objet Java, Administration Linux (Debian/Ubuntu), Bases de données MySQL & SQL avancé, Systèmes d&apos;exploitation et virtualisation, Développement web front-end, Réseaux informatiques et protocoles, Algorithmique et mathématiques appliquées
                                </p>
                                <p>
                                    L&apos;IUT de Valenciennes, site de Maubeuge, est un établissement d&apos;enseignement supérieur public rattaché à l&apos;Université Polytechnique Hauts-de-France, situé à Maubeuge dans le département du Nord. Il propose des BUT (Bachelor Universitaire de Technologie) en trois ans, notamment en Informatique (parcours développement d&apos;applications ou déploiement d&apos;applications communicantes et sécurisées) et en Mesures Physiques (parcours matériaux et contrôles physico-chimiques), disponibles en temps plein ou en apprentissage. Depuis plus de cinquante ans, l&apos;IUT entretient une collaboration étroite avec les entreprises régionales, offrant une pédagogie active mêlant travaux pratiques, projets tutorés, stages et une ouverture internationale grâce à des partenariats avec des universités étrangères.
                                </p>
                            </li>

                            <li data-date="01/11/2014">
                                <div className="flex justify-between align-center">
                                    <span>Netapsys / Sodifrance - Paris</span>
                                    <span>Février 2018 → Février 2018</span>
                                </div>
                                <p><span className="underline">Chiffre d&apos;affaire (2024):</span> 110M €</p>
                                <p><span className="underline">Poste :</span> Développeur Web Full-stack</p>
                                <p><span className="underline">Mission :</span> Découverte des différents services de l&apos;entreprise</p>

                                <p>Observation et apprentissage : Immersion dans les différents départements de l&apos;entreprise, avec un focus particulier sur le développement web et les projets digitauxÊ</p>
                                <p>Analyse des processus : Étude des méthodologies de travail et des outils utilisés par les équipes de développement (Sprint)Ê</p>
                                <p>Initiation aux projets : Familiarisation avec les différentes étapes du cycle de développement d&apos;un projet web, de la conception à la livraison (DevOps)Ê</p>
                                <p>Découverte technologique : Exposition aux technologies et frameworks utilisés dans l&apos;entreprise pour le développement web full-stack (HTML, CSS, PHP)Ê</p>
                            </li>
                        </ol>
                    </div>
                </section>

            </main>
            <Footer />

        </>
    )
}

export default ParcoursPage