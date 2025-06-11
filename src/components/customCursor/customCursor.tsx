import { useEffect } from "react"

const CustomCursor = () => {
    useEffect(() => {
        /* ==== custom cursor ==== */
        const cursorDot: HTMLElement | null = document.getElementById('cursorDot');
        const cursorOutline: HTMLElement | null = document.getElementById('cursorOutline');
        const hoverables: NodeListOf<Element> = document.querySelectorAll('.hoverable');

        window.addEventListener("mousemove", onMouseMove);
        for (let i: number = 0; i < hoverables.length; i++) {
            hoverables[i].addEventListener('mouseenter', onMouseHover);
            hoverables[i].addEventListener('mouseleave', onMouseHoverOut);
        }

        function onMouseMove(e: MouseEvent): void {
            const positionX: number = e.clientX;
            const positionY: number = e.clientY;

            if (cursorDot) {
                cursorDot.style.left = `${positionX}px`;
                cursorDot.style.top = `${positionY}px`;
            }

            if (cursorOutline) {
                cursorOutline.animate([
                    { left: `${positionX}px`, top: `${positionY}px` }
                ], { duration: 500, fill: "forwards" });
            }
        }

        function onMouseHover(): void {
            if (cursorOutline) {
                cursorOutline.style.width = "100px";
                cursorOutline.style.height = "100px";
            }
        }

        function onMouseHoverOut(): void {
            if (cursorOutline) {
                cursorOutline.style.width = "40px";
                cursorOutline.style.height = "40px";
            }
        }
        /* ==== end custom cursor ==== */
    }, [])
    return (
        <>
            <div className="cursorBall cursorDot" id="cursorDot"></div>
            <div className="cursorBall cursorOutline" id="cursorOutline"></div>
        </>
    )
}

export default CustomCursor