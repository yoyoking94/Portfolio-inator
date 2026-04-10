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
        const eventsMinDistance = 60;

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
                                            16 Jan
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#0" data-date="28/02/2014" className="hoverable">
                                            28 Feb
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#0" data-date="20/04/2014" className="hoverable">
                                            20 Mar
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#0" data-date="20/05/2014" className="hoverable">
                                            20 May
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#0" data-date="09/07/2014" className="hoverable">
                                            09 Jul
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#0" data-date="30/08/2014" className="hoverable">
                                            30 Aug
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#0" data-date="15/09/2014" className="hoverable">
                                            15 Sep
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#0" data-date="01/11/2014" className="hoverable">
                                            01 Nov
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
                                <h2>Horizontal Timeline</h2>
                                <em>January 16th, 2014</em>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum
                                    praesentium officia, fugit recusandae ipsa, quia velit nulla
                                    adipisci? Consequuntur aspernatur at, eaque hic repellendus sit
                                    dicta consequatur quae, ut harum ipsam molestias maxime non nisi
                                    reiciendis eligendi! Doloremque quia pariatur harum ea amet
                                    quibusdam quisquam, quae, temporibus dolores porro doloribus.
                                </p>
                            </li>

                            <li data-date="28/02/2014">
                                <h2>Event title here</h2>
                                <em>February 28th, 2014</em>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum
                                    praesentium officia, fugit recusandae ipsa, quia velit nulla
                                    adipisci? Consequuntur aspernatur at, eaque hic repellendus sit
                                    dicta consequatur quae, ut harum ipsam molestias maxime non nisi
                                    reiciendis eligendi! Doloremque quia pariatur harum ea amet
                                    quibusdam quisquam, quae, temporibus dolores porro doloribus.
                                </p>
                            </li>

                            <li data-date="20/04/2014">
                                <h2>Event title here</h2>
                                <em>March 20th, 2014</em>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum
                                    praesentium officia, fugit recusandae ipsa, quia velit nulla
                                    adipisci? Consequuntur aspernatur at, eaque hic repellendus sit
                                    dicta consequatur quae, ut harum ipsam molestias maxime non nisi
                                    reiciendis eligendi! Doloremque quia pariatur harum ea amet
                                    quibusdam quisquam, quae, temporibus dolores porro doloribus.
                                </p>
                            </li>

                            <li data-date="20/05/2014">
                                <h2>Event title here</h2>
                                <em>May 20th, 2014</em>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum
                                    praesentium officia, fugit recusandae ipsa, quia velit nulla
                                    adipisci? Consequuntur aspernatur at, eaque hic repellendus sit
                                    dicta consequatur quae, ut harum ipsam molestias maxime non nisi
                                    reiciendis eligendi! Doloremque quia pariatur harum ea amet
                                    quibusdam quisquam, quae, temporibus dolores porro doloribus.
                                </p>
                            </li>

                            <li data-date="09/07/2014">
                                <h2>Event title here</h2>
                                <em>July 9th, 2014</em>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum
                                    praesentium officia, fugit recusandae ipsa, quia velit nulla
                                    adipisci? Consequuntur aspernatur at, eaque hic repellendus sit
                                    dicta consequatur quae, ut harum ipsam molestias maxime non nisi
                                    reiciendis eligendi! Doloremque quia pariatur harum ea amet
                                    quibusdam quisquam, quae, temporibus dolores porro doloribus.
                                </p>
                            </li>

                            <li data-date="30/08/2014">
                                <h2>Event title here</h2>
                                <em>August 30th, 2014</em>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum
                                    praesentium officia, fugit recusandae ipsa, quia velit nulla
                                    adipisci? Consequuntur aspernatur at, eaque hic repellendus sit
                                    dicta consequatur quae, ut harum ipsam molestias maxime non nisi
                                    reiciendis eligendi! Doloremque quia pariatur harum ea amet
                                    quibusdam quisquam, quae, temporibus dolores porro doloribus.
                                </p>
                            </li>

                            <li data-date="15/09/2014">
                                <h2>Event title here</h2>
                                <em>September 15th, 2014</em>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum
                                    praesentium officia, fugit recusandae ipsa, quia velit nulla
                                    adipisci? Consequuntur aspernatur at, eaque hic repellendus sit
                                    dicta consequatur quae, ut harum ipsam molestias maxime non nisi
                                    reiciendis eligendi! Doloremque quia pariatur harum ea amet
                                    quibusdam quisquam, quae, temporibus dolores porro doloribus.
                                </p>
                            </li>

                            <li data-date="01/11/2014">
                                <h2>Event title here</h2>
                                <em>November 1st, 2014</em>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum
                                    praesentium officia, fugit recusandae ipsa, quia velit nulla
                                    adipisci? Consequuntur aspernatur at, eaque hic repellendus sit
                                    dicta consequatur quae, ut harum ipsam molestias maxime non nisi
                                    reiciendis eligendi! Doloremque quia pariatur harum ea amet
                                    quibusdam quisquam, quae, temporibus dolores porro doloribus.
                                </p>
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