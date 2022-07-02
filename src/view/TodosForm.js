import EventEmitter from "../EventEmitter";

export default class TodosForm extends EventEmitter{
    static template = `<form class="input_block" class="form">
        <input class="input_text" type="text" name="title" placeholder="Enter the task!">
        <button class="input_btn">Click</button>        
    </form>`;

    static INPUT_SELECTOR = '.input_text';
    
    constructor() {
        super();

        this.init();
    }

    init() {
        this.$el = $(TodosForm.template);
        this.$el.on('submit', (e) => {
            e.preventDefault();

            const formData = this._getFormData();

            this.trigger('save', formData);

            this.reset();
        });

        this.$input = this.$el.find('input');
    }

    _getFormData = () => {
        const formData = {};

        this.$el
            .serializeArray()
            .forEach(({ name, value }) => (formData[name] = value));
        
        return formData;
    }

    reset() {
        this.$input.each((_, input) => {
            input.value = '';
        });
    }
}