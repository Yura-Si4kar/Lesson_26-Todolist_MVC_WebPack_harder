import EventEmitter from "../EventEmitter";
import TodoRow from "./TodoRow";

export default class TodosList extends EventEmitter{
    static template = `<ol class="input_blocks"></ol>`;

    constructor(collection) {
        super();
        this._collection = collection;

        this._collection.on('update', this.renderList);
        this._collection.on('add', this.renderTodo);
        this.init();
    }

    init() {
        this.$el = $(TodosList.template);

    }

    renderList = (list) => {
        this.$el.append(list.map((model) => this._wrapRow(model).$el));
    }

    renderTodo = (model) => {
        this.$el.append(this._wrapRow(model).$el);
    }

    _wrapRow(model) {
        const rowView = new TodoRow(model);
        return rowView;
    }
}