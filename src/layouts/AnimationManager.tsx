import { useEffect, useState, type JSX } from "react";

import HeroTextAnimation from "@/sections/landing/hero/Animation";
import HeaderAnimation from "@/components/header/Animation";
import TeamLeadAnimation from "@/sections/landing/team-lead/Animation";
import ServicesAnimation from "@/sections/landing/services/Animation";
import AboutAnimation from "@/sections/landing/about/Animation";
import StaffAnimation from "@/sections/landing/staff/Animation";
import CtaAnimation from "@/sections/landing/cta/Animation";
import GeoAnimation from "@/sections/landing/geo/Animation";
import BusinessAnimation from "@/sections/landing/business/Animation";
import MastersHeroAnimation from "@/components/staff_slider/Animation";
import HeroTiltScript from "@/sections/landing/hero/ImpovedAnimation";
import HeroNumberSpin from "@/sections/landing/hero/HeroNumberSpin";

const globalAnimations: JSX.Element[] = [
  <HeaderAnimation key="global-header" />,
];

const animationsByPath: Record<string, JSX.Element[]> = {
  "/": [
    <HeroTextAnimation key="hero" />,
    <HeroTiltScript key="hero-improved" />,
    <HeroNumberSpin key="hero-spin" />,
    <ServicesAnimation key="services" />,
    // <TeamLeadAnimation key="team" />,
    <AboutAnimation key="about" />,
    <StaffAnimation key="staff" />,
    <CtaAnimation key="cta" />,
    <GeoAnimation key="geo" />,
    <BusinessAnimation key="business" />,
  ],
  "/staff": [<MastersHeroAnimation key="masters" />],
  "/services": [],
};

export default function AnimationManager() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const images = Array.from(document.images);
    const unloaded = images.filter(img => !img.complete);

    if (unloaded.length === 0) {
      reveal();
    } else {
      let loadedCount = 0;

      const check = () => {
        loadedCount++;
        if (loadedCount === unloaded.length) {
          reveal();
        }
      };

      unloaded.forEach((img) => {
        img.addEventListener("load", check);
        img.addEventListener("error", check);
      });
    }

    function reveal() {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTimeout(() => {
            const pageContent = document.getElementById("page-content");
            const loader = document.getElementById("loading-screen");

            if (pageContent) {
              pageContent.style.display = "block";
            }

            if (loader) {
              loader.style.opacity = "0";
              setTimeout(() => loader.remove(), 400);
            }

            setLoaded(true);
          }, 100); // задержка на стабилизацию layout после загрузки
        });
      });
    }
  }, []);

  if (!loaded) return null;

  const pathname = window.location.pathname;
  const localAnimations = animationsByPath[pathname] || [];
  const allAnimations = [...globalAnimations, ...localAnimations];

  return <>{allAnimations}</>;
}
