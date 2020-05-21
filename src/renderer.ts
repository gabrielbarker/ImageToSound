// @ts-nocheck
import MidiGenerator from "./lib/MidiGenerator";

const fileSelector = document.querySelector("#file-input");
let file;
const spec = {
  progression: "",
  scale: "",
  pattern: "",
  arpeggiate: false,
};

if (fileSelector) {
  fileSelector.addEventListener("change", function (e) {
    file = fileSelector.files[0];
    var fileName = file.name;
    if (e.target) var nextSibling = e.target.nextElementSibling;
    nextSibling.innerText = fileName;
  });
}

function setSpec() {
  const progression = document.querySelector("#progression-select").value;
  const pattern = document.querySelector("#pattern-select").value;

  const scaleNote = document.querySelector("#scale-note-select").value;
  const scaleOctave = document.querySelector("#scale-octave-select").value;
  const scaleMain = document.querySelector("#scale-select").value;

  const scale = `${scaleNote}${scaleOctave} ${scaleMain}`;
  const arpeggiate = document.querySelector("#arpCheck").value;

  spec.progression = progression;
  spec.pattern = pattern;
  spec.scale = scale;
  spec.arpeggiate = arpeggiate;
}

const generateButton = document.querySelector("#generate");
generateButton.addEventListener("click", () => {
  console.log("clicked");
  console.log(file);
  console.log(spec);
  setSpec();
  const mg = new MidiGenerator(file, spec);
  mg.generateMidi();
});
