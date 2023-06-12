import {addTodo, deleteTodo, editTodo, setSearch, TodoItem, todoReducer, toggleCheck} from "../store/slices/todo";

describe('todo', () => {
    test('добавляет задачу в состояние и увеличивает счетчик', () => {
        const initialState = {
            todo: [],
            searchValue: '',
            count: 0,
            delCount: 0,
        };
        const newTodo = {
            id: 1,
            title: 'Новая задача',
            description: '',
            check: false,
        };
        const action = addTodo(newTodo);
        const state = todoReducer(initialState, action);

        expect(state.todo).toContain(newTodo);
        expect(state.count).toBe(1);
    });
    test('удаляет задачу из состояния и увеличивает счетчик удаленных', () => {
        const initialState = {
            todo: [
                { id: 1, title: 'Задача 1', description: '', check: false },
                { id: 2, title: 'Задача 2', description: '', check: true },
            ],
            count: 2,
            delCount: 0,
            searchValue: '',
        };

        const action = deleteTodo(1);
        const state = todoReducer(initialState, action);

        expect(state.todo).toHaveLength(1);
        expect(state.todo).not.toContainEqual({ id: 1, title: 'Задача 1', check: false });
        expect(state.delCount).toBe(1);
    });
    test('изменяет задачу в состоянии', () => {
        const initialState = {
            todo: [
                { id: 1, title: 'Задача 1', description: '', check: false },
                { id: 2, title: 'Задача 2', description: '', check: true },
            ],
            count: 2,
            delCount: 0,
            searchValue: '',
        };

        const updatedTodo = { id: 1, title: 'Измененная задача', description: '', check: true };

        const action = editTodo(updatedTodo);
        const state = todoReducer(initialState, action);

        expect(state.todo).toContainEqual(updatedTodo);
    });
    test('переключает флаг "check" для задачи', () => {
        const initialState = {
            todo: [
                { id: 1, title: 'Задача 1', description: '', check: false },
                { id: 2, title: 'Задача 2', description: '', check: true },
            ],
            count: 2,
            delCount: 0,
            searchValue: '',
        };

        const action = toggleCheck({ id: 1, title: 'Задача 1', description: '', check: false });
        const state = todoReducer(initialState, action);

        const updatedTodo = state.todo.find((item) => item.id === 1);
        expect(updatedTodo?.check).toBe(true);
    });
    test('устанавливает значение поиска', () => {
        const initialState = {
            todo: [],
            count: 2,
            delCount: 0,
            searchValue: '',
        };

        const searchValue = 'задача';
        const action = setSearch(searchValue);
        const state = todoReducer(initialState, action);

        expect(state.searchValue).toBe(searchValue);
    });
})