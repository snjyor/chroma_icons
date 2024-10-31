'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

interface IconCardProps {
  name: string
  src: string
  svgSource: string
}

function IconCard({ name, src, svgSource }: IconCardProps) {
  const [copied, setCopied] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation()
    try {
        // 确保文档获得焦点
        window.focus()
        
        const response = await fetch(`/api/icons/copyicon?icon=${name}&category=finance`)
        const data = await response.json()
        
        // 方案1：使用 navigator.clipboard API 并处理错误
        try {
            await navigator.clipboard.writeText(data.svgSource)
            setCopied(true)
        } catch (clipboardError) {
            // 如果 clipboard API 失败，回退到传统方法
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
        
        // 设置复制状态
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

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="group relative flex flex-col items-center justify-start h-44 rounded-2xl transition-all duration-300 py-2 cursor-pointer">
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
            {/* 复制按钮 */}
            <Button 
              className={`
                w-24 h-7 rounded-full transition-all duration-200 text-xs font-medium shadow-sm
                ${copied 
                  ? 'bg-green-500 text-white hover:bg-green-600' 
                  : 'bg-white/90 text-gray-600 hover:bg-white dark:bg-gray-800/90 dark:text-gray-200 dark:hover:bg-gray-800'
                }
              `}
              variant="ghost"
              onClick={handleCopy}
              onFocus={() => window.focus()}
            >
              {copied ? 'Copied' : 'Copy SVG'}
            </Button>

            {/* 下载按钮 */}
            <Button 
              className="w-24 h-7 rounded-full bg-white/90 text-gray-600 hover:bg-white dark:bg-gray-800/90 dark:text-gray-200 dark:hover:bg-gray-800 transition-all duration-200 text-xs font-medium shadow-sm"
              variant="ghost"
              onClick={handleDownload}
            >
              Download
            </Button>
          </div>
        </div>
      </DialogTrigger>

      <DialogContent className="max-w-2xl p-0 overflow-hidden backdrop-blur-xl">
        <div className="relative flex flex-col items-center justify-center p-8">
          {/* 预览图标 */}
          <div className="relative w-64 h-64 flex items-center justify-center mb-6">
            <Image 
              src={src}
              width={400}
              height={400}
              alt={`${name} icon preview`}
              className="transition-transform duration-300"
              priority
            />
          </div>

          {/* 图标信息和操作按钮 */}
          <div className="flex flex-col items-center gap-4">
            <div className="flex gap-3">
              <Button
                className={`
                  w-32 h-9 rounded-full transition-all duration-200 text-sm font-medium
                  ${copied 
                    ? 'bg-green-500 text-white hover:bg-green-600' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-800 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-100'
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
      </DialogContent>
    </Dialog>
  )
}

export default function Finance() {
  const [icons, setIcons] = useState<IconCardProps[]>([])

  useEffect(() => {
    const fetchIcons = async () => {
      const response = await fetch('/api/icons?category=finance')
      const data = await response.json()
      setIcons(data.icons)
    }
    fetchIcons()
  }, [])

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {icons.map((icon) => (
          <IconCard key={icon.name} {...icon} />
        ))}
      </div>
    </div>
  )
} 