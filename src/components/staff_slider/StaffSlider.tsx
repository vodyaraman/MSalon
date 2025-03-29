import { useEffect, useRef, useState } from "react";
import masters from "../../data/masters.json";
import TemplatePhoto from "@/assets/photos/masters/template.png";
import ArrorIcon from "@/assets/icons/arror-icon.svg";
import "./StaffSlider.scss";
import gsap from "gsap";
import LinkButton from "../buttons/LinkButton";

export default function StaffSlider() {
	const [activeIndex, setActiveIndex] = useState(0);
	const titleRef = useRef<HTMLHeadingElement>(null);
	const descRef = useRef<HTMLParagraphElement>(null);
	const imageRef = useRef<HTMLImageElement>(null);
	const total = masters.length;

	const next = () => setActiveIndex((prev) => (prev + 1) % total);
	const prev = () => setActiveIndex((prev) => (prev - 1 + total) % total);

	useEffect(() => {
		if (titleRef.current) {
			gsap.fromTo(
				titleRef.current,
				{ x: -30, opacity: 0 },
				{ x: 0, opacity: 1, duration: 0.6, ease: "power1.out" }
			);
		}
		if (descRef.current) {
			gsap.fromTo(
				descRef.current,
				{ x: -30, opacity: 0 },
				{ x: 0, opacity: 1, duration: 0.6, delay: 0.1, ease: "power1.out" }
			);
		}
		if (imageRef.current) {
			gsap.fromTo(
				imageRef.current,
				{ x: 30, opacity: 0 },
				{ x: "-5vw", opacity: 1, duration: 0.6, ease: "power1.out" }
			);
		}
	}, [activeIndex]);

	return (
		<figure className="staff__item">
			<figcaption className="info">
				<h3 className="title" ref={titleRef}>
					{masters[activeIndex].name}
				</h3>
				<p className="desc" ref={descRef}>
					{masters[activeIndex].position}
				</p>
			</figcaption>
			<div className="image-overlay">
				<img
					ref={imageRef}
					src={TemplatePhoto.src}
					alt={masters[activeIndex].name}
				/>
			</div>

			<div className="staff__arrow-container">
				<button className="arrow left" onClick={prev} aria-label="Предыдущий слайд">
					<img src={ArrorIcon.src} />
				</button>
				<button className="arrow right" onClick={next} aria-label="Следующий слайд" >
					<img src={ArrorIcon.src} />
				</button>
			</div>
		</figure>
	);
}
