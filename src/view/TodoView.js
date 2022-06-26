class TodosView {
    constructor($container, config) {
        this._todosListView = new TodosListView(config);

        this._todoFormView = new TodoFormView(config);

        $container.append(this._todosListView.$el);
        $container.append(this._todoFormView.$el);
    }

    renderList(data) {
        this._todosListView.renderList(data);
    }
}