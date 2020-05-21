// const getPixels = require("@cronvel/get-pixels");
const imagePixels = require("image-pixels");
import * as fs from "fs";
import PixelDataWriter from "./PixelDataWriter";
import PixelMusicalData from "./PixelMusicalData";

// This class handles getting the pixels from the image and using that data
export default class PixelHandler {
  private imagePath: string;
  constructor(imagePath: string) {
    this.imagePath = imagePath;
  }

  public async getPixels(): Promise<any> {
    return imagePixels(this.imagePath);
  }

  // This function the pixel data to a txt file
  public writePixelDataToFile = async (outputPath: string) => {
    console.log(`Gettings pixels from ${this.imagePath}...`);
    const pixels = await this.getPixels();
    const writeStream = fs.createWriteStream(outputPath);
    const writer = new PixelDataWriter(pixels, writeStream);
    console.log(`Writing pixels to ${outputPath}...`);
    writer.writePixelsToFile();
  };

  // This function gets the chord progression and pattern from the pixel data
  public async getScribbletuneData() {
    console.log(`Gettings pixels from ${this.imagePath}...`);
    const pixels = await this.getPixels();
    const musicalData = new PixelMusicalData(pixels);
    let patterns = musicalData.getPatternsFromPixelRows();
    let progressions = musicalData.getProgressionsFromPixelRows();
    for (let i = 0; i < patterns.length; i++) {
      console.log(`pattern: ${patterns[i]}, progression: ${progressions[i]}`);
    }
    return {
      patterns: patterns,
      progressions: progressions,
    };
  }
}
