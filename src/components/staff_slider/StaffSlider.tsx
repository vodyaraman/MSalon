import { useEffect, useRef, useState } from "react";
import masters from "../../data/masters.json";
import "./StaffSlider.scss";
import gsap from "gsap";

export interface Master {
	name: string;
	position: string;
	image: string;
}

export default function StaffSlider() {
	const [activeIndex, setActiveIndex] = useState(0);
	const containerRef = useRef<HTMLDivElement>(null);

	const total = masters.length;

	const getOffset = (from: number, to: number) => {
		const raw = to - from;
		if (raw > total / 2) return raw - total;
		if (raw < -total / 2) return raw + total;
		return raw;
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

		cards.forEach((card, index) => {
			const offset = getOffset(activeIndex, index);
			const distance = Math.abs(offset);

			const isVisible = distance <= 2;
			const scale = offset === 0 ? 1 : 1 - 0.15 * distance;
			const opacity = offset === 0 ? 1 : 0.9 - distance * 0.1;
			const blur = distance >= 3 ? 2 : 0;
			const shift = offset * 220;

			gsap.to(card, {
				x: shift,
				xPercent: -50,
				scale,
				opacity: isVisible ? opacity : 0,
				filter: `blur(${blur}px)`,
				duration: 0.6,
				ease: "power2.out",
				overwrite: true,
			});
		});
	}, [activeIndex]);

	return (
		<div className="staff__slider">
			<div className="staff__list" ref={containerRef}>
				{masters.map((master, index) => (
					<div
						className="staff__item"
						key={master.name}
						style={{
							position: "absolute",
							left: "50%",
							top: 0,
							transform: "translateX(-50%)",
						}}
					>
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
