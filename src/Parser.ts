import Lib from './Lib.ts';

export default class Parser {
    static transposeNote(noteString: string, amount: number): string {
        let noteIndex = Math.max(
            Lib.sharps.indexOf(noteString),
            Lib.flats.indexOf(noteString),
            Lib.alts.indexOf(noteString)
        );

        if (noteIndex < 0) return noteString;

        noteIndex = (noteIndex + amount) % Lib.notesPerOctave;

        if (noteIndex < 0) noteIndex += Lib.notesPerOctave;

        return amount < 0 ? Lib.flats[noteIndex] : Lib.sharps[noteIndex];
    }

    static extractNotes(query: string): string[] {
        return (query.match(/[ABCDEFG]b?#?/g) || []).map((note: string) => {
            const altIndex = Lib.alts.indexOf(note);
            return altIndex >= 0 ? Lib.sharps[altIndex] : note;
        });
    }

    static extractSymbols(query: string): string[] {
        return (query.match(/[ABCDEFG](b?#?)([^ABCDEFG])*/g) || []).map((symbol: string) =>
            symbol.trim().replace(/\s+/g, ' ')
        );
    }

    static extractRoot(query: string): string | null {
        const results = query.match(/[ABCDEFG]b?#?/) || [];
        return results.length > 0 ? results[0] : null;
    }

    // B# -> 1
    static noteStringToIndex(noteString: string): number | null {
        let noteIndex =
            Lib.sharps.indexOf(noteString) + 1 ||
            Lib.flats.indexOf(noteString) + 1 ||
            Lib.alts.indexOf(noteString) + 1;

        return noteIndex ? noteIndex : null;
    }

    // 1 -> C#
    static indexToNoteString(index: number, sharp: boolean = true): string {
        return sharp
            ? Lib.sharps[(index - 1) % Lib.notesPerOctave]
            : Lib.flats[(index - 1) % Lib.notesPerOctave];
    }

    // Amajb5 -> [5]
    static extractFlats(query: string): number[] {
        return (query.replace(/([ABCDEFG](b|#)?)-?\d+/g, '').match(/(b|-)\d+/g) || [])
            .map(str => parseInt(str.slice(1), 10))
            .reduce((acc: number[], num: number) => (!acc.includes(num) ? [...acc, num] : acc), []);
    }

    // Amaj#5 -> [5]
    static extractSharps(query: string): number[] {
        return (query.replace(/([ABCDEFG](b|#)?)\+?\d+/g, '').match(/(#|\+)\d+/g) || [])
            .map(str => +str.slice(1))
            .reduce((acc: number[], num: number) => (!acc.includes(num) ? [...acc, num] : acc), []);
    }

    // 1 -> 1
    // 12 -> 12
    // 13 -> 1
    static noteIndexToFirstOctave(noteIndex: number) {
        const zeroIndex = noteIndex - 1;
        return (zeroIndex % Lib.notesPerOctave) + 1;
    }
}
