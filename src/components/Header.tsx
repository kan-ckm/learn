'use client'
import { HomeIcon, File, UserRound, Ticket } from 'lucide-react';
import Link from 'next/link';
import NavButton from '@/components/NavButton';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap/all';
import { ModeToggle } from '@/components/ModeToggle';

export default function Header() {
    useGSAP(() => {
        gsap.fromTo('#header', {
            opacity: 0,
            x: 100
        }, {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: 'power2.inOut'
        })
    })
    return (
        <header id='header' className=' bg-background h-12 p-2 border-b sticky top-0 z-20'>
            <div className='flex h-8 items-center justify-between w-full'>
                <div className='flex items-center gap-2'>
                    <NavButton href='/home' label='Home' icon={HomeIcon} />
                    <Link href='/home' className='flex justify-center gap-2 items-center ml-0 ' title='Home'>
                        <h1 className='hidden sm:block text-xl font-bold m-0 mt-1'>
                            Computer Repair Shop
                        </h1>
                    </Link>
                </div>
                <div className='flex items-center'>
                    <NavButton href='/tickets' label='Ticket' icon={Ticket} />
                    <NavButton href='/customers' label='Customers' icon={UserRound} />
                    <ModeToggle />
                </div>
            </div>

        </header>
    )
}