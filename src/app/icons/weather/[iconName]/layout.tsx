import { Metadata } from 'next'

interface Props {
    params: { iconName: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const routeName = "Weather"
    return {
        title: `${params.iconName} Icon - ${routeName} Icons Collection`,
        description: `Download and use the ${params.iconName} icon from our ${routeName} icons collection. Available in SVG format.`,
        openGraph: {
        title: `${params.iconName} Icon - ${routeName} Icons Collection`,
        description: `Download and use the ${params.iconName} icon from our ${routeName} icons collection. Available in SVG format.`,
        images: [`/${routeName.toLowerCase()}/${params.iconName}.svg`],
        },
    }
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return children
} 