'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface IconDetailProps {
    name: string
    category: string
    onClose: () => void
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
        const response = await fetch(`/api/icons/copyicon?icon=${name}&category=${category}`)
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
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full mx-4">
                <div className="relative flex flex-col items-center justify-center p-8">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                    <span className="sr-only">Close</span>
                    ✕
                </button>

                <div className="relative w-64 h-64 flex items-center justify-center mb-6">
                    <Image 
                    src={iconSrc}
                    width={400}
                    height={400}
                    alt={`${name} icon preview`}
                    className="transition-transform duration-300"
                    priority
                    />
                </div>

                <div className="flex flex-col items-center gap-4">
                    <div className="flex gap-3">
                    <Button
                        className={`
                        w-32 h-9 rounded-full transition-all duration-200 text-sm font-medium
                        ${copied 
                            ? 'bg-green-500 text-white hover:bg-green-600' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-800'
                        }
                        `}
                        onClick={handleCopy}
                    >
                        {copied ? 'Copied!' : 'Copy SVG'}
                    </Button>
                    <Button
                        className="w-32 h-9 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-all duration-200 text-sm font-medium"
                        onClick={handleDownload}
                    >
                        Download
                    </Button>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
} 