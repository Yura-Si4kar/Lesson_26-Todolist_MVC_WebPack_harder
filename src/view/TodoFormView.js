class TodoFormView {
    static FORM_TEMPLATE = `<form class="input_block" class="form">
        <input class="input_text" type="text" name="name" placeholder="Enter the task!">
        <button class="input_btn" type="submit">Click</button>        
    </form>`;

    static TASK_NAME_SELECTOR = '.input_text';

    constructor(config) {
        this._config = config;

        this.$el = $(TodoFormView.FORM_TEMPLATE).on('submit', (e) =>
            this.onFormSubmit(e),
        );
    }

    onFormSubmit(e) {
        e.preventDefault();

        const taskName = this.$el.find(TodoFormView.TASK_NAME_SELECTOR).val();

        this._config.onSave && this._config.onSave({ title: taskName });

        this.$el.trigger('reset');
    }
}