const subscribersMap = new WeakMap();

export default class EventEmitter {
    get subscribers() {
        return subscribersMap.get(this);
    }

    constructor() {
        subscribersMap.set(this, {});
    }

    on(eventName, cb) {
        this.subscribers[eventName] = this.subscribers[eventName] || [];
        this.subscribers[eventName].push(cb);
    }

    off(eventName, cb) {
        const callbacks = this.subscribers[eventName];
        
        this.subscribers[eventName] = callbacks.filter((c) => c !== cb);
    }

    trigger(eventName, payload) {
        const callbacks = this.subscribers[eventName];

        callbacks?.forEach((cb) => cb(payload));
    }
}