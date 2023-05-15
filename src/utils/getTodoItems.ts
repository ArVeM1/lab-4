import {TodoItem} from "../store/slices/todo";

export const getTodoItems = () => {
    const data = localStorage.getItem('todos');
    const todo = data ? JSON.parse(data) : [];

    return {
        todo: todo as TodoItem[],
        searchValue: '',
        count: todo.length,
        delCount: 0,
    };
}