import EventEmitter from "../EventEmitter";

const urlsMap = new WeakMap();

export default class TodoModel extends EventEmitter{
    get url() {
        return urlsMap.get(this);
    }

    constructor(baseUrl, data) {
        super();

        urlsMap.set(this, baseUrl + data.id);

        this.set(data);
    }

    delete() {
        return fetch(this.url, {
            method: 'DELETE',
        }).then(() => {
            this.trigger('delete');
        });
    }

    toggle() {
        this.update({
            isDone: !this.isDone,
        });
    }

    update(data) {
        this.set(data);
        this.save();
    }

    save() {
        return fetch(this._url, {
            method: 'PUT',
            body: JSON.stringify(this),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(() => {
            this.trigger('update');
        });
    }

    set(data) {
        Object.assign(this, data);
    }
}