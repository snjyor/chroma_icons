'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence, Variants, Transition } from 'framer-motion'

interface IconDetailProps {
    name: string
    category: string
    onClose: () => void
}

// 定义过渡动画配置
const springTransition: Transition = {
    type: "spring",
    damping: 30,
    stiffness: 300
}

// 定义动画变体
const modalVariants: Variants = {
    hidden: { 
        y: 20, 
        opacity: 0, 
        scale: 0.98 
    },
    visible: { 
        y: 0, 
        opacity: 1, 
        scale: 1
    },
    exit: { 
        y: 20, 
        opacity: 0, 
        scale: 0.98 
    }
}

export default function IconDetail({ name, category, onClose }: IconDetailProps) {
    const [copied, setCopied] = useState(false)
    const [iconSrc, setIconSrc] = useState('')
    const router = useRouter()

    useEffect(() => {
        setIconSrc(`/${category}/${name}.svg`)
    }, [category, name])

    const handleCopy = async () => {
        try {
        const response = await fetch(`/api/copyicon?icon=${name}&category=${category}`)
        const data = await response.json()
        
        try {
            await navigator.clipboard.writeText(data.svgSource)
            setCopied(true)
        } catch (_) {
            // 回退复制方案
            const textarea = document.createElement('textarea')
            textarea.value = data.svgSource
            textarea.style.position = 'fixed'
            textarea.style.opacity = '0'
            document.body.appendChild(textarea)
            textarea.focus()
            textarea.select()
            
            try {
            document.execCommand('copy')
            setCopied(true)
            } finally {
            document.body.removeChild(textarea)
            }
        }
        
        setTimeout(() => setCopied(false), 2000)
        } catch (err) {
        console.error('Failed to copy:', err)
        }
    }

    const handleDownload = () => {
        const link = document.createElement('a')
        link.href = iconSrc
        link.download = `${name}.svg`
        link.click()
    }

    return (
        <AnimatePresence>
            <motion.div 
                className="fixed inset-0 flex items-center justify-center z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                {/* 背景遮罩 */}
                <motion.div 
                    className="absolute inset-0 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                />

                {/* 主容器 */}
                <motion.div 
                    className="
                        bg-white/80 dark:bg-gray-800/80 
                        backdrop-blur-xl
                        rounded-2xl max-w-2xl w-full mx-4 relative
                        border border-white/20 dark:border-white/10
                        shadow-lg shadow-black/5 dark:shadow-white/5
                    "
                    variants={modalVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={springTransition}
                >
                    <div className="relative flex flex-col items-center justify-center p-8">
                        {/* 关闭按钮 */}
                        <motion.button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className="sr-only">Close</span>
                            <motion.span
                                initial={{ rotate: 0 }}
                                whileHover={{ rotate: 90 }}
                                transition={{ duration: 0.2 }}
                            >
                                ✕
                            </motion.span>
                        </motion.button>

                        {/* 图标预览 */}
                        <motion.div 
                            className="relative w-64 h-64 flex items-center justify-center mb-6"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                        >
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 400 }}
                            >
                                <Image 
                                    src={iconSrc}
                                    width={400}
                                    height={400}
                                    alt={`${name} icon preview`}
                                    priority
                                />
                            </motion.div>
                        </motion.div>

                        {/* 按钮组 */}
                        <motion.div 
                            className="flex flex-col items-center gap-4"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="flex gap-3">
                                <motion.div 
                                    whileHover={{ scale: 1.05 }} 
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Button
                                        className={`
                                            w-32 h-9 rounded-full transition-colors duration-200 text-sm font-medium
                                            ${copied 
                                                ? 'bg-green-500 text-white hover:bg-green-600' 
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-800'
                                            }
                                        `}
                                        onClick={handleCopy}
                                    >
                                        <AnimatePresence mode="wait">
                                            <motion.span
                                                key={copied ? 'copied' : 'copy'}
                                                initial={{ y: 10, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                exit={{ y: -10, opacity: 0 }}
                                                transition={{ duration: 0.15 }}
                                            >
                                                {copied ? 'Copied!' : 'Copy SVG'}
                                            </motion.span>
                                        </AnimatePresence>
                                    </Button>
                                </motion.div>

                                <motion.div 
                                    whileHover={{ scale: 1.05 }} 
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Button
                                        className="w-32 h-9 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200 text-sm font-medium"
                                        onClick={handleDownload}
                                    >
                                        Download
                                    </Button>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
} 