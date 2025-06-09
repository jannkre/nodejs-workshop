import { writeFileSync } from "fs";
import sharp from "sharp";

export default async function downloadImage(url, path) {
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    writeFileSync(path, Buffer.from(buffer), { encoding: "binary" });
}

export async function resizeImage(path, width, height) {
    const image = await sharp(path);
    await image.resize(width, height).toFile(path.replace(".jpg", "_resized.jpg"));
}