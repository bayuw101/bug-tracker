import Link from 'next/link'
import React from 'react'
import { SiDynatrace } from "react-icons/si" 

const NavBar = () => {
    const links = [
        {href: "/", label: "Dashboard"},
        {href: "/issues", label: "Issues"}
    ];

  return (
    <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
        <Link href="/" className="flex space-x-6"><SiDynatrace /></Link>
        <ul className='flex space-x-6'>
            {links.map(link => <Link key={link.key} href={link.href} className="flex space-x-6 text-zinc-500 hover:text-zinc-800 transition-color">{link.label}</Link>)}
        </ul>

    </nav>
  )
}

export default NavBar