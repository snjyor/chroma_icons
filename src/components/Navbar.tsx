'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
// import UserAuth from './UserAuth';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';


const Navbar = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setIsVisible(currentScrollY < lastScrollY || currentScrollY < 50);
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    const navItems = [
        { href: '/icons', label: '3D Icons' },
        { href: '/2d-icons', label: '2D Icons' },
        { href: '/blog', label: 'Blog'}
    ];

    return (
        <Disclosure as="nav" className="fixed top-0 left-0 right-0 z-50">
            {({ open }) => (
                <motion.nav
                className={`fixed top-0 left-0 right-0 z-50 bg-opacity-80 backdrop-filter backdrop-blur-lg transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}
                initial={{ y: 0 }}
                animate={{ y: isVisible ? 0 : '-100%' }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center h-16">
                            <div className="flex items-center flex-shrink-0 mr-12">
                                <Logo />
                                <Link href="/" className="text-gray-600 font-semibold text-xl tracking-tight hover:text-gray-900 transition-colors duration-200 ml-3">
                                    Chroma Icons
                                </Link>
                            </div>
                            <div className="hidden md:flex items-center space-x-1">
                                {navItems.map((item) => (
                                    <NavItem key={item.href} href={item.href} isActive={pathname === item.href}>
                                        {item.label}
                                    </NavItem>
                                ))}
                            </div>
                            <div className="flex-grow" />
                            <div className="hidden md:block">
                                {/* <UserAuth /> */}
                            </div>
                            <div className="flex md:hidden">
                                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {navItems.map((item) => (
                                <Disclosure.Button
                                    key={item.href}
                                    as="a"
                                    href={item.href}
                                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                                        pathname === item.href ? 'text-gray-900 bg-gray-200' : 'text-gray-600 hover:bg-gray-700 hover:text-gray-900'
                                    }`}
                                >
                                    {item.label}
                                </Disclosure.Button>
                            ))}
                        </div>
                        {/* <div className="pt-4 pb-3 border-t border-gray-700">
                            <div className="px-2">
                                <UserAuth />
                            </div>
                        </div> */}
                    </Disclosure.Panel>
                </motion.nav>
            )}
        </Disclosure>
    );
};

const NavItem = ({ href, children, isActive }: { href: string; children: React.ReactNode; isActive: boolean }) => (
    <Link href={href} passHref legacyBehavior>
        <motion.span
            className={`relative px-4 py-1 text-base font-medium rounded-lg transition-all duration-200  cursor-pointer ${
                isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 hover:text-gray-900'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            {children}
            {isActive && (
                <motion.div
                    className="absolute bottom-0 left-1/2 w-1 h-1 bg-blue-500 rounded-full"
                    layoutId="activeIndicator"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
            )}
        </motion.span>
    </Link>
);

const Logo = () => {
    return (
        <div className="relative w-7 h-7 overflow-hidden rounded-lg">
            <Image
                src="/logo.jpg"
                alt="Chroma Icons Logo"
                width={30}
                height={30}
                className="object-cover"
                style={{
                    maxWidth: '100%',
                    height: 'auto',
                }}
                priority
            />
        </div>
    );
}


export default Navbar;
