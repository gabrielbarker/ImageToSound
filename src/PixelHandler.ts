const getPixels = require("@cronvel/get-pixels");
import * as fs from "fs";
import PixelDataWriter from "./PixelDataWriter";
import PixelMusicalData from "./PixelMusicalData";

// This class handles getting the pixels from the image and using that data
export default class PixelHandler {
  public Ready: Promise<any>;
  private imagePath: string;
  constructor(imagePath: string) {
    this.imagePath = imagePath;
    this.Ready = new Promise((resolve, reject) => {
      const savePixels = (err: any, pixels: any) => {
        resolve(pixels);
      };
      getPixels(imagePath, savePixels);
    });
  }

  // This function the pixel data to a txt file
  public writePixelDataToFile = async (outputPath: string) => {
    console.log(`Gettings pixels from ${this.imagePath}...`);
    const pixels = await this.Ready;
    const writeStream = fs.createWriteStream(outputPath);
    const writer = new PixelDataWriter(pixels, writeStream);
    console.log(`Writing pixels to ${outputPath}...`);
    writer.writePixelsToFile();
  };

  // This function gets the chord progression and pattern from the pixel data
  public async getScribbletuneData() {
    console.log(`Gettings pixels from ${this.imagePath}...`);
    const pixels = await this.Ready;
    const musicalData = new PixelMusicalData(pixels);
    let patterns = musicalData.getPatternsFromPixelRows();
    let progressions = musicalData.getProgressionsFromPixelRows();
    for (let i = 0; i < patterns.length; i++) {
      console.log(`pattern: ${patterns[i]}, progression: ${progressions[i]}`);
    }
    return {
      patterns: patterns,
      progressions: progressions
    };
  }
}
