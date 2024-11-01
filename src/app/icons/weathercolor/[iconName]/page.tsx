'use client'

import { useParams, useRouter } from 'next/navigation'
import IconDetail from '@/components/IconDetail'

export default function IconPage() {
    const params = useParams()
    const router = useRouter()
    const iconName = params.iconName as string
    
    const category = "weathercolor"
    
    const handleClose = () => {
        router.push(`/icons/${category}`)
    }

    return (
        <IconDetail 
            name={iconName}
            category={category}
            onClose={handleClose}
        />
    )
} 