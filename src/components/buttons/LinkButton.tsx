import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import './LinkButton.scss'

type LinkButtonProps = {
    text: string
    href: string
}

const LinkButton = ({ text, href }: LinkButtonProps) => {
    const buttonRef = useRef<HTMLAnchorElement>(null)
    const iconRef = useRef<HTMLDivElement>(null)
    const textWrapRef = useRef<HTMLDivElement>(null)
    const bgRef = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        if (!buttonRef.current) return

        const ctx = gsap.context(() => {
            gsap.set(iconRef.current, { x: -50, autoAlpha: 0 })
            gsap.set(bgRef.current, { width: 0, autoAlpha: 0 })
            gsap.set(textWrapRef.current, { marginLeft: -50, color: '#000' })
        })

        return () => ctx.revert()
    })

    const handleEnter = () => {
        gsap.killTweensOf([iconRef.current, bgRef.current, textWrapRef.current])

        gsap.to(textWrapRef.current, {
            marginLeft: 12,
            color: '#fff',
            duration: 0.25,
            ease: 'none',
        })
        gsap.to(iconRef.current, { x: 0, autoAlpha: 1, duration: 0.4 })
        gsap.to(bgRef.current, {
            width: '100%',
            autoAlpha: 1,
            duration: 0.4,
            delay: 0.1,
            ease: 'power2.out',
        })
    }

    const handleLeave = () => {
        gsap.killTweensOf([iconRef.current, bgRef.current, textWrapRef.current])

        gsap.to(iconRef.current, { x: -20, autoAlpha: 0, duration: 0.3 })
        gsap.to(bgRef.current, { width: 0, autoAlpha: 0, duration: 0.4, ease: 'power2.out' })
        gsap.to(textWrapRef.current, {
            marginLeft: -50,
            color: '#000',
            duration: 0.3,
            ease: 'power2.out',
        })
    }

    return (
        <a
            className="link-button"
            ref={buttonRef}
            href={href}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
        >
            <div className="link-button__icon" ref={iconRef}>
                <img src="/icons/link-icon.svg" alt="link" />
            </div>
            <div className="link-button__text-bg" ref={bgRef}></div>
            <div className="link-button__text" ref={textWrapRef}>
                {text}
            </div>
        </a>
    )
}

export default LinkButton
