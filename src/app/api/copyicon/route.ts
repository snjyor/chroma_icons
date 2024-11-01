import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'


export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const icon = searchParams.get('icon')
    if (!icon) {
        return NextResponse.json({ error: 'No icon provided' }, { status: 400 })
    }
    const category = searchParams.get('category')
    if (!category) {
        return NextResponse.json({ error: 'No category provided' }, { status: 400 })
    }
    const publicDir = path.join(process.cwd(), 'public', category)
    const svgSource = await fs.readFile(`${publicDir}/${icon}.svg`, 'utf8')
    return NextResponse.json({ svgSource })
}

