import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getTodoItems} from "../../utils/getTodoItems";

export type TodoItem = {
    id: number;
    title: string;
    description: string;
    check: boolean
}

export interface todoSliceState {
    todo: TodoItem[];
    searchValue: string;
    delCount: number;
    count: number;
}

const initialState: todoSliceState = getTodoItems();

const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<TodoItem>) => {
            state.todo.push(action.payload);
            state.count++;
        },
        deleteTodo: (state, action: PayloadAction<number>) => {
            state.todo = state.todo.filter(obj =>  obj.id !== action.payload);
            state.delCount++;
        },
        editTodo: (state, action: PayloadAction<TodoItem>) => {
            state.todo = state.todo.map(obj => {
                if (obj.id === action.payload.id) {
                    return action.payload
                }
                return obj;
            })
            localStorage.removeItem(action.payload.id.toString());
            localStorage.setItem(action.payload.id.toString(), JSON.stringify(action.payload))
        },
        toggleCheck: (state, action: PayloadAction<TodoItem>) => {
            const item = state.todo.find(item => action.payload.id === item.id)
            item!.check = !item!.check
        },
        setSearch: (state, action: PayloadAction<string>) => {
            state.searchValue = action.payload;
        },
    },
});


export const {addTodo,
    deleteTodo,
    toggleCheck,
    setSearch,
    editTodo
} = todoSlice.actions;
export const todoReducer = todoSlice.reducer;