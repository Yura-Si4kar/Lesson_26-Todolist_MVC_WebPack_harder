import { TODOS_URL } from '../config';
import TodosCollection from '../model/TodosCollection';
import TodosView from '../view/TodosView';

export default class UsersController {
    constructor($container) {
        console.log('controller', $container);

        this._collection = new TodosCollection(TODOS_URL);
        this._view = new TodosView($container, this._collection);

        this._collection.fetchList();
    }
}