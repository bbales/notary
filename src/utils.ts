export function range(size: number): Array<number> {
    return [...Array(size).keys()];
}

export function repeat(times: number, fn: Function): void {
    for (var i = 0; i < times; i++) fn(i);
}

export function shuffle(a: any[]) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

export function isUndefined(maybeUndefined: any): maybeUndefined is undefined {
    return typeof maybeUndefined === 'undefined';
}

export function isNull(maybeNull: any): maybeNull is null {
    return maybeNull === null;
}

export function isString(maybeString: unknown): maybeString is string {
    return typeof maybeString === 'string';
}

export function uid(len = 5): string {
    return Math.random().toString(36).slice(-len);
}

export function throttle(fn: Function, limit: number = 200): Function {
    var waiting = false;
    return function () {
        if (!waiting) {
            waiting = true;
            setTimeout(() => (waiting = false), limit);
            return fn(arguments);
        }
        return false;
    };
}
