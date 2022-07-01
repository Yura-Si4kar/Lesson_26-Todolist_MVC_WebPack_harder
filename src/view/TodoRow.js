import { interpolate } from '../../../useful software/useful_software';

export default class TodoRow {
    static template = `<li class="list_elements {{doneClass}}" data-id='{{id}}'>
        {{title}}
        <span class="delete-btn">&#10006;</span>
    </li>`;
    static TASK_DONE_CLASS = 'done';

    static deleteBtnClass = '.delete-btn';
    static taskSelector = '.list_elements'    

    static creatTodosList (todo) {
        return $(TodoRow.template
            .replace('{{id}}', todo.id)
            .replace('{{title}}', todo.title)
            .replace(
                '{{doneClass}}',
                todo.isDone ? TodoRow.TASK_DONE_CLASS : '',
            ),
        );
    }

    constructor(model) {
        this._model = model;
        console.log(this._model);
        this._model.on('delete', this.deleteRow);

        this.init();
    }

    init() {
        const html = interpolate(TodoRow.template, this._model);
        this.$el = $(html);
        this.$el.on('click', TodoRow.deleteBtnClass, () =>
            this._model.delete(),
        );
        this.$el.on('click', TodoRow.taskSelector, () =>
            this.trigger('edit', this._model),
        );
    }

    deleteRow = () => {
        this.$el.remove();
    }
}