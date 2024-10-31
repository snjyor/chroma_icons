'use client'

import { useParams, useRouter } from 'next/navigation'
import IconDetail from '@/components/IconDetail'

export default function IconPage() {
    const params = useParams()
    const router = useRouter()
    const iconName = params.iconName as string
    
    const routeName = "weather"
    
    const handleClose = () => {
        router.push(`/icons/${routeName}`)
    }

    return (
        <IconDetail 
            name={iconName}
            category={routeName}
            onClose={handleClose}
        />
    )
} 