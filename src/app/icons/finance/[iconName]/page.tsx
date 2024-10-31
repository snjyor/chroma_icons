'use client'

import { useParams, useRouter } from 'next/navigation'
import IconDetail from '@/components/IconDetail'

export default function IconPage() {
    const params = useParams()
    const router = useRouter()
    const iconName = params.iconName as string

    return (
        <IconDetail 
        name={iconName}
        category="finance"
        onClose={() => router.back()}
        />
    )
} 