import PixelHandler from "./PixelHandler";
import ProgressionCreatorFactory from "./ProgressionCreatorFactory";
import PatternCreatorFactory from "./PatternCreatorFactory";
import Compressor from "./Compressor";
const scribble = require("scribbletune");

export default class MidiGenerator {
  private path: string;
  private midiName: string;
  private progression: string = "";
  private pattern: string = "";
  private scale: string = "";
  private arpeggiate: boolean = false;
  private compress: boolean = false;

  constructor(path: string, midiName: string, spec: any) {
    this.path = path;
    this.midiName = midiName;
    this.progression = spec.progression;
    this.pattern = spec.pattern;
    this.scale = spec.scale;
    this.arpeggiate = spec.arpeggiate;
    this.compress = spec.compress;
  }

  public async generateMidi() {
    if (this.compress) await this.compressFile();

    const pd = new PixelHandler(this.path);
    const pixels = await pd.getPixels();
    const progressionCreatorFactory = new ProgressionCreatorFactory(pixels);
    const patternCreatorFactory = new PatternCreatorFactory(pixels);

    const clips = [];
    const length = scribble.scale(this.scale).length;
    const progressionCreator = progressionCreatorFactory.getProgression(this.progression, length);
    const patternCreator = patternCreatorFactory.getPattern(this.pattern);

    const progression = progressionCreator.getProgressions().join(" ");
    const pattern = patternCreator.getPatterns().join("");

    let notes = scribble.getChordsByProgression(this.scale, progression);
    if (this.arpeggiate) notes = scribble.arp(notes);

    clips.push(scribble.clip({ notes: notes, pattern: pattern }));

    const outPathStub = this.path.substring(0, this.path.lastIndexOf("/"));
    const outPath = `${outPathStub}/${this.midiName}.mid`;
    scribble.midi(clips[0], outPath);
  }

  private async compressFile(): Promise<void> {
    const compressor = new Compressor(this.path);
    await compressor.compressImage();
    this.path = compressor.getCompressedPath();
  }
}
