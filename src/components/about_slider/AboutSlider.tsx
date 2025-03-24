import { useEffect, useRef } from "react";
import gsap from "gsap";
import slidesData from "./about-slides.json";

export default function AboutSlider() {
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (typeof window === "undefined") return;
		if (!containerRef.current) return;

		const items = containerRef.current.querySelectorAll(".about__slide");

		items.forEach((el) => {
			gsap.fromTo(
				el,
				{ autoAlpha: 0, y: 50 },
				{
					autoAlpha: 1,
					y: 0,
					duration: 1,
					ease: "power2.out",
					scrollTrigger: {
						trigger: el,
						start: "left center",
						end: "right center",
						toggleActions: "play none none reverse",
						scrub: false
					}
				}
			);
		});
	}, []);

	return (
		<article className="about__content" style={{ overflowX: "auto" }}>
			<div
				ref={containerRef}
				style={{
					display: "flex",
					width: `${slidesData.length * 80}vw`,
					scrollSnapType: "x mandatory",
					scrollBehavior: "smooth"
				}}
			>
				{slidesData.map((slide, i) => (
					<div
						key={i}
						className="about__slide"
						style={{
							width: "80vw",
							flexShrink: 0,
							scrollSnapAlign: "start"
						}}
					>
						<div className="image">
							<img src={slide.image} alt="Наша команда" />
						</div>
						<div className="about__content description-wrapper">
							<p className="about__content description">{slide.text}</p>
							{slide.showButton && (
								<a href="/staff" className="styled-button">
									Записаться
								</a>
							)}
						</div>
					</div>
				))}
			</div>
		</article>
	);
}
