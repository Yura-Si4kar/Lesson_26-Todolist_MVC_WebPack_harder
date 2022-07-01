import TodosForm from "./TodosForm";
import TodosList from "./TodosList";

export default class TodosView {
    static template = `<div class="blocks_position"></div>`;

    constructor($container, collection) {
        this._collection = collection;
        this.init();
        this.$el.appendTo($container);
        
        this._$listview = new TodosList(collection);
        this.$el.append(this._$listview.$el);

        this._$formview = new TodosForm();
        this.$el.append(this._$formview.$el);

        this._$formview.on('save', this.saveData)
    }

    init() {
        this.$el = $(TodosView.template);

    }

    saveData = (data) => {
        this._collection.addTodo(data);
    }
}