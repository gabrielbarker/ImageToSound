// @ts-nocheck
import MidiGenerator from "./lib/MidiGenerator";
import RandomNameGenerator from "./lib/RandomNameGenerator";

const nameGenerator = new RandomNameGenerator();
const fileSelector = document.querySelector("#file-input");
const saveName = document.querySelector("#save-name");

setMidiNameTo(nameGenerator.getName());

if (fileSelector) {
  fileSelector.addEventListener("change", function (e) {
    const fileName = fileSelector.files[0].name;
    const nextSibling = e.target.nextElementSibling;
    nextSibling.innerText = fileName;
  });
}

document.querySelector("#generate").addEventListener("click", async () => {
  const path = fileSelector.files[0].path;
  const spec = getSpec();
  generateOrError(path, spec);
});

document
  .querySelector("#random-name")
  .addEventListener("click", () => setMidiNameTo(nameGenerator.getName()));

async function generateOrError(path, spec) {
  try {
    await successfullyGenerateMidi(path, spec);
  } catch (error) {
    displayToast(false, error.message);
  }
}

async function successfullyGenerateMidi(path, spec) {
  const mg = new MidiGenerator(path, saveName.value, spec);
  await mg.generateMidi();
  displayToast(true, `A midi was file named ${saveName.value} created!`);
  setMidiNameTo(nameGenerator.getName());
}

function getSpec() {
  return {
    compress: document.querySelector("#compressCheck").checked,
    progression: document.querySelector("#progression-select").value,
    pattern: document.querySelector("#pattern-select").value,
    scale: getScale(),
    arpeggiate: document.querySelector("#arpCheck").checked,
  };
}

function getScale() {
  const scaleNote = document.querySelector("#scale-note-select").value;
  const scaleOctave = document.querySelector("#scale-octave-select").value;
  const scaleMain = document.querySelector("#scale-select").value;
  return `${scaleNote}${scaleOctave} ${scaleMain}`;
}

function displayToast(success: boolean, message: string) {
  const toast = document.querySelector(`.toast-${success ? "success" : "error"}`);
  toast.querySelector("p")?.innerText = message;
  toast.style.display = "block";
  setTimeout(() => (toast.style.display = "none"), 5000);
}

function setMidiNameTo(text: string) {
  saveName.value = text;
}
