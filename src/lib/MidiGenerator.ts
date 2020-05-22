import PixelHandler from "./PixelHandler";
import ProgressionCreatorFactory from "./ProgressionCreatorFactory";
import PatternCreatorFactory from "./PatternCreatorFactory";
const scribble = require("scribbletune");

export default class MidiGenerator {
  private file: any;
  private midiName: string;
  private progression: string = "";
  private pattern: string = "";
  private scale: string = "";
  private arpeggiate: boolean = false;

  constructor(file: any, midiName: string, spec: any) {
    this.file = file;
    this.midiName = midiName;
    this.progression = spec.progression;
    this.pattern = spec.pattern;
    this.scale = spec.scale;
    this.arpeggiate = spec.arpeggiate;
  }

  public async generateMidi() {
    const pd = new PixelHandler(this.file.path);
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

    const outPathStub = this.file.path.substring(0, this.file.path.lastIndexOf("/"));
    const outPath = `${outPathStub}/${this.midiName}.mid`;
    scribble.midi(clips[0], outPath);
  }
}
