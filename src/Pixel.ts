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
    const thisMagnitude = Pixel.getMagnitudeOf(this);
    const thatMagnitude = Pixel.getMagnitudeOf(pixel);

    if (thisMagnitude === thatMagnitude) return 0;
    return thisMagnitude > thatMagnitude ? 1 : -1;
  }

  public toString(): string {
    const paddedPixelValues = this.pixel.map((n) => n.toString().padStart(3, " "));
    return `[${paddedPixelValues.join(",")}]`;
  }

  private static getMagnitudeOf(p: Pixel) {
    return Math.sqrt(p.R * p.R + p.G * p.G + p.B * p.B);
  }
}
