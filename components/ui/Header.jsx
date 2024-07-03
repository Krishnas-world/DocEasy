import Image from 'next/image'
import React from 'react'
import { Button } from './button'
import Link from 'next/link'

function Header() {
    const Menu = [
        {
            id: 1,
            name: "Home",
            path: '/'
        },
        {
            id: 2,
            name: "Explore",
            path: '/explore'
        }, {
            id: 3,
            name: "Contact Us",
            path: '/contact'
        },
    ]

    return (
        <div className='flex items-center justify-between p-2 shadow-sm'>
            <div className='flex items-center gap-10'>
                <Link href={'/'}><Image className='pl-4 scale-125' src='/logo.webp' alt='Logo' width={80} height={80} /></Link>
                 <ul className='md:flex gap-8 hidden'>{/* At this place when md is given with hidden, it makes it hidden(media queries) */}
                    {Menu.map((item, index) => (
                        <Link href={item.path}>
                        <li className='hover:text-blue-600 cursor-pointer transition-all ease-in-out'>{item.name}</li>
                        </Link>
                    ))}
                </ul>
            </div>
                <Button>Get Started</Button>
        </div>
    )
}

export default Header
