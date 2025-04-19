import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect } from 'react';

gsap.registerPlugin(ScrollTrigger);

export default function FooterAnimation() {
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to(".footer", {
                scrollTrigger: {
                    trigger: ".business",
                    start: "top 70%",
                    end: "bottom center",
                },
                opacity: 1,
            });

            return () => {
                ctx.revert();
            };
        });

    }, [])

    return null;
}