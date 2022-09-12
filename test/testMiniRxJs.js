import { Observable } from "../src/index.js";
import { map } from "../src/operators/map.js";

const source = new Observable((ob) => {
    let i = 0;
    const timer = setInterval(() => {
        ob.next(++i);
        if (i === 2) ob.error(i);
    }, 1000);

    return function unsubscribe() {
        clearInterval(timer);
    }
});

const subscriber = source.pipe(
    map(i => i++),
    map(i => i * 10),
).subscribe({
    next: (i) => console.log('i: ', i),
    error: (err) => console.error('err: ', err),
    complete: () => console.log('complete...')
});

setTimeout(() => {
    subscriber.unsubscribe();
}, 3200);