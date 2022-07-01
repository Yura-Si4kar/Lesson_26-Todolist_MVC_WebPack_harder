import TodoRow from "./TodoRow";

export default class TodosList {
    static template = `<ol class="input_blocks"></ol>`;

    constructor(collection) {
        this._collection = collection;
        this._collection.on('update', this.renderList)
        this._collection.on('add', this.renderTodo)
        this.init();
    }

    init() {
        this.$el = $(TodosList.template);

    }

    renderList = (list) => {
        this.$el.append(
            list.map((model) => new TodoRow(model).$el),
        );
    }

    renderTodo = (model) => {
        this.$el.append(new TodoRow(model).$el);
    }
}