import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function GET(
  request: NextRequest,
  { params }: { params: { name: string } }
) {
  const { name } = params;
  const filePath = path.join(process.cwd(), "src", "assets", "images", name);

  try {
    const fileBuffer = await fs.readFile(filePath);
    const response = new NextResponse(fileBuffer);

    const ext = path.extname(name).toLowerCase();
    const contentTypes = {
      ".svg": "image/svg+xml",
      ".png": "image/png",
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".gif": "image/gif",
      ".webp": "image/webp",
    };

    response.headers.set(
      "Content-Type",
      contentTypes[ext as keyof typeof contentTypes] ||
        "application/octet-stream"
    );

    response.headers.set("Cache-Control", "public, max-age=31536000");

    return response;
  } catch (error) {
    console.error("Error reading file:", error);
    return new NextResponse("File not found", { status: 404 });
  }
}
