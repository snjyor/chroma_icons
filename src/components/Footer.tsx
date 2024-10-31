'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mail, Twitter, Github, AlertCircle } from 'lucide-react';

const Footer = () => {
    const router = useRouter();

    const iconVariants = {
        hover: { scale: 1.1, transition: { duration: 0.2 } }
    };

    const dotAnimation = {
        initial: { scale: 0, opacity: 0 },
        animate: { scale: 1, opacity: 0.8 },
        transition: { 
            delay: 0.1,
            duration: 0.2,
            ease: "easeOut"
        }
    };

    const data = {
        title: 'Chroma Icons',
        description: 'Chroma Icons is a collection of high-quality, customizable icons for your next project. It includes a variety of icons for different categories, including finance, travel, social media, and more.',
        copyright: `© ${new Date().getFullYear()} Chroma Icons. All rights reserved.`,
        termsOfService: '/terms',
        privacyPolicy: '/privacy',
        email: 'remotesum@gmail.com',
        twitter: 'https://x.com/RemotesumTabman',
        github: 'https://github.com/snjyor',
    }

    return (
        <footer className="bg-gray-400 text-black py-12 w-full">
            <div className="container mx-auto px-4">
                <div className='flex flex-col md:flex-row justify-between items-center mb-8'>
                    <motion.h3 
                        className="text-xl font-semibold mb-4 md:mb-0 cursor-pointer text-gray-800"
                        whileHover={{ color: '#0070c9' }}
                        onClick={() => router.push('/')}
                    >
                        {data.title}
                    </motion.h3>
                    <div className='flex space-x-6'>
                        <motion.a href={`mailto:${data.email}`} whileHover="hover" {...dotAnimation}>
                            <Mail className="text-gray-600 hover:text-gray-800 size-5" />
                        </motion.a>
                        <motion.a href={data.twitter} target="_blank" rel="noopener noreferrer" whileHover="hover" {...dotAnimation}>
                            <Twitter className="text-gray-600 hover:text-gray-800 size-5" />
                        </motion.a>
                        <motion.a href={data.github} target="_blank" rel="noopener noreferrer" whileHover="hover" {...dotAnimation}>
                            <Github className="text-gray-600 hover:text-gray-800 size-5" />
                        </motion.a>
                        <motion.div className="relative group" whileHover="hover" {...dotAnimation}>
                            <AlertCircle className="text-gray-600 hover:text-gray-800 size-5 cursor-pointer" onClick={() => window.open('https://github.com/snjyor', '_blank')} />
                            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                Feedback
                            </span>
                        </motion.div>
                    </div>
                </div>
                <div className="border-t border-gray-200 pt-8">
                    <div className='flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8'>
                        <p className="text-sm">{data.copyright}</p>
                        <motion.a href={data.termsOfService} className="text-sm hover:text-gray-800" whileHover={{ color: '#0070c9' }}>Terms of Service</motion.a>
                        <motion.a href={data.privacyPolicy} className="text-sm hover:text-gray-800" whileHover={{ color: '#0070c9' }}>Privacy Policy</motion.a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
