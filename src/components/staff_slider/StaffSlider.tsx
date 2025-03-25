import { useEffect, useRef, useState } from "react";
import masters from "../../data/masters.json";
import "./StaffSlider.scss";
import gsap from "gsap";

interface Master {
    name: string;
    position: string;
    image: string;
}

export default function StaffSlider() {
    const [activeIndex, setActiveIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const total = masters.length;

    const getWrappedIndex = (index: number) => {
        return (index + total) % total;
    };

    const next = () => {
        setActiveIndex((prev) => (prev + 1) % total);
    };

    const prev = () => {
        setActiveIndex((prev) => (prev - 1 + total) % total);
    };

    useEffect(() => {
        const cards = containerRef.current?.querySelectorAll(".staff__item");
        if (!cards) return;

        cards.forEach((card, i) => {
            const offset = i - Math.floor(cards.length / 2);
            const distance = Math.abs(offset);

            const scale = 1 - 0.15 * distance;
            const blur = distance >= 3 ? 2 : 0;

            gsap.to(card, {
                scale,
                filter: `blur(${blur}px)`,
                duration: 0.5,
                ease: "power2.out",
            });
        });
    }, [activeIndex]);

    const getVisibleSlides = () => {
        const slides = [];
        for (let i = -2; i <= 2; i++) {
            const index = getWrappedIndex(activeIndex + i);
            slides.push(masters[index]);
        }
        return slides;
    };

    const visibleSlides = getVisibleSlides();

    return (
        <div className="staff__slider">
            <div className="staff__list" ref={containerRef}>
                {visibleSlides.map((master: Master, i) => (
                    <div className="staff__item" key={i}>
                        <img src={master.image} alt={master.name} />
                    </div>
                ))}
            </div>
            <div className="staff__info">
                <h3>{masters[activeIndex].name}</h3>
                <p>{masters[activeIndex].position}</p>
            </div>
            <button className="staff__arrow left" onClick={prev}>&#10094;</button>
            <button className="staff__arrow right" onClick={next}>&#10095;</button>
        </div>
    );
}
