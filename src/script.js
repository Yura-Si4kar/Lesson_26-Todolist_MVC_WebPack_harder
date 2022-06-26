import TodosController from './controller/TodoController';
import './css/style.css';

$(() => {
    new TodosController($('.container'));
});