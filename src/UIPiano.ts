import Lib from './Lib.ts';
import Parser from './Parser.ts';
import UIKey from './UIKey.ts';
import { range } from './utils.ts';

export default class UIPiano {
    el: HTMLDivElement = document.createElement('div');
    keys: UIKey[];

    startNoteIndex: number;

    _title: string = '';

    onKeyHover: Function = (key: UIKey) => {};
    onKeyDown: Function = (key: UIKey) => {};
    onKeyUp: Function = (key: UIKey) => {};

    constructor(startNoteIndex = 0, numKeys = Lib.notesPerOctave * 3) {
        this.startNoteIndex = startNoteIndex;

        this.keys = range(numKeys)
            .map((n: number) => Parser.indexToNoteString(n + startNoteIndex + 1))
            .map((noteStr: string, i: number) => {
                const key = new UIKey(
                    noteStr,
                    Math.floor((i + startNoteIndex) / Lib.notesPerOctave)
                );
                key.mouseupHandler = this.keyEvent.bind(this);
                key.mousedownHandler = this.keyEvent.bind(this);
                key.mouseoverHandler = this.keyEvent.bind(this);
                return key;
            });

        this.render();

        window.addEventListener('midi', e => {
            this.midiEvent((e as CustomEvent).detail.action, (e as CustomEvent).detail.note);
        });
    }

    render(): UIPiano {
        this.el.remove();
        this.el = document.createElement('div');
        this.el.className = 'flex flex-row justify-center relative ';

        this.el.append(...this.keys.map((k: UIKey) => k.el));

        if (this._title) {
            const titleEl = document.createElement('div');
            titleEl.className = 'absolute -bottom-10';
            titleEl.innerHTML = this._title;
            this.el.append(titleEl);
        }

        return this;
    }

    title(titleStr: string) {
        this._title = titleStr;
        return this.render();
    }

    small() {
        this.keys.forEach(key => key.small());
        return this.render();
    }

    setNotes(noteIndexes: number[], fill: boolean = false): UIPiano {
        this.keys.forEach((key: UIKey, i: number) => {
            const shouldHightlight = fill
                ? noteIndexes
                      .map(Parser.noteIndexToFirstOctave)
                      .includes(Parser.noteIndexToFirstOctave(i + this.startNoteIndex + 1))
                : noteIndexes.includes(i + this.startNoteIndex + 1);
            if (shouldHightlight) {
                const isRoot =
                    (i + this.startNoteIndex + 1) % Lib.notesPerOctave ===
                    noteIndexes[0] % Lib.notesPerOctave;

                key.highlight(isRoot);
            } else {
                key.unhighlight();
            }
        });

        return this;
    }

    keyEvent(e: Event, key: UIKey) {
        if (e.type === 'mousedown') this.onKeyDown(key);
    }

    midiEvent(action: string, note: number) {
        if (action === 'on') {
            this.keys.find(key => key.MIDINote === note)?.press();
        } else if (action === 'off') {
            this.keys.find(key => key.MIDINote === note)?.unpress();
        }
    }
}
