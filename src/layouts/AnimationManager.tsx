import type { JSX } from "react";

import HeroTextAnimation from "@/sections/landing/hero/Animation";
import HeaderAnimation from "@/components/header/Animation";
import ServicesAnimation from "@/sections/landing/services/Animation";
import AboutAnimation from "@/sections/landing/about/Animation";
import StaffAnimation from "@/sections/landing/staff/Animation";
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
    <AboutAnimation key="about" />,
    <StaffAnimation key="staff" />,
    <GeoAnimation key="geo" />,
    <BusinessAnimation key="business" />,
  ],
  "/staff": [
    <MastersHeroAnimation key="masters"/>
  ],
  "/services": [],
};

export default function AnimationManager() {
  const pathname = window.location.pathname;

  const localAnimations = animationsByPath[pathname] || [];
  const allAnimations = [...globalAnimations, ...localAnimations];

  return <>{allAnimations}</>;
}
