export function pipeFromArray(fns) {
    if (fns.length === 0) {
        return identity;
    }
    if (fns.length === 1) {
        return fns[0];
    }
    return function piped(input) {
        return fns.reduce((pre, fn) => fn(pre), input);
    }
}

export function identity(x) {
    return x;
}