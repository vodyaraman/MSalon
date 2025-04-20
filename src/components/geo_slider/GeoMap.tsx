import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./GeoMap.scss";



export default function GeoMap() {
    const [activeMap, setActiveMap] = useState<"kremlin" | "pasternak">("kremlin");
    const [mapUnlocked, setMapUnlocked] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    const maps = {
        kremlin: "https://yandex.ru/map-widget/v1/?um=constructor%3Ae7ed58587048c3db95bf2ace27309bbac873ec3dec2ca9a82e87796097331c50&source=constructor",
        pasternak: "https://yandex.ru/map-widget/v1/?um=constructor%3A0380e24f6a1fa03987633bc665d0bf4bfd8ca612badf65448da785765be093f8&source=constructor",
    };

    useEffect(() => {
        const sectionEl = sectionRef.current;
        const lenis = window.lenis;
        if (!sectionEl || !lenis) return;

        const trigger = ScrollTrigger.create({
            trigger: sectionEl,
            start: "top bottom",
            end: "bottom top",
            onLeave: () => setMapUnlocked(false),
            onLeaveBack: () => setMapUnlocked(false),
        });

        return () => {
            trigger.kill();
        };
    }, []);

    return (
        <article className="geo__content" ref={sectionRef}>

            <div className="geo__map">
                {!mapUnlocked && (
                    <div className="geo__overlay">
                        <button
                            className="geo__overlay-button"
                            onClick={() => setMapUnlocked(true)}
                        >
                            Показать карту
                        </button>
                    </div>
                )}

                <iframe
                    src={maps[activeMap]}
                    width="100%"
                    height="400"
                    frameBorder="0"
                    style={{
                        filter: mapUnlocked ? "none" : "blur(5px)",
                        pointerEvents: mapUnlocked ? "auto" : "none",
                        transition: "filter 0.3s ease",
                    }}
                />
            </div>

            <div className="geo__controls">
                {activeMap === "kremlin" ? (
                    <button onClick={() => setActiveMap("pasternak")}>
                        Показать памятник Пастернаку
                    </button>
                ) : (
                    <button onClick={() => setActiveMap("kremlin")}>
                        Показать Кремль
                    </button>
                )}
            </div>
        </article>
    );
}
