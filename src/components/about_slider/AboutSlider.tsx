// AboutSlides.tsx
import { useEffect, useRef, useState } from "react";
import slidesData from "./about-slides.json";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSlides() {
	const wrapperRef = useRef<HTMLElement>(null);
	const [currentIndex, setCurrentIndex] = useState(0);
	const lastSlideIndex = slidesData.length - 1;

	useEffect(() => {
		const wrapperEl = wrapperRef.current;
		const section = document.querySelector(".about") as HTMLElement;
		const lenis = window.lenis;
		if (!wrapperEl || !section || !lenis) return;

		const slides = wrapperEl.querySelectorAll(".about__slide");
		slides.forEach((slide, index) => {
			gsap.set(slide, {
				autoAlpha: index === 0 ? 1 : 0,
				x: 0,
				zIndex: index === 0 ? 2 : 1,
			});
		});


		const scrollStep = 500;
		const totalScroll = scrollStep * slidesData.length;
		let scrollStart = 0;
		let scrollEnd = 0;

		// Pin секции
		const trigger = ScrollTrigger.create({
			trigger: section,
			start: "top 60px",
			end: `+=${totalScroll}`,
			pin: true,
			pinSpacing: true,
			pinType: "fixed",
			onUpdate: self => {
				scrollStart = self.start;
				scrollEnd = self.end;
			},
		});

		let lastSlide = 0;

		const onScroll = () => {
			const scrollY = lenis.scroll;
			if (scrollY < scrollStart || scrollY > scrollEnd) return;

			const relativeScroll = scrollY - scrollStart;
			const newSlideIndex = Math.min(
				lastSlideIndex,
				Math.floor(relativeScroll / scrollStep)
			);

			if (newSlideIndex !== lastSlide) {
				animateSlideChange(lastSlide, newSlideIndex);
				lastSlide = newSlideIndex;
				setCurrentIndex(newSlideIndex);
			}
		};

		const animateSlideChange = (from: number, to: number) => {
			const slides = wrapperRef.current?.querySelectorAll(".about__slide");
			if (!slides) return;

			const prev = slides[from] as HTMLElement;
			const next = slides[to] as HTMLElement;

			const direction = to > from ? 1 : -1;
			const offset = 5000 * direction;

			// Появление next — за кадром
			gsap.set(next, {
				autoAlpha: 0,
				opacity: 0,
				x: offset,
				zIndex: 2,
				pointerEvents: "none",
			});

			// prev — на переднем плане, чтобы успел уйти
			gsap.set(prev, { zIndex: 3 });

			// Анимация
			const tl = gsap.timeline({
				onComplete: () => {
					setCurrentIndex(to);
				},
			});

			tl.to(prev, {
				autoAlpha: 0,
				scale: 0.5,
				x: -offset,
				duration: 0.25,
			})
				.to(next, {
					autoAlpha: 1,
					scale: 1,
					x: 0,
					duration: 0.25,
					pointerEvents: "auto",
				}, 0);
		};

		lenis.on("scroll", onScroll);
		return () => {
			lenis.off("scroll", onScroll);
			trigger.kill();
		};
	}, []);

	return (
		<>
			<article
				className="about__content"
				ref={wrapperRef}
			>
				{slidesData.map((slide, index) => (
					<div
						className="about__slide"
						key={index}
						style={{
							position: "absolute",
							inset: 0,
							pointerEvents: index === currentIndex ? "auto" : "none",
						}}
					>
						<div className="image">
							<img src={slide.image} alt="" />
						</div>
						<div className="about__content description-wrapper">
							<p className="about__content description">{slide.text}</p>
							{slide.showButton && (
								<a href="/staff" className="styled-button">Записаться</a>
							)}
						</div>
					</div>
				))}
			</article>
			<div className="about__dots">
				{slidesData.map((_, index) => (
					<span
						key={index}
						className={index === currentIndex ? "active" : ""}
					/>
				))}
			</div>
		</>
	);
}
