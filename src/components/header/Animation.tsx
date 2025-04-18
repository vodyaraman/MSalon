import { useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function HeaderAnimation() {
    useEffect(() => {
        if (typeof window === "undefined") return

        const header = document.querySelector('.header')
        const logo = document.querySelector('.header__logo.text')
        const nav = document.querySelector('.header__nav-list')

        if (!header || !logo || !nav) return

        const applyDark = () => {
            gsap.to(header, { backgroundColor: "#00000000" })
        }

        const applyLight = () => {
            gsap.to(header, { backgroundColor: "#211311"})
        }

        ScrollTrigger.create({
            start: 400,
            end: 401,
            onEnter: applyLight,
            onEnterBack: applyDark,
        })

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill())
        }
    }, [])

    return null
}
