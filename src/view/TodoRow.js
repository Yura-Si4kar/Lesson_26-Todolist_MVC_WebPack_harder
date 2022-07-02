import { interpolate } from '../../../useful software/useful_software';
import EventEmitter from '../EventEmitter';

export default class TodoRow extends EventEmitter{
    static template = `<div></div>`;
    static todoTemplate = `<li class="list_elements {{doneClass}}" data-id='{{id}}'>
        {{title}}
        <span class="delete-btn">&#10006;</span>
    </li>`;
    static TASK_DONE_CLASS = 'done';

    static deleteBtnClass = '.delete-btn';
    static taskSelector = '.list_elements'    

    constructor(model) {
        super();

        this._model = model;
        this._model.on('delete', this.deleteRow);
        this._model.on('update', this.updateRow);

        this.init();
    }

    init() {
        this.$el = $(TodoRow.template);
        this.renderRow();
        this.$el.on('click', TodoRow.deleteBtnClass, (e) => {
            this._model.delete();
            e.stopPropagation();
    });
        this.$el.on('click', TodoRow.taskSelector, () =>
            this.trigger('edit', this._model.toggle()),
        );
    }

    renderRow() {
        this.$el.empty();
        this.$el.html(
            interpolate(TodoRow.todoTemplate, {
                ...this._model,
                doneClass: this._model.isDone ? 'done' : '',
            }),
        );
    }

    deleteRow = () => {
        this.$el.remove();
    }

    updateRow = () => {
        this.renderRow();
    };
}