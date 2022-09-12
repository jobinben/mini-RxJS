import { Observable } from "../index.js";

export function map(project) {
    return (ob) => new Observable((subscriber) => {
        const subscription = ob.subscribe({
            next(val) {
                return subscriber.next(project(val));
            },
            error(err) {
                subscriber.error(err);
            },
            complete() {
                subscriber.complete();
            }
        });
        return subscription;
    });
}