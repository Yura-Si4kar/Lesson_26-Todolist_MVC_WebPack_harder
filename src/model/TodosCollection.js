import EventEmitter from "../EventEmitter";
import TodoModel from "./TodoModel";

export default class TodosCollection extends EventEmitter{
    constructor(TODOS_URL) {
        super();

        this.list = [];
        this._url = TODOS_URL;
    }

    fetchList() {
        return fetch(this._url)
            .then((res) => res.json())
            .then((data) => {
                this.list = data.map(this._wrapModel);
                this.trigger('update', this.list);
            });
    }

    
    addTodo(newTodo) {
        return fetch(this._url, {
            method: 'POST',
            body: JSON.stringify(newTodo),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((res) => res.json())
        .then((data) => {
            const model = this._wrapModel(data);
            this.list.push(model);
            this.trigger('add', model);
        });
    }
    
    get(id) {
        return this.list.find((model) => model.id === id);
    }
    
    _wrapModel = (data) => {
        const model = new TodoModel(this._url, data);
        model.on(
            'delete',
            () => (this.list = this.list.filter(m => m !== model)),
        );
        
        model.on(
            'update',
            () => (this.list = this.trigger('modelUpdate', model)),
        );

        return model;
    }
}