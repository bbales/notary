export type Interval = Array<number>;

export default class Lib {
    static scales: { [scale: string]: Interval } = {
        // Misc
        'chromatic': [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],

        // Minor
        'minor': [2, 1, 2, 2, 1, 2, 2],
        'natural minor': [2, 1, 2, 2, 1, 2, 2],

        // Major modes
        'major': [2, 2, 1, 2, 2, 2, 1],
        'ionian': [2, 2, 1, 2, 2, 2, 1],
        'dorian': [2, 1, 2, 2, 2, 1, 2],
        'phrygian': [1, 2, 2, 2, 1, 2, 2],
        'lydian': [2, 2, 2, 1, 2, 2, 1],
        'mixolydian': [2, 2, 1, 2, 2, 1, 2],
        'aeolian': [2, 1, 2, 2, 1, 2, 2],
        'locrian': [1, 2, 2, 1, 2, 2, 2],

        // Melodic minor modes
        'melodic minor': [2, 1, 2, 2, 2, 2, 1], // -1
        'jazz minor': [2, 1, 2, 2, 2, 2, 1], // -1
        'dorian #7': [2, 1, 2, 2, 2, 2, 1], // -1
        'phrygian #6': [1, 2, 2, 2, 2, 1, 2], // 2
        'dorian b2': [1, 2, 2, 2, 2, 1, 2], // 2
        'lydian augmented': [2, 2, 2, 2, 1, 2, 1], // -3
        'lydian #5': [2, 2, 2, 2, 1, 2, 1], // -3
        'overtone': [2, 2, 2, 1, 2, 1, 2], // 4
        'acoustic': [2, 2, 2, 1, 2, 1, 2], // 4
        'lydian dominant': [2, 2, 2, 1, 2, 1, 2], // 4
        'lydian b7': [2, 2, 2, 1, 2, 1, 2], // 4
        'mixolydian #4': [2, 2, 2, 1, 2, 1, 2], // 4
        'mixolydian #11': [2, 2, 2, 1, 2, 1, 2], // 4
        'dominant #11': [2, 2, 2, 1, 2, 1, 2], // 4
        'mixolydian b6': [2, 2, 1, 2, 1, 2, 2], // -5
        'mixolydian b13': [2, 2, 1, 2, 1, 2, 2], // -5
        'aeolian dominant': [2, 2, 1, 2, 1, 2, 2], // -5
        'aeolian major': [2, 2, 1, 2, 1, 2, 2], // -5
        'melodic major': [2, 2, 1, 2, 1, 2, 2], // -5
        'aeolian #3': [2, 2, 1, 2, 1, 2, 2], // -5
        'locrian #2': [2, 1, 2, 1, 2, 2, 2], // 6
        'half diminished': [2, 1, 2, 1, 2, 2, 2], // 6
        'locrian natural 9': [2, 1, 2, 1, 2, 2, 2], // 6
        'super locrian': [1, 2, 1, 2, 2, 2, 2], // -7
        'altered': [1, 2, 1, 2, 2, 2, 2], // -7
        'altered dominant': [1, 2, 1, 2, 2, 2, 2], // -7
        'pomeroy': [1, 2, 1, 2, 2, 2, 2], // -7
        'ravel': [1, 2, 1, 2, 2, 2, 2], // -7
        'diminished whole tone': [1, 2, 1, 2, 2, 2, 2], // -7
        'dominant whole tone': [1, 2, 1, 2, 2, 2, 2], // -7
        'locrian b4': [1, 2, 1, 2, 2, 2, 2], // -7
        'ionian #1': [1, 2, 1, 2, 2, 2, 2], // -7

        // Harmonic minor modes
        'harmonic minor': [2, 1, 2, 2, 1, 3, 1], // -1
        'aeolian #7': [2, 1, 2, 2, 1, 3, 1], // -1
        'locrian #6': [1, 2, 2, 1, 3, 1, 2], // 2
        'ionian #5': [2, 2, 1, 3, 1, 2, 1], // -3
        'dorian #4': [2, 1, 3, 1, 2, 1, 2], // 4
        'dorian #11': [2, 1, 3, 1, 2, 1, 2], // 4
        'phrygian major': [1, 3, 1, 2, 1, 2, 2], // -5
        'phrygian dominant': [1, 3, 1, 2, 1, 2, 2], // -5
        'phrygian #3': [1, 3, 1, 2, 1, 2, 2], // -5
        'lydian #2': [3, 1, 2, 1, 2, 2, 1], // 6
        'alt dominant': [1, 2, 1, 2, 2, 1, 3], // -7
        'mixolydian #1': [1, 2, 1, 2, 2, 1, 3], // -7

        // Harmonic major modes
        'harmonic major': [2, 2, 1, 2, 1, 3, 1],
        'ionian b6': [2, 2, 1, 2, 1, 3, 1],
        'dorian b5': [2, 1, 2, 1, 3, 1, 2],
        'phrygian b4': [1, 2, 1, 3, 1, 2, 2],
        'lydian b3': [2, 1, 3, 1, 2, 2, 1],
        'mixolydian b2': [1, 3, 1, 2, 2, 1, 2],
        'aeolian b1': [3, 1, 2, 2, 1, 2, 1],
        'locrian b7': [1, 2, 2, 1, 2, 1, 3],

        // Pentatonic
        'pentatonic major': [2, 2, 3, 2, 3],
        'pentatonic minor': [3, 2, 2, 3, 2],
        'pentatonic blues': [3, 2, 1, 1, 3, 2],
        'pentatonic neutral': [2, 3, 2, 3, 2],
        'blues': [3, 2, 1, 1, 3, 2],
        'minor blues': [3, 2, 1, 1, 3, 2],
        'major blues': [2, 1, 1, 3, 2, 3],

        // Diminished
        'whole': [2, 2, 2, 2, 2, 2],
        'half whole': [1, 2, 1, 2, 1, 2, 1, 2],
        'dominant diminished': [1, 2, 1, 2, 1, 2, 1, 2],
        'whole half': [2, 1, 2, 1, 2, 1, 2, 1],
        'diminished': [2, 1, 2, 1, 2, 1, 2, 1],

        // Exotic
        'algerian': [2, 1, 2, 1, 1, 1, 3, 1],
        'arabic': [2, 2, 1, 1, 2, 2, 2],
        'byzantine': [1, 3, 1, 2, 1, 3, 2],
        'chinese': [4, 2, 1, 4, 1],
        'egyptian': [2, 3, 2, 3, 2],
        'eight tone spanish': [1, 2, 1, 1, 1, 2, 2, 2],
        'enigmatic': [1, 3, 2, 2, 2, 1, 1],
        'enigmatic minor': [1, 2, 3, 1, 3, 1, 1],
        'geez': [2, 1, 2, 2, 1, 2, 2],
        'hindu': [2, 2, 1, 2, 1, 2, 2],
        'hirajoshi': [1, 4, 1, 4, 2],
        'hungarian': [2, 1, 3, 1, 1, 2, 1],
        'japanese': [1, 4, 2, 3, 2],
        'oriental': [1, 3, 1, 1, 3, 1, 2],
        'romanian minor': [2, 1, 3, 1, 2, 1, 2],
        'spanish gypsy': [1, 3, 1, 2, 1, 2, 2],
        'maqam': [1, 3, 1, 2, 1, 3, 1],

        // Jazz
        'bebop major': [2, 2, 1, 2, 1, 1, 2, 1],
        'bebop': [2, 2, 1, 2, 1, 1, 2, 1],
        'bebop minor': [2, 1, 1, 1, 2, 2, 1, 2],
        'bebop dominant': [2, 2, 1, 2, 2, 1, 1, 1],
        'bebop dorian': [2, 1, 2, 2, 2, 1, 1, 1],
        'nine tone': [2, 1, 1, 2, 1, 1, 1, 2, 1]
    };

    static get scaleNames(): string[] {
        return Object.keys(this.scales);
    }

    static sharps: Array<string> = [
        'C',
        'C#',
        'D',
        'D#',
        'E',
        'F',
        'F#',
        'G',
        'G#',
        'A',
        'A#',
        'B'
    ];

    static flats: Array<string> = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

    static alts: Array<string> = ['B#', '_', '_', '_', 'Fb', 'E#', '_', '_', '_', '_', '_', 'Cb'];

    static blackKeys: Array<string> = ['C#', 'Db', 'D#', 'Eb', 'F#', 'Gb', 'G#', 'Ab', 'A#', 'Bb'];

    static notesPerOctave: number = 12;

    static totalOctaves: number = 3;

    static get totalNotes(): number {
        return this.notesPerOctave * this.totalOctaves;
    }
}
