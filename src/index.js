import { pipeFromArray } from "./util/pipe.js"
class Subscription {
    constructor() {
        this._teardowns = [];
    }
    unsubscribe() {
        this._teardowns.forEach(teardown => {
            typeof teardown === 'function' ? teardown() : teardown.unsubscribe();
        });
    }
    add(teardown) {
        teardown && this._teardowns.push(teardown);
    }
}

class Subscriber extends Subscription{
    constructor(observer) {
        super();
        this.observer = observer;
        this.closed = false;
    }
    next(val) {
        this.observer.next && !this.closed && this.observer.next(val);
    }
    error(val) {
        this.closed = true;
        this.observer.error && this.observer.error(val);
    }
    complete() {
        this.closed = true;
        this.observer.complete && this.observer.complete();
        this.unsubscribe && this.unsubscribe();
    }
}

export class Observable {
    constructor(subscribe) {
        this._subscribe = subscribe;
    }
    subscribe(observer) {
        const subscriber = new Subscriber(observer);
        subscriber.add(this._subscribe(subscriber));
        return subscriber;
    }
    pipe(...operations) {
        return pipeFromArray(operations)(this);
    }
}