import Lib from './Lib.ts';
import Parser from './Parser.ts';

const px = p => `${p}px`;

const BL = {
    W: 48,
    H: 200
};

const WH = {
    W: 80,
    H: 300
};

export default class UIKey {
    el: HTMLDivElement;
    noteStr: string;
    octave: number;
    pressed: boolean = false;
    highlighted: boolean = false;
    root: boolean = false;

    isSmall: boolean = false;

    mousedownHandler: Function = (e: Event, key: UIKey) => {};
    mouseupHandler: Function = (e: Event, key: UIKey) => {};
    mouseoverHandler: Function = (e: Event, key: UIKey) => {};

    constructor(noteStr: string, octave: number) {
        this.noteStr = noteStr;
        this.octave = octave;
        this.el = document.createElement('div');
        this.el.addEventListener('mousedown', e => this.mousedownHandler(e, this));
        this.el.addEventListener('mouseup', e => this.mouseupHandler(e, this));
        this.el.addEventListener('mouseover', e => this.mouseoverHandler(e, this));

        this.el.id = `o${this.octave}n${this.noteIndex}`;

        this.render();
    }

    get isBlack(): boolean {
        return Lib.blackKeys.includes(this.noteStr);
    }

    get noteIndex() {
        const idx = Parser.noteStringToIndex(this.noteStr);
        return idx === null ? 0 : idx;
    }

    get MIDINote(): number {
        return 60 + this.octave * 12 + this.noteIndex - 1;
    }

    render(): UIKey {
        const { el, isBlack, isSmall, highlighted, pressed, root, noteStr } = this;

        el.className = 'cursor-pointer flex items-end justify-center rounded-b ';
        el.innerHTML = `<div class="flex rounded-full ${root ? 'bg-white text-black' : ''} ${
            isSmall ? 'text-sm w-5 h-5' : 'w-8 h-8'
        } justify-center items-center bg-opacity-90">${noteStr}</div>`;

        if (isBlack) {
            const width = isSmall ? BL.W * 0.5 : BL.W;
            const height = isSmall ? BL.H * 0.5 : BL.H;

            el.className += 'z-10 text-white ';
            el.className += isSmall
                ? 'border-b-4 border-r-2 border-l-2 pb-1 '
                : 'border-b-8 border-r-4 border-l-4 pb-2 ';

            if (pressed) {
                el.className += 'bg-gray-800 border-purple-700';
            } else if (highlighted) {
                el.className += 'bg-gray-600 border-blue-400';
            } else {
                el.className += 'bg-black border-gray-700';
            }

            el.style.width = px(width);
            el.style.height = px(height);
            el.style.marginLeft = px(-width / 2);
            el.style.marginRight = px(-width / 2);
        } else {
            const width = isSmall ? WH.W * 0.5 : WH.W;
            const height = isSmall ? WH.H * 0.5 : WH.H;

            el.className += 'border-gray-500 text-black ';
            el.className += isSmall ? 'border-b border-r pb-2 ' : 'border-b border-r-2 pb-4 ';

            if (pressed) {
                el.className += 'bg-purple-400';
            } else if (highlighted) {
                el.className += 'bg-blue-200';
            } else {
                el.className += 'bg-white';
            }

            el.style.width = px(width);
            el.style.height = px(height);
        }

        return this;
    }

    small() {
        this.isSmall = true;
        this.render();
    }

    highlight(root: boolean = false): UIKey {
        this.highlighted = true;
        this.root = root;
        return this.render();
    }

    unhighlight(): UIKey {
        this.root = false;
        this.highlighted = false;
        return this.render();
    }

    press(root: boolean = false): UIKey {
        this.pressed = true;
        this.root = root;
        return this.render();
    }

    unpress(): UIKey {
        this.root = false;
        this.pressed = false;
        return this.render();
    }
}
