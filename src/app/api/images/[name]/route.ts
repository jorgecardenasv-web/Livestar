import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(
  request: NextRequest,
  { params }: { params: { name: string } },
) {
  const { name } = params;
  const filePath = path.join(process.cwd(), "src", "assets", "images", name);

  try {
    const fileBuffer = await fs.promises.readFile(filePath);
    const response = new NextResponse(fileBuffer);

    const ext = path.extname(name).toLowerCase();
    let contentType = "application/octet-stream";

    switch (ext) {
      case ".svg":
        contentType = "image/svg+xml";
        break;
      case ".png":
        contentType = "image/png";
        break;
      case ".jpg":
      case ".jpeg":
        contentType = "image/jpeg";
        break;
    }

    response.headers.set("Content-Type", contentType);
    return response;
  } catch (error) {
    console.error("Error reading file:", error);
    return new NextResponse("File not found", { status: 404 });
  }
}
