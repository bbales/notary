export default class UIModeSelector {
    el: HTMLDivElement;
    modeButtons: HTMLDivElement[] = [];
    mode: string = 'scale';

    onchange: Function = (mode: string) => {};

    static SCALE = 'scale';
    static CHORD = 'chord';

    static modes: string[] = ['scale', 'chord'];

    constructor() {
        this.el = document.createElement('div');

        UIModeSelector.modes.forEach((mode: string) => {
            const button = document.createElement('div');
            button.setAttribute('data-mode', mode);
            button.addEventListener('mousedown', e => this.modeSelect(mode));
            this.modeButtons.push(button);
            this.el.append(button);
        });

        this.render();
    }

    render(): UIModeSelector {
        const { el, modeButtons, mode } = this;

        el.className = 'cursor-pointer flex items-end justify-center ';

        modeButtons.forEach(button => {
            button.innerHTML = button.getAttribute('data-mode') || '';
            button.className = 'p-4 ';
            button.className +=
                mode === button.getAttribute('data-mode') ? 'bg-gray-200' : 'bg-gray-100';
        });

        return this;
    }

    modeSelect(mode: string): UIModeSelector {
        this.mode = mode;
        this.onchange(mode);
        return this.render();
    }
}
