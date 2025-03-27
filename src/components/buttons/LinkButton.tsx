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
            gsap.set(textWrapRef.current, { marginLeft: -20, color: '#3d1d1a' })

            buttonRef.current!.addEventListener('mouseenter', () => {
                gsap.to(iconRef.current, { x: 0, autoAlpha: 1, duration: 0.3 })
                gsap.to(bgRef.current, { width: '100%', autoAlpha: 1, duration: 0.4, ease: 'power2.out' })
                gsap.to(textWrapRef.current, {
                    marginLeft: 12,
                    color: '#fff',
                    duration: 0.3,
                    ease: 'none',
                })
            })

            buttonRef.current!.addEventListener('mouseleave', () => {
                gsap.to(iconRef.current, { x: -20, autoAlpha: 0, duration: 0.3 })
                gsap.to(bgRef.current, { width: 0, autoAlpha: 0, duration: 0.4, ease: 'power2.out' })
                gsap.to(textWrapRef.current, {
                    marginLeft: -50,
                    color: '#3d1d1a',
                    duration: 0.3,
                    ease: 'power2.out'
                })
            })
        }, buttonRef)

        return () => ctx.revert()
    })

    return (
        <a className="link-button" ref={buttonRef} href={href}>
            <div className="link-button__icon" ref={iconRef}>
                <img src="/icons/link-icon.svg" alt="link" />
            </div>
            <div className="link-button__text-bg" ref={bgRef}></div>
            <div className="link-button__text">
                <div className="link-button__text-wrap" ref={textWrapRef}>
                    {text}
                </div>
            </div>
        </a>
    )
}

export default LinkButton
