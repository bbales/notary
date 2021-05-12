import Parser from './Parser.ts';
import Lib from './Lib.ts';

export default class Chord {
    static getNotesFromSymbol(symbol: string, octave: number = 0) {
        const rootString = Parser.extractRoot(symbol);
        if (!rootString) return [];

        const rootIndex = Parser.noteStringToIndex(rootString);
        if (!rootIndex) return [];

        const flats = Parser.extractFlats(symbol);
        const sharps = Parser.extractSharps(symbol);

        const contains = (arr: string[]) => Boolean(arr.find(s => symbol.includes(s)));

        const interval: Array<number> = Array(14).fill(rootIndex);
        interval[3] += 4;
        interval[5] += 7;
        interval[6] += 0;
        interval[7] += 0;
        interval[9] += 0;
        interval[11] += 0;
        interval[13] += 0;

        // Third
        if (
            (symbol.includes('m') && !symbol.includes('maj')) ||
            symbol.includes(rootString + '-') ||
            symbol.includes('dim')
        ) {
            interval[3] = rootIndex + 3;
        }
        if (symbol.includes('sus4')) {
            interval[3] = rootIndex + 5;
        }
        if (symbol.includes('sus2')) {
            interval[3] = rootIndex + 2;
        }

        // Fifth
        if (contains(['dim', 'b5'])) {
            interval[5] = rootIndex + 6;
        }

        if (contains(['#5', '+5', '+7', 'aug'])) {
            interval[5] = rootIndex + 8;
        }

        // Sixth
        if (symbol.includes('6')) {
            interval[6] = rootIndex + 9;
        }

        // Seventh
        if (contains(['7', '9', '11', '13'])) {
            interval[7] = rootIndex + 10;
        }

        if (contains(['M7', 'M9', 'M11', 'M13', 'maj7', 'maj9', 'maj11', 'maj13'])) {
            interval[7] = rootIndex + 11;
        }

        if (symbol.includes('dim') && interval[7] == rootIndex + 10) {
            interval[7]--;
        }

        // Ninth
        if (!flats.includes(9) && !sharps.includes(9) && contains(['9', '11', '13'])) {
            interval[9] = rootIndex + 14;
        }

        // Eleventh
        if (!flats.includes(11) && !sharps.includes(11) && contains(['11', '13'])) {
            interval[11] = rootIndex + 17;
        }

        // Thirteenth
        if (!flats.includes(13) && !sharps.includes(13) && symbol.includes('13')) {
            interval[13] = rootIndex + 21;
        }

        const majorScaleIntervals = Lib.scales['major'];

        flats.forEach((flatIndex: number) => {
            let flatValue = rootIndex - 1;
            for (let noteIndex = 0; noteIndex < flatIndex - 1; noteIndex++) {
                flatValue += majorScaleIntervals[noteIndex % majorScaleIntervals.length];
            }
            interval.push(flatValue || Lib.notesPerOctave);
        });

        sharps.forEach((sharpIndex: number) => {
            let sharpValue = rootIndex + 1;
            for (let noteIndex = 0; noteIndex < sharpIndex - 1; noteIndex++) {
                sharpValue += majorScaleIntervals[noteIndex % majorScaleIntervals.length];
            }
            interval.push(sharpValue || Lib.notesPerOctave);
        });

        return Array.from(new Set<number>(interval))
            .map(i => (i || Lib.notesPerOctave) + Lib.notesPerOctave * octave)
            .sort((a: number, b: number) => a - b);
    }
}
