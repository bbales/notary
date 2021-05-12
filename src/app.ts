import UIPiano from './UIPiano.ts';
import Chord from './Chord.ts';
import Chords from './Chords.ts';
import Lib from './Lib.ts';
import Scale from './Scale.ts';
import UIKey from './UIKey.ts';
import UIModeSelector from './UIModeSelector.ts';
import Parser from './Parser.ts';

document.body.className = 'h-screen flex flex-col items-center justify-center bg-gray-100';

const piano = new UIPiano();
const pianos = [piano];

const modeSelector = new UIModeSelector();

/**
 * Smart inputs
 */

const textInputClass = 'p-4 text-center text-xl my-4 outline-none border';

const scaleInput: HTMLInputElement = document.createElement('input');
scaleInput.type = 'text';
scaleInput.value = 'major';
scaleInput.className = textInputClass;
scaleInput.onclick = () => scaleInput.select();

const chordInput: HTMLInputElement = document.createElement('input');
chordInput.type = 'text';
chordInput.value = 'm';
chordInput.className = textInputClass;
chordInput.onclick = () => chordInput.select();

/**
 * Title
 */

const title = document.createElement('div');
title.className = 'absolute top-0 right-0 p-8 text-gray-500 text-right';
title.innerHTML = `<span class="p-2 px-4 bg-white text-black border rounded" style="font-size:2rem;">
        Notary
    </span>
    <br>
    <a class="mr-2 text-white bg-black p-1 px-2 border rounded hover:bg-gray-600" href="https://github.com/bbales/notary">
        @bbales
    </a>`;

/**
 * UI
 */

const chordContainer = document.createElement('div');
chordContainer.className = 'mt-16 grid grid-flow-row grid-cols-4 w-screen gap-y-16 ';

document.body.append(title);
document.body.append(modeSelector.el);
document.body.append(scaleInput);
document.body.append(chordInput);
document.body.append(piano.el);
document.body.append(chordContainer);

/**
 * State
 */

let selectedNoteStr = 'C';
let selectedOctave = 1;

/**
 * UI Update
 */

const update = () => {
    let noteIndexes: number[] = [];
    if (modeSelector.mode === UIModeSelector.SCALE) {
        chordInput.style.display = 'none';
        scaleInput.style.display = 'block';
        noteIndexes = Scale.getNotesFromSymbol(`${selectedNoteStr} ${scaleInput.value}`);
        piano.setNotes(noteIndexes, true);
    } else if (modeSelector.mode === UIModeSelector.CHORD) {
        chordInput.style.display = 'block';
        scaleInput.style.display = 'none';
        noteIndexes = Chord.getNotesFromSymbol(
            `${selectedNoteStr}${chordInput.value} `,
            selectedOctave
        );
        piano.setNotes(noteIndexes);
    }

    chordContainer.innerHTML = '';
    const chords = new Chords(
        selectedNoteStr,
        scaleInput.value.includes('min') ? 'minor' : 'major'
    );

    pianos.length = 0;
    pianos.push(piano);

    chords.getProgression().forEach((chord, i) => {
        let startNoteIndex = chord[0] - 2;
        if (startNoteIndex <= 0) {
            startNoteIndex += Lib.notesPerOctave;
            chord = chord.map((noteIndex: number) => (noteIndex += Lib.notesPerOctave));
        }

        const p = new UIPiano(startNoteIndex, Lib.notesPerOctave + 1)
            .setNotes(chord)
            .small()
            .title(
                `<b>${chords.getChordNumeral(
                    i + 1
                )}</b> <span class="text-gray-400">|</span> ${chords.getChordSymbol(i + 1)}`
            );
        chordContainer.append(p.el);
        pianos.push(p);
    });
};

/**
 * Interaction
 */

piano.onKeyDown = (key: UIKey) => {
    selectedNoteStr = key.noteStr;
    selectedOctave = key.octave;
    update();
};

modeSelector.onchange = update;
scaleInput.onkeyup = update;
chordInput.onkeyup = update;

window.onkeyup = (e: KeyboardEvent) => {
    const { key } = e;
    if (key === 'ArrowUp') {
        selectedNoteStr = Parser.transposeNote(selectedNoteStr, 1);
    } else if (key === 'ArrowDown') {
        selectedNoteStr = Parser.transposeNote(selectedNoteStr, -1);
    }
    update();
};

update();

/**
 * MIDI
 */

const nomidi = document.createElement('div');
nomidi.style.display = 'none';
nomidi.className = 'absolute bottom-0 right-0 p-4 m-4 text-gray-500 text-right rounded border ';
document.body.append(nomidi);

if ('requestMIDIAccess' in (navigator as any)) {
    (navigator as any).requestMIDIAccess().then(access => {
        const inputs = access.inputs.values();
        for (var input of inputs) input.onmidimessage = message => handleMIDIMessage(message.data);

        nomidi.className += 'bg-green-100 border-green-300';

        access.onstatechange = e => {
            nomidi.innerHTML = `Connected to ${e.port.name}`;
            nomidi.style.display = 'block';
        };
    });
} else {
    nomidi.className += 'bg-yellow-100 border-yellow-300';
    nomidi.innerHTML = `Your browser does not support WebMIDI`;
    nomidi.style.display = 'block';
}

const handleMIDIMessage = (bytes: Uint8Array) => {
    const command = bytes[0];
    var note = bytes[1];
    var velocity = bytes.length > 2 ? bytes[2] : 0;
    switch (command) {
        case 144:
            if (velocity > 0) {
                window.dispatchEvent(new CustomEvent('midi', { detail: { note, action: 'on' } }));
            } else {
                window.dispatchEvent(new CustomEvent('midi', { detail: { note, action: 'off' } }));
            }
            break;
        case 128:
            window.dispatchEvent(new CustomEvent('midi', { detail: { note, action: 'off' } }));
            break;
    }
};
