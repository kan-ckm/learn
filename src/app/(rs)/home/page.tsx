'use client'

import { useGSAP } from "@gsap/react"
import gsap from "gsap/all"

export default function Home() {
    useGSAP(() => {
        gsap.fromTo('#home', {
            opacity: 0,

        }, {
            opacity: 1,
            duration: 1,
            ease: 'power1.out'
        })
    }, [])
    return (
        <h2 id="home">Home page</h2>
    )
}