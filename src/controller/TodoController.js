class TodosController {
    constructor($container) {
        this._view = new TodosView($container, {
            onToggle: (id) => this.toggleTodo(id),
            onDelete: (id) => this.removeTodo(id),
            onSave: (newTodo) => this.createTodo(newTodo),
        });

        this._todosList = new TodosCollection();
        this._todosList
            .fetchList()
            .then(() => this._view.renderList(this._todosList.list));
    }

    toggleTodo(id) {
        this._todosList.toggleTodo(id);
        this._view.renderList(this._todosList.list);
    }

    removeTodo(id) {
        this._todosList.removeTodo(id);
        this._view.renderList(this._todosList.list);
    }

    createTodo(newTodo) {
        this._todosList
            .createTodo(newTodo)
            .then(() => this._view.renderList(this._todosList.list));
    }
}