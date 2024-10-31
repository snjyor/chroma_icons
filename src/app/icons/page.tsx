'use client'

import { motion } from 'framer-motion'


export default function Icons() {
    return (
        <div className="relative w-64 h-64 flex items-center justify-center">
        {/* 多层光晕效果 */}
        <div className="absolute bottom-8 w-48 h-4 bg-blue-400/20 rounded-full blur-xl" />
        <div className="absolute bottom-8 w-40 h-3 bg-blue-300/15 rounded-full blur-lg" />
        
        {/* 旋转平台 */}
        <motion.div 
            className="relative"
            animate={{ rotateY: 360 }}
            transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
            }}
        >
            {/* 信用卡主体 */}
            <div className="relative w-48 h-32 rounded-xl bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 shadow-lg transform-gpu perspective-1000 overflow-hidden">
            {/* 背景装饰图案 */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-full h-full opacity-10">
                <div className="absolute top-0 left-0 w-96 h-96 bg-white/20 rounded-full -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-black/10 rounded-full translate-x-1/2 translate-y-1/2" />
                </div>
            </div>

            {/* 全息效果 */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-50" />
            
            {/* 芯片 */}
            <div className="absolute top-6 left-6 w-12 h-9 bg-gradient-to-br from-yellow-300 to-yellow-400 rounded-md shadow-sm">
                <div className="w-full h-full grid grid-cols-3 gap-[1px] p-[2px]">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-yellow-600/30 rounded-[1px]">
                    <div className="w-full h-full bg-gradient-to-br from-yellow-500/20 to-yellow-600/20" />
                    </div>
                ))}
                </div>
                {/* 芯片反光效果 */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent" />
            </div>

            {/* 图表效果 */}
            <div className="absolute bottom-6 right-6 flex items-end space-x-1">
                <div className="w-2 h-4 bg-gradient-to-t from-white/30 to-white/10 rounded-t" />
                <div className="w-2 h-6 bg-gradient-to-t from-white/30 to-white/10 rounded-t" />
                <div className="w-2 h-8 bg-gradient-to-t from-white/30 to-white/10 rounded-t" />
            </div>

            {/* 勾选图标 */}
            <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-gradient-to-br from-blue-300/40 to-blue-400/40 flex items-center justify-center backdrop-blur-sm">
                <div className="w-3 h-3 border-2 border-white/90 transform rotate-45 border-t-0 border-l-0 translate-y-[-2px]" />
            </div>

            {/* 卡号装饰 */}
            <div className="absolute bottom-14 left-6 flex space-x-3">
                {[...Array(4)].map((_, i) => (
                <div key={i} className="w-6 h-1 bg-white/20 rounded-full" />
                ))}
            </div>
            </div>

            {/* 浮动的硬币 */}
            <motion.div
            className="absolute -top-8 right-4"
            animate={{ 
                y: [0, -10, 0],
                rotate: [0, 360]
            }}
            transition={{ 
                y: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
                },
                rotate: {
                duration: 3,
                repeat: Infinity,
                ease: "linear"
                }
            }}
            >
            <div className="relative w-12 h-12">
                {/* 硬币主体 */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-500 shadow-lg flex items-center justify-center">
                <span className="text-white/90 font-bold text-xl">¥</span>
                </div>
                {/* 硬币边缘 */}
                <div className="absolute inset-0 rounded-full border-2 border-yellow-200/30" />
                {/* 硬币反光 */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/40 via-transparent to-transparent" />
            </div>
            </motion.div>

            {/* 上升箭头 */}
            <motion.div
            className="absolute -top-4 right-20"
            animate={{ 
                y: [0, -15, 0],
                opacity: [0.5, 1, 0.5]
            }}
            transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
            }}
            >
            <div className="relative w-8 h-8">
                {/* 主箭头 */}
                <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-6 h-6 border-t-4 border-r-4 border-yellow-400 transform -rotate-45" />
                </div>
                {/* 发光效果 */}
                <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-6 h-6 border-t-4 border-r-4 border-yellow-300/30 transform -rotate-45 blur-[2px]" />
                </div>
            </div>
            </motion.div>

            {/* 装饰性粒子 */}
            {[...Array(3)].map((_, i) => (
            <motion.div
                key={i}
                className="absolute"
                style={{
                top: `${-20 - i * 15}px`,
                left: `${20 + i * 20}px`,
                }}
                animate={{
                y: [0, -10, 0],
                opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                duration: 2,
                delay: i * 0.3,
                repeat: Infinity,
                ease: "easeInOut",
                }}
            >
                <div className="w-2 h-2 rounded-full bg-blue-300/50" />
            </motion.div>
            ))}
        </motion.div>
        </div>
    )
}