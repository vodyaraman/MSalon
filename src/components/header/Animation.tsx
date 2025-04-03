import { useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function Animation() {
    useEffect(() => {
        if (typeof window === "undefined" || !window.lenis) return

        const header = document.querySelector('.header')
        const logo = document.querySelector('.header__logo.text')
        const nav = document.querySelector('.header__nav-list')

        if (!header || !logo || !nav) return

        const applyDark = () => {
            gsap.to(header, { backgroundColor: "transparent", backdropFilter: "blur(3px)", duration: 0.3 })
            gsap.to(logo, { color: "#211311", duration: 0.3 })
            gsap.to(nav, { filter: "invert(1)", duration: 0.3 })
        }

        applyDark();

        const applyLight = () => {
            gsap.to(header, { backgroundColor: "#211311", backdropFilter: "blur(0px)", duration: 0.3 })
            gsap.to(logo, { color: "#fff", duration: 0.3 })
            gsap.to(nav, { filter: "invert(0)", duration: 0.3 })
        }

        ScrollTrigger.create({
            start: 800,
            end: 801,
            onEnter: applyLight,
            onEnterBack: applyDark,
        })

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill())
        }
    }, [])

    return null
}
