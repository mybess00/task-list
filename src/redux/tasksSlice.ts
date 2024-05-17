import { createSlice, PayloadAction  } from "@reduxjs/toolkit";
import { v4 as genId } from 'uuid';

export const STATE_NAME = "tasks"

export interface TaskInterface {
    id: string,
    title: string,
    description: string,
    isDone: boolean,
}

const initialState : TaskInterface[] = [
    {
        id: genId(),
        title: "My first task",
        description: "This is my first task.",
        isDone: false
    } 
]

export const tasksSlice = createSlice({
    name: STATE_NAME,
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<{title: string, description:string}> ) => {
            const { title, description } = action.payload
            state.push({
                id: genId(),
                title,
                description,
                isDone: false
            })
        },
        deleteTask: (state, action: PayloadAction<{id: string}>) => {
            const { id } = action.payload
            const newState = state.filter((element) => element.id !== id)
            return newState
        },
        editTask: (state, action: PayloadAction<{ id: string, title: string, description:string}>) => {
            const { id, title, description } = action.payload
            const index = state.findIndex((el) => el.id === id)
            state[index] = {
                ...state[index],
                title,
                description,
            }
        },
        toggleDone: (state, action: PayloadAction<{id: string}>) => {
            const { id } = action.payload
            const index = state.findIndex((el) => el.id === id)
            state[index] = {
                ...state[index],
                isDone: !state[index].isDone
            }
        }
    }
})

export const { addTask, deleteTask, editTask, toggleDone } = tasksSlice.actions
export default tasksSlice.reducer