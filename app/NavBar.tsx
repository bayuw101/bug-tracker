'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { SiDynatrace } from "react-icons/si" 
import classNames from 'classnames'

const NavBar = () => {
    const links = [
        {href: "/", label: "Dashboard"},
        {href: "/issues", label: "Issues"}
    ];
    const activePath = usePathname()

    return (
        <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
            <Link href="/" className="flex space-x-6"><SiDynatrace /></Link>
            <ul className='flex space-x-6'>
                {links.map(link => 
                    <Link key={link.href} href={link.href} className={classNames({
                        'text-zinc-900': activePath === link.href,
                        'text-zinc-500': activePath !== link.href,
                        'flex space-x-6 hover:text-zinc-800 transition-color':true
                    })}>{link.label}</Link>
                )}
            </ul>

        </nav>
    )
}

export default NavBar