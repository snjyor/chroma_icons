'use client'

import { useParams, useRouter } from 'next/navigation'
import IconDetail from '@/components/IconDetail'

export default function IconPage() {
    const params = useParams()
    const router = useRouter()
    const { category, iconName } = params

    const handleClose = () => {
        router.push(`/icons/${category}`)
    }

    return (
        <IconDetail 
            name={iconName as string}
            category={category as string}
            onClose={handleClose}
        />
    )
} 