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

    // toggleTodo(todoId) {
    //     const todoItem = this.list.find(({ id }) => id == todoId);

    //     if (!todoItem) {
    //         return console.error('Id not found', todoId);
    //     }

    //     todoItem.isDone = !todoItem.isDone;

    //     return fetch(this._url + todoId, {
    //         method: 'PUT',
    //         body: JSON.stringify(todoItem),
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //     });
    // }

    removeTodo(todoId) {
        this.list = this.list.filter(({ id }) => id != todoId);

        return fetch(this._url + todoId, {
            method: 'DELETE',
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
                this.list.push(data);
                this.trigger('add', data);
            });
    }

    _wrapModel = (data) => {
        const model = new TodoModel(this._url, data);
        model.on(
            'delete',
            () => (this.list = this.list.filter(m => m !== model)),
        );

        return model;
    }
}