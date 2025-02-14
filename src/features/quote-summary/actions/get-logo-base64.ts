import fs from "fs";
import path from "path";

export function getLogoBase64(): string {
  const logoPath = path.join(
    process.cwd(),
    "src",
    "assets",
    "images",
    "Livestar-Logo-Color-SB-1024x632.png"
  );
  const fileData = fs.readFileSync(logoPath);
  return `data:image/png;base64,${fileData.toString("base64")}`;
}
