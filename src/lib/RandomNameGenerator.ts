export default class RandomNameGenerator {
  // prettier-ignore
  private static alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
  private static vowels = ["a", "e", "i", "o", "u"];
  private static nextLetterMap = RandomNameGenerator.getNextLetterMap();

  public getName() {
    let name = String.fromCharCode(Math.random() * 26 + 97);
    const len = RandomNameGenerator.getRandomWordLength();
    for (let i = 0; i < len; i++) {
      name += this.randomIn(RandomNameGenerator.nextLetterMap[name[i]]);
    }
    return name[0].toUpperCase() + name.substr(1);
  }

  private static alphabetExceptFor(...letters: string[]): string[] {
    return RandomNameGenerator.alphabet.filter((a) => !letters.includes(a));
  }

  private static vowelsAnd(...letters: string[]): string[] {
    return RandomNameGenerator.vowels.concat(letters);
  }

  private randomIn(arr: string[]): string {
    const index = Math.floor(Math.random() * arr.length);
    return arr[index == arr.length ? arr.length - 1 : index];
  }

  private static getRandomWordLength(): number {
    return Math.floor(Math.random() * 8) + 4;
  }

  private static getNextLetterMap(): { [index: string]: string[] } {
    return {
      a: RandomNameGenerator.alphabetExceptFor("a", "e", "i", "u"),
      b: RandomNameGenerator.vowelsAnd("r", "l"),
      c: RandomNameGenerator.vowelsAnd("r", "l", "h", "t"),
      d: RandomNameGenerator.vowelsAnd("r", "g"),
      e: RandomNameGenerator.alphabet,
      f: RandomNameGenerator.vowelsAnd("r", "l"),
      g: RandomNameGenerator.vowelsAnd("r", "l"),
      h: RandomNameGenerator.vowels,
      i: RandomNameGenerator.alphabetExceptFor("i", "u"),
      j: RandomNameGenerator.vowels,
      k: RandomNameGenerator.vowelsAnd("r", "l"),
      l: RandomNameGenerator.vowels,
      m: RandomNameGenerator.vowels,
      n: RandomNameGenerator.vowelsAnd("g"),
      o: RandomNameGenerator.alphabet,
      p: RandomNameGenerator.vowelsAnd("r", "l"),
      q: ["u"],
      r: RandomNameGenerator.vowels,
      s: RandomNameGenerator.vowelsAnd("t", "l"),
      t: RandomNameGenerator.vowelsAnd("r", "y", "h"),
      u: RandomNameGenerator.alphabetExceptFor("u"),
      v: RandomNameGenerator.vowels,
      w: RandomNameGenerator.vowelsAnd("r", "h"),
      x: RandomNameGenerator.vowels,
      y: RandomNameGenerator.vowels,
      z: RandomNameGenerator.vowels,
    };
  }
}
