import { Metadata } from 'next'

interface Props {
    params: { iconName: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    return {
        title: `${params.iconName} Icon - Finance Icons Collection`,
        description: `Download and use the ${params.iconName} icon from our finance icons collection. Available in SVG format.`,
        openGraph: {
        title: `${params.iconName} Icon - Finance Icons Collection`,
        description: `Download and use the ${params.iconName} icon from our finance icons collection. Available in SVG format.`,
        images: [`/finance/${params.iconName}.svg`],
        },
    }
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return children
} 