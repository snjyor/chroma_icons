'use client'

import { motion } from 'framer-motion'
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface Category {
    id: string
    name: string
}

const categories: Category[] = [
    { id: "finance", name: "Finance" },
    { id: "weathercolor", name: "Weather Color" },
    { id: "weather", name: "Weather" },
    { id: "emoji", name: "Emoji" },
    { id: "social", name: "Social" }
]

export function SidebarNav() {
    const pathname = usePathname()

    return (
        <nav className="w-48 py-1">
            <div className="space-y-0.5">
                {categories.map((category) => {
                    const isActive = pathname === `/icons/${category.id}` || pathname.startsWith(`/icons/${category.id}/`)
                    
                    return (
                        <div key={category.id} className="relative">
                            {isActive && (
                                <motion.div
                                    layoutId="activeIndicator"
                                    className="absolute inset-0 bg-gradient-to-r from-blue-50 to-blue-50/50 dark:from-blue-900/20 dark:to-blue-900/10 rounded-lg"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.2 }}
                                />
                            )}
                            
                            <Link
                                href={`/icons/${category.id}`}
                                className={cn(
                                    "relative block px-4 py-1 rounded-lg transition-all duration-200",
                                    "hover:bg-gray-50 dark:hover:bg-gray-800/50",
                                    isActive 
                                        ? "text-blue-600 dark:text-blue-400" 
                                        : "text-gray-500 dark:text-gray-400"
                                )}
                            >
                                <motion.div
                                    className="relative z-10 flex items-center"
                                    whileHover={{ x: 4 }}
                                    transition={{ 
                                        type: "spring", 
                                        stiffness: 400, 
                                        damping: 20 
                                    }}
                                >
                                    <span className={cn(
                                        "text-base tracking-wide transition-colors duration-200",
                                        isActive 
                                            ? "font-semibold text-blue-600 dark:text-blue-400" 
                                            : "font-medium text-gray-600 dark:text-gray-500 hover:text-gray-900 dark:hover:text-gray-100"
                                    )}>
                                        {category.name}
                                    </span>

                                    {isActive && (
                                        <motion.span
                                            className="ml-2 w-1 h-1 rounded-full bg-blue-500 dark:bg-blue-400"
                                            initial={{ scale: 0, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 0.8 }}
                                            transition={{ 
                                                delay: 0.1,
                                                duration: 0.2,
                                                ease: "easeOut"
                                            }}
                                        />
                                    )}
                                </motion.div>
                            </Link>
                        </div>
                    )
                })}
            </div>
        </nav>
    )
}