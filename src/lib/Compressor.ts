import sharp from "sharp";

export default class Compressor {
  private path: string;
  private compressedPath: string;

  constructor(path: string) {
    this.path = path;
    this.compressedPath = this.constructCompressedPath();
  }

  public async compressImage() {
    console.log("Compressing image...");
    await this.compressImageToSize();
    console.log(`Successfully compressed image at ${this.compressedPath}...`);
  }

  public getCompressedPath(): string {
    return this.compressedPath;
  }

  private async compressImageToSize(width: number = 16, height: number = 16): Promise<any> {
    return await sharp(this.path)
      .resize(16, 16, {
        fit: sharp.fit.inside,
        withoutEnlargement: true,
      })
      .toFile(this.compressedPath);
  }

  private constructCompressedPath(): string {
    const dot = this.path.lastIndexOf(".");
    return `${this.path.substring(0, dot)}-compressed${this.path.substring(dot)}`;
  }
}
