'use client'
import { useGSAP } from "@gsap/react"
import gsap from "gsap/all"

export default function CustomerContent() {
    useGSAP(() => {
        gsap.fromTo('#customers', {
            opacity: 0,

        }, {
            opacity: 1,
            duration: 1,
            ease: 'power1.out'
        })
    }, [])
    return (
        <h2 id="customers">Customer page</h2>
    )
}