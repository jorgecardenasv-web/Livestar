import fs from 'fs/promises'
import path from 'path'

export async function getImage(name: string): Promise<string> {
  const filePath = path.join(process.cwd(), "src", "assets", "images", name)

  try {
    const fileBuffer = await fs.readFile(filePath)
    const base64 = fileBuffer.toString('base64')

    const ext = path.extname(name).toLowerCase()
    const contentTypes = {
      ".svg": "image/svg+xml",
      ".png": "image/png",
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".gif": "image/gif",
      ".webp": "image/webp",
    }

    const contentType = contentTypes[ext as keyof typeof contentTypes] || "application/octet-stream"

    return `data:${contentType};base64,${base64}`
  } catch (error) {
    console.error("Error reading file:", error)
    return ''
  }
}

