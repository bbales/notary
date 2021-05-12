import Parser from './Parser.ts';
import Lib from './Lib.ts';
import { range } from './utils.ts';

export default class Scale {
    static isScale(symbol: string) {
        const re = new RegExp('[ABCDEFG](#|b)?\\s+(' + Lib.scaleNames.join('|') + ')', 'gi');
        return re.test(symbol);
    }

    static getNotesFromSymbol(symbol: string): number[] {
        if (!this.isScale(symbol)) return [];

        const rootString = Parser.extractRoot(symbol);
        if (!rootString) return [];

        const rootIndex = Parser.noteStringToIndex(rootString);
        if (!rootIndex) return [];

        const symbolScale = symbol.replace(rootString, '').trim();

        const scaleName: string | null =
            Lib.scaleNames.find((name: string) => symbolScale === name) || null;

        if (!scaleName) return [];

        const octave = Lib.scales[scaleName].reduce(
            (notes: number[], interval: number) => [...notes, notes.slice(-1)[0] + interval],
            [rootIndex]
        );

        return octave;

        // const notes: number[][] = range(Lib.totalOctaves).map((oct: number) =>
        //     octave.map(
        //         (noteIndex: number) => (noteIndex + oct * Lib.notesPerOctave) % (Lib.totalNotes + 1)
        //     )
        // );

        // return Array.from(new Set(Array<number>().concat(...notes)));
    }
}
