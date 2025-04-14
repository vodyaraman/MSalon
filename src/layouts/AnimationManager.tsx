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

// Анимации, которые проигрываются на всех страницах
const globalAnimations: JSX.Element[] = [
  <HeaderAnimation key="global-header" />,
];

const animationsByPath: Record<string, JSX.Element[]> = {
  "/":
    [
      <HeroTextAnimation key="hero" />,
      <ServicesAnimation key="services" />,
      // <TeamLeadAnimation key="team" />,
      <AboutAnimation key="about" />,
      <StaffAnimation key="staff" />,
      <CtaAnimation key="cta" />,
      <GeoAnimation key="geo" />,
      <BusinessAnimation key="business" />,
    ],
  "/staff": [
    <MastersHeroAnimation key="masters" />
  ],
  "/services": [],
};

export default function AnimationManager() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const images = Array.from(document.images);
    const unloaded = images.filter(img => !img.complete);

    if (unloaded.length === 0) {
      setLoaded(true);
    } else {
      let loadedCount = 0;
      unloaded.forEach(img => {
        img.addEventListener("load", check);
        img.addEventListener("error", check);
      });

      function check() {
        loadedCount++;
        if (loadedCount === unloaded.length) {
          setLoaded(true);
        }
      }
    }
  }, []);

  if (!loaded) return null;

  const pathname = window.location.pathname;
  const localAnimations = animationsByPath[pathname] || [];
  const allAnimations = [...globalAnimations, ...localAnimations];

  return <>{allAnimations}</>;
}
