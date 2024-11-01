import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

export const dynamic = 'force-dynamic' // 强制动态渲染
export const runtime = 'nodejs' // 指定 Node.js 运行时

export async function GET(request: Request) {
    try {
        // 获取查询参数
        const { searchParams } = new URL(request.url)
        const category = searchParams.get('category')

        if (!category) {
            return NextResponse.json({ error: 'No category provided' }, { status: 400 })
        }

        const directoryPath = path.join(process.cwd(), 'public', category)

        try {
            const files = await fs.readdir(directoryPath)
            const icons = files
                .filter(file => file.endsWith('.svg'))
                .map(file => ({
                    name: file.replace('.svg', ''),
                    src: `/${category}/${file}`,
                    category: category
                }))

            return NextResponse.json({ icons })
        } catch (error) {
            // 检查是否是目录不存在的错误
            if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
                // 如果目录不存在，返回空数组
                return NextResponse.json({ icons: [{ name: 'No icons found', src: '', category: category }] })
            }
            
            // 其他错误则返回错误信息
            return NextResponse.json(
                { 
                    error: `Failed to read directory: ${error}`,
                    code: (error as NodeJS.ErrnoException).code 
                }, 
                { status: 500 }
            )
        }
    } catch (error) {
        // 处理其他未预期的错误
        return NextResponse.json(
            { 
                error: 'Unexpected error occurred',
                details: `${error}`
            }, 
            { status: 500 }
        )
    }
}
