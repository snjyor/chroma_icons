'use client'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export interface IconCardProps {
    name: string
    src: string
    category: string
}

export function IconCard({ name, src, category }: IconCardProps) {
    const [copied, setCopied] = useState(false)
    const router = useRouter()
    console.log("jfjf:", category)
    const handleCopy = async (e: React.MouseEvent) => {
        e.stopPropagation()
        try {
            window.focus()
            
            const response = await fetch(`/api/icons/copyicon?icon=${name}&category=${category}`)
            const data = await response.json()
            
            try {
                await navigator.clipboard.writeText(data.svgSource)
                setCopied(true)
            } catch (_) {
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
                } catch (fallbackError) {
                    console.error('Fallback copy failed:', fallbackError)
                } finally {
                    document.body.removeChild(textarea)
                }
            }
            
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error('Failed to copy:', err)
        }
    }

    const handleDownload = (e: React.MouseEvent) => {
        e.stopPropagation() // 防止触发对话框
        const link = document.createElement('a')
        link.href = src
        link.download = `${name}.svg`
        link.click()
    }

    const handleClick = () => {
        router.push(`/icons/${category}/${name}`)
    }

    return (
        <div 
            onClick={handleClick}
            className="group relative flex flex-col items-center justify-start h-44 rounded-2xl transition-all duration-300 py-2 cursor-pointer"
        >
            {/* 图标预览区域 */}
            <div className="relative flex items-center justify-center">
            <Image 
                src={src}
                width={128}
                height={128}
                alt={`${name} icon`}
                className="transition-transform duration-300 group-hover:scale-110"
                priority
            />
            </div>
            
            {/* 悬停时显示的操作按钮 */}
            <div className="absolute bottom-1 flex flex-row items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            <Button 
                className={`w-24 h-7 rounded-full transition-colors duration-200 ${copied ? 'bg-green-500 text-white' : 'bg-white/90 text-gray-600 hover:bg-white/50'}`}
                variant="ghost"
                onClick={handleCopy}
            >
                {copied ? 'Copied' : 'Copy SVG'}
            </Button>
            <Button 
                className="w-24 h-7 rounded-full bg-white/90 text-gray-600 hover:bg-white/50"
                variant="ghost"
                onClick={handleDownload}
            >
                Download
            </Button>
            </div>
        </div>
    )   
}