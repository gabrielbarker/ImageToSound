import PixelHandler from "./PixelHandler";
import ProgressionCreatorFactory from "./ProgressionCreatorFactory";
import PatternCreatorFactory from "./PatternCreatorFactory";
const scribble = require("scribbletune");

export default class MidiGenerator {
  private file: any;
  private progression: string = "";
  private pattern: string = "";
  private scale: string = "";
  private arpeggiate: boolean = false;

  constructor(file: any, spec: any) {
    this.file = file;
    this.progression = spec.progression;
    this.pattern = spec.pattern;
    this.scale = spec.scale;
    this.arpeggiate = spec.arpeggiate;
  }

  public async generateMidi() {
    const pd = new PixelHandler(this.file.path);
    const progressionCreatorFactory = new ProgressionCreatorFactory(await pd.Ready);
    const patternCreatorFactory = new PatternCreatorFactory(await pd.Ready);

    const clips = [];
    const progression = progressionCreatorFactory.getProgression(this.progression);
    const pattern = patternCreatorFactory.getPattern(this.pattern);

    let notes = scribble.getChordsByProgression(this.scale, progression);
    if (this.arpeggiate) notes = scribble.arp(notes);

    clips.push(scribble.clip({ notes: notes, pattern: pattern }));

    const outPath = this.file.path.substring(0, this.file.path.lastIndexOf("."));
    scribble.midi(clips[0], outPath + ".mid");
  }
}
