import { Metadata } from 'next'

interface Props {
    params: { category:string, iconName: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const category = params.category
    return {
        title: `${params.iconName} Icon - ${category} Icons Collection`,
        description: `Download and use the ${params.iconName} icon from our ${category} icons collection. Available in SVG format.`,
        openGraph: {
        title: `${params.iconName} Icon - ${category} Icons Collection`,
        description: `Download and use the ${params.iconName} icon from our ${category} icons collection. Available in SVG format.`,
        images: [`/${category}/${params.iconName}.svg`],
        },
    }
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return children
} 