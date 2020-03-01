const getPixels = require("@cronvel/get-pixels");
import * as fs from "fs";
import PixelDataWriter from "./PixelDataWriter";

export default class PixelHandler {
  public writePixelDataToFile(imagePath: string, outputPath: string) {
    console.log(`Gettings pixels from ${imagePath}...`);
    getPixels(imagePath, function(err: Error, pixels: any) {
      const writeStream = fs.createWriteStream(outputPath);
      const writer = new PixelDataWriter(pixels, writeStream);

      if (err) {
        console.log("Could not find image at " + imagePath);
        return;
      } else {
        console.log(`Writing pixels to ${outputPath}...`);
        // writePixelsToFile(pixels, writeStream);
        writer.writePixelsToFile();
      }
    });
  }
}
