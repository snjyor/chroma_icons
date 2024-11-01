'use client'

import { useState, useEffect } from 'react'
import { IconCard, IconCardProps } from '@/components/IconCard'
import { useParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from "@/lib/utils"
import { FolderOpen } from 'lucide-react'

export default function CategoryPage() {
    const params = useParams()
    const category = params.category as string
    const [icons, setIcons] = useState<IconCardProps[]>([])
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 768)
        }
        
        checkScreenSize()
        window.addEventListener('resize', checkScreenSize)
        return () => window.removeEventListener('resize', checkScreenSize)
    }, [])

    useEffect(() => {
        const fetchIcons = async () => {
            const response = await fetch(`/api/geticons?category=${category}`)
            const data = await response.json()
            setIcons(data.icons)
        }
        fetchIcons()
    }, [category])

    return (
        <div className={cn(
            "space-y-4",
            // 移动端时占满宽度，并调整边距
            "w-full px-4 md:px-6",
            // 调整顶部间距
            "pt-20 md:pt-4"
        )}>
            {/* 图标网格 */}
            <div className={cn(
                "grid gap-3 md:gap-4",
                // 响应式网格布局，移动端时从左侧开始
                "grid-cols-2",              // 移动端2列
                "sm:grid-cols-3",           // 小屏3列
                "md:grid-cols-3",           // 平板3列
                "lg:grid-cols-4",           // 桌面4列
                "xl:grid-cols-5",           // 大屏5列
                // 移动端时取消左侧空间
                "w-full"
            )}>
                <AnimatePresence mode="popLayout">
                    {icons.some(icon => icon.name === 'No icons found') && (
                        <motion.div 
                            className="flex flex-col items-center justify-center py-12"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <div className="text-gray-400 dark:text-gray-600">
                                <FolderOpen className="w-12 h-12" />
                            </div>
                            <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-gray-500 whitespace-nowrap">
                                Icons are coming soon…
                            </h3>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                There are no icons in this category yet.
                            </p>
                        </motion.div>
                    )}
                    {icons.filter(icon => icon.name !== 'No icons found').map((icon, index) => (
                        <motion.div
                                    key={icon.name}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ 
                                        duration: 0.2,
                                        delay: index * 0.05
                                    }}
                                >
                                    <IconCard {...icon} />
                                </motion.div>
                            ))}
                </AnimatePresence>
            </div>
        </div>
    )
} 