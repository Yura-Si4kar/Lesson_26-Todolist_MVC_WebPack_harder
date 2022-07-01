import EventEmitter from "../EventEmitter";

const urlsMap = new WeakMap();

export default class TodoModel extends EventEmitter{
    get url() {
        return urlsMap.get(this);
    }


    constructor(baseUrl, data) {
        super();

        urlsMap.set(this, baseUrl + data.id);

        Object.assign(this, data);
    }

    delete() {
        return fetch(this.url, {
            method: 'DELETE',
        }).then(() => {
            this.trigger('delete');
        });
    }
}