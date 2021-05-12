import Chord from './Chord.ts';
import Lib from './Lib.ts';
import Scale from './Scale.ts';
import Parser from './Parser.ts';
import { range } from './utils.ts';

export default class Chords {
    static MINOR: string = 'minor';
    static MAJOR: string = 'major';

    private useTriads: boolean = true;
    private notes: number[] = [];
    private keyType: string;

    private minorMods = ['min', 'dim', 'maj', 'min', 'min', 'maj', 'maj'];
    private majorMods = ['maj', 'min', 'min', 'maj', 'maj', 'min', 'dim'];

    private minor7Mods = ['min', 'min7b5', 'maj', 'min', 'min', 'maj', 'dom'];
    private major7Mods = ['maj7', 'min7', 'min7', 'maj7', 'dom7', 'min7', 'min7b5'];

    private numerals = ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii'];

    constructor(noteStr: string, keyType: string = Chords.MINOR) {
        this.keyType = keyType;
        this.notes = Scale.getNotesFromSymbol(`${noteStr} ${keyType}`);
    }

    getModifier(degree: number): string {
        let modifiers =
            this.keyType === Chords.MINOR
                ? this.useTriads
                    ? this.minorMods
                    : this.minor7Mods
                : this.useTriads
                ? this.majorMods
                : this.major7Mods;

        return modifiers[degree - 1];
    }

    getChordSymbol(degree: number): string {
        const noteIndexFirstOctave = Parser.noteIndexToFirstOctave(this.notes[degree - 1]);
        const noteStr = Lib.sharps[noteIndexFirstOctave - 1];

        return `${noteStr}${this.getModifier(degree)}`;
    }

    getChordNumeral(degree: number): string {
        const modifier = this.getModifier(degree);
        let numeral = this.numerals[degree - 1];
        if (modifier.includes('min')) {
            numeral = numeral.toLowerCase();
        } else {
            numeral = numeral.toUpperCase();
        }

        if (modifier.includes('dim')) {
            numeral = numeral.toLocaleLowerCase() + '<sup>o</sup>';
        }

        return `${numeral}`;
    }

    getChord(degree: number): number[] {
        const symbol = this.getChordSymbol(degree);
        return Chord.getNotesFromSymbol(symbol);
    }

    sevenths(): Chords {
        this.useTriads = false;
        return this;
    }

    triads(): Chords {
        this.useTriads = true;
        return this;
    }

    getProgression(degrees: number[] = range(7).map(d => d + 1)): number[][] {
        return degrees.map(deg => this.getChord(deg));
    }

    getProgressionSymbols(degrees: number[] = range(7).map(d => d + 1)): string[] {
        return degrees.map(deg => this.getChordSymbol(deg));
    }

    getProgressionNumerals(degrees: number[] = range(7).map(d => d + 1)): string[] {
        return degrees.map(deg => this.getChordSymbol(deg));
    }
}
