export default class Pixel {
  public readonly pixel: [number, number, number];
  public readonly R: number;
  public readonly G: number;
  public readonly B: number;

  constructor(r: number, g: number, b: number) {
    this.pixel = [r, g, b];
    this.R = r;
    this.G = g;
    this.B = b;
  }

  public equals(pixel: Pixel): boolean {
    return this.R === pixel.R && this.G === pixel.G && this.B === pixel.B;
  }

  public compareTo(pixel: Pixel): number {
    const thisMagnitude = Math.sqrt(this.pixel.reduce((prev, curr) => (prev += curr * curr)));
    const thatMagnitude = Math.sqrt(pixel.pixel.reduce((prev, curr) => (prev += curr * curr)));

    if (thisMagnitude === thatMagnitude) return 0;
    return thisMagnitude > thatMagnitude ? 1 : -1;
  }

  public toString(): string {
    const paddedPixelValues = this.pixel.map(n => n.toString().padStart(3, " "));
    return `[${paddedPixelValues.join(",")}]`;
  }
}
