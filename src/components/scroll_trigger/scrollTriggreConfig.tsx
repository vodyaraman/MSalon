import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ScrollTrigger Proxy setup
ScrollTrigger.scrollerProxy = (scroller: HTMLElement, config?: any) => {
    return {
        scrollTop(value: number) {
            if (arguments.length && window.lenis) {
                window.lenis.scrollTo(value, { immediate: true });
            }
            return window.lenis ? window.lenis.scroll : 0;
        },
        scrollLeft(value: number) {
            if (arguments.length && window.lenis) {
                window.lenis.scrollTo(value, { immediate: true });
            }
            return window.lenis ? window.lenis.scroll : 0;
        },
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
    };
};

ScrollTrigger.defaults({ scroller: "body" });

// Добавляем проверку, чтобы избежать ошибок при SSR
if (typeof window !== 'undefined') {
    ScrollTrigger.addEventListener("refresh", () => window.lenis?.refresh());
}

// Функция для создания ScrollTrigger
interface ScrollTriggerConfig {
    trigger: string | HTMLElement;
    start?: string;
    end?: string;
    scrub?: boolean | number;
    markers?: boolean;
    invalidateOnRefresh?: boolean;
    [key: string]: any; // Позволяет передавать любые дополнительные опции ScrollTrigger
}

export function createScrollTrigger(
    triggerElement: string | HTMLElement,
    config: ScrollTriggerConfig,
) {
    return ScrollTrigger.create({
        scroller: "main",
        ...config,
    });
}