'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

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
    const [isOpen, setIsOpen] = useState(false)
    const [isMobile, setIsMobile] = useState(false)

    // 检测屏幕尺寸
    useEffect(() => {
        const checkScreenSize = () => {
            const isMobileView = window.innerWidth < 768
            setIsMobile(isMobileView)
            // 在切换到大屏幕时自动展开侧边栏
            if (!isMobileView) {
                setIsOpen(false)
            }
        }
        
        checkScreenSize()
        window.addEventListener('resize', checkScreenSize)
        return () => window.removeEventListener('resize', checkScreenSize)
    }, [])

    // 渲染桌面端侧边栏
    const renderDesktopSidebar = () => (
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

    // 渲染移动端侧边栏
    const renderMobileSidebar = () => (
        <>
            {/* 移动端菜单按钮 - 使用固定定位 */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "fixed top-20 left-4 z-50 md:hidden",
                    "p-2.5 rounded-full",
                    "bg-white/80 dark:bg-gray-800/80",
                    "backdrop-blur-md",
                    "shadow-lg shadow-black/5 dark:shadow-white/5",
                    "border border-gray-200/50 dark:border-gray-700/50",
                    "transition-all duration-200",
                    isOpen && "bg-opacity-100 dark:bg-opacity-100"
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <motion.div
                    initial={false}
                    animate={{ rotate: isOpen ? 90 : 0 }}
                >
                    {isOpen ? (
                        <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                    ) : (
                        <Menu className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                    )}
                </motion.div>
            </motion.button>

            {/* 移动端菜单面板 */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* 背景遮罩 */}
                        <motion.div
                            className="fixed inset-0 bg-black/10 backdrop-blur-sm z-40"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                        />
                        
                        {/* 菜单面板 */}
                        <motion.div
                            className={cn(
                                "fixed left-4 top-32 z-50",
                                "w-64 rounded-2xl",
                                "bg-white/90 dark:bg-gray-800/90",
                                "backdrop-blur-xl",
                                "shadow-2xl shadow-black/5 dark:shadow-white/5",
                                "border border-white/20 dark:border-white/10",
                                "overflow-hidden"
                            )}
                            initial={{ opacity: 0, y: -20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.95 }}
                            transition={{ 
                                type: "spring", 
                                damping: 25, 
                                stiffness: 200 
                            }}
                        >
                            
                            {/* 菜单选项 */}
                            <div className="py-2">
                                {categories.map((category) => {
                                    const isActive = pathname === `/icons/${category.id}` || pathname.startsWith(`/icons/${category.id}/`)
                                    
                                    return (
                                        <motion.div
                                            key={category.id}
                                            whileHover={{ x: 4 }}
                                            transition={{ type: "spring", stiffness: 400, damping: 20 }}
                                        >
                                            <Link
                                                href={`/icons/${category.id}`}
                                                onClick={() => setIsOpen(false)}
                                                className={cn(
                                                    "flex items-center px-4 py-2.5",
                                                    "transition-colors duration-200",
                                                    isActive
                                                        ? "bg-blue-50/50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                                                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-50/50 dark:hover:bg-gray-700/30"
                                                )}
                                            >
                                                <span className="text-sm font-medium">
                                                    {category.name}
                                                </span>
                                                {isActive && (
                                                    <motion.span
                                                        className="ml-2 w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-blue-400"
                                                        layoutId="mobileActiveIndicator"
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        transition={{ duration: 0.2 }}
                                                    />
                                                )}
                                            </Link>
                                        </motion.div>
                                    )
                                })}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    )

    return (
        <>
            {isMobile ? renderMobileSidebar() : renderDesktopSidebar()}
        </>
    )
}