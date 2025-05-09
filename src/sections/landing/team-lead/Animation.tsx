import { useEffect} from "react";
import gsap from "gsap";
export default function TeamLeadAnimation() {

  const scrollerElement = document.querySelector(".team-lead__scroller");
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(
        scrollerElement,
        {
          xPercent: -64,
          ease: "none",
          scrollTrigger: {
            trigger: '.team-lead',
            start: 'top top',
            end: () => {
              const videoElem = document.querySelector('.team-lead__right') as HTMLElement;

              const videoPosition = videoElem.offsetLeft;
              const videoWidth = videoElem.offsetWidth;
              const endPosition = videoPosition + videoWidth - window.innerWidth;

              return `+=${endPosition}`;
            },
            scrub: 1,
            pin: true,
          },
        })
    });

    return () => ctx.revert();
  }, [])

  return null;
}
