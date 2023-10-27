'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { SiDynatrace } from "react-icons/si"
import classNames from 'classnames'
import { useSession } from 'next-auth/react'
import { Avatar, Box, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes'
import { Skeleton } from '@/app/components'
import Image from 'next/image'
import defaultAvatar from '@/public/avatar.webp'

const NavBar = () => {

    return (
        <nav className="border-b mb-5 px-5 h-14 py-4">
            <Container>
                <Flex justify="between">
                    <Flex align="center" gap="3">
                        <Link href="/" className="flex space-x-6 mr-4"><SiDynatrace /></Link>
                        <NavLinks />
                    </Flex>
                    <AuthStatus />
                </Flex>
            </Container>


        </nav>
    )
}

const NavLinks = () => {
    const activePath = usePathname();
    const links = [
        { href: "/", label: "Dashboard" },
        { href: "/issues/list", label: "Issues" }
    ];
    return <ul className='flex space-x-6'>
        {links.map(link =>
            <li key={link.href}>
                <Link key={link.href} href={link.href} className={classNames({
                    'nav-link': true,
                    '!text-zinc-900': activePath === link.href,
                })}>{link.label}</Link>
            </li>
        )}
    </ul>
}

const AuthStatus = () => {
    const { status, data } = useSession();
    const profilePict = data?.user?.image ? data!.user!.image : defaultAvatar.src!;
    if (status === "loading") return <Skeleton width="3rem" height="20px"/>;
    if (status === 'unauthenticated') return <Link className='nav-link' href="/api/auth/signin">Sign In</Link>;
    return (
        <Box>
            <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                    <Avatar src={profilePict} fallback="?" size="2" radius="full" referrerPolicy='no-referrer' />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                    <DropdownMenu.Label>
                        <Text size="2">{data!.user!.email!}</Text>
                    </DropdownMenu.Label>
                    <DropdownMenu.Item>
                        <Link href="/api/auth/signout">Sign Out</Link>
                    </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Root>
        </Box>
    )
}

export default NavBar