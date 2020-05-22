// @ts-nocheck
import MidiGenerator from "./lib/MidiGenerator";

const fileSelector = document.querySelector("#file-input");
const saveName = document.querySelector("#save-name");

setMidiNameTo(randomName());

if (fileSelector) {
  fileSelector.addEventListener("change", function (e) {
    const fileName = fileSelector.files[0].name;
    const nextSibling = e.target.nextElementSibling;
    nextSibling.innerText = fileName;
  });
}

document.querySelector("#generate").addEventListener("click", async () => {
  const file = fileSelector.files[0];
  const spec = getSpec();
  generateOrError(file, spec);
});

document.querySelector("#random-name").addEventListener("click", () => setMidiNameTo(randomName()));

async function generateOrError(file, spec) {
  try {
    await successfullyGenerateMidi(file, spec);
  } catch (error) {
    displayToast(false, error.message);
  }
}

async function successfullyGenerateMidi(file, spec) {
  const mg = new MidiGenerator(file, saveName.value, spec);
  await mg.generateMidi();
  displayToast(true, `A midi was file named ${saveName.value} created!`);
  setMidiNameTo(randomName());
}

function getSpec() {
  return {
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

function randomName() {
  let name = "";
  const len = Math.random() * 15 + 6;
  for (let i = 0; i < len; i++) {
    const c = String.fromCharCode(Math.floor(Math.random() * 26) + 97);
    name += Math.random() > 0.5 ? c.toUpperCase() : c;
  }
  return name;
}
