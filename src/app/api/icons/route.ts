import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')

    if (!category) {
        return NextResponse.json({ error: 'No category provided' }, { status: 400 })
    }

    try {
        const publicDir = path.join(process.cwd(), 'public', category)
        const files = await fs.readdir(publicDir)
        
        const icons = files
        .filter(file => file.endsWith('.svg'))
        .sort((a, b) => {
            const numA = parseInt(a.replace(/\D/g, ''))
            const numB = parseInt(b.replace(/\D/g, ''))
            return numA - numB
        })
        .map(file => ({
            name: file.replace('.svg', ''),
            src: `/${category}/${file}`
        }))

        return NextResponse.json({ icons })
    } catch (error) {
        return NextResponse.json({ error: `Failed to read directory, ${error}` }, { status: 500 })
    }
}
