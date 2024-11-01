'use client'

import { useState, useEffect } from 'react'
import { IconCard, IconCardProps } from '@/components/IconCard'


export default function Finance() {
  const [icons, setIcons] = useState<IconCardProps[]>([])

  useEffect(() => {
    const fetchIcons = async () => {
      const response = await fetch('/api/geticons?category=finance')
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