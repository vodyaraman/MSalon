import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import servicesData from "@/data/services.json";
import Icon1 from "@/assets/icons/services/icon1.svg";
import Icon2 from "@/assets/icons/services/icon2.svg";
import Icon3 from "@/assets/icons/services/icon3.svg";
import Icon4 from "@/assets/icons/services/icon4.svg";
import Icon5 from "@/assets/icons/services/icon5.svg";
import "./ServicesSlider.scss";
import LinkButton from "../buttons/LinkButton";

const icons = [Icon1.src, Icon2.src, Icon3.src, Icon4.src, Icon5.src];

export default function ServicesSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const detailRef = useRef(null);

  useEffect(() => {
    if (detailRef.current) {
      gsap.fromTo(
        detailRef.current,
        { autoAlpha: 0, y: 20 },
        { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [activeIndex]);

  const services = servicesData;

  return (
    <>
      <>
        {services.map((service, index) => (
          <div
            key={service.slug}
            className={`services__content__item ${index === activeIndex ? "active" : ""}`}
            onClick={() => setActiveIndex(index)}
          >
            <span>{service.category}</span>
          </div>
        ))}
      </>

      <div className="services__details" ref={detailRef}>
        <div className="services__details__image">
          <img
            src="/assets/about-action.png"
            alt={services[activeIndex].category}
          />
        </div>
        <div className="services__details__info">
          <h3 className="services__details title">
            {services[activeIndex].category}
          </h3>
          <p className="services__details description">
            {services[activeIndex].description}
          </p>
          <LinkButton text="подробнее" href={`/services/${services[activeIndex].slug}`}/>
        </div>
      </div>
    </>
  );
}
