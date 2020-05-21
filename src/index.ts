import PixelHandler from "./PixelHandler";
const scribble = require("scribbletune");

// Path of the image to convert
const filePath = "/Users/gbarker/Desktop/box1.jpg";

// This function generates a midi file from the above image.
// The rules for how it does this are specified in the PixelMusicData class
async function generateMidi(path: string) {
  const pd = new PixelHandler(path);
  const data = await pd.getScribbletuneData();

  const clips = [];
  const pattern = data.patterns.reduce((prev, curr) => (prev += curr));
  const progression = data.progressions.join(" ");
  for (let i = 0; i < data.patterns.length; i++) {
    clips.push(
      scribble.clip({
        notes: scribble.arp(scribble.getChordsByProgression("A2 minor", progression)),
        pattern: pattern,
      })
    );
  }

  scribble.midi(clips[0], "test.mid");
}

async function writeToTextFile(path: string) {
  const pd = new PixelHandler(path);
  pd.writePixelDataToFile(path.substring(0, path.lastIndexOf(".")) + ".txt");
}

generateMidi(filePath);
