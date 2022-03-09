import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { toast } from "react-toastify"
const api = "http://localhost:8000/todos"

const initialState = {
    todos: [],
    edit: ""
}

export const postEdit = createAsyncThunk(
    "todoSlice/edit",
    async (todo) => {
        try {
            let res = await axios.patch(`${api}/${todo.id}`, todo)
            toast.success("todo has been successfully updated")
            return res.data
        }
        catch (e) {
            console.error(e)
        }
    }
)

export const getTodoForEdit = createAsyncThunk(
    "todoSlice/getForEdit",
    async (id) => {
        const res = await axios.get(`${api}/${id}`)
        return res.data
    }
)

export const createTodo = createAsyncThunk(
    "todoSlice/post",
    async (todo) => {
        try {
            let res = await axios.post(api, todo)
            toast.success("new todo created success")   
            return res.data
        } catch (e) {
            toast.error("an unexpected error occurred")  
        }
    }
)

export const getTodo = createAsyncThunk(
    'todoSlice/get',
    async () => {
        const result = await axios.get(api)
        return result.data
    }
)

export const deleteTodo = createAsyncThunk(
    'todoSlice/delete',
    async (id) => {
        await axios.delete(`${api}/${id}`)
        toast.info("todo has been deleted")   
        return id
    }
)

export const todoSlice = createSlice({
    name: 'todoSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getTodo.fulfilled, (state, action) => {
            state.todos = action.payload
        })
        builder.addCase(getTodoForEdit.fulfilled, (state, action) => {
            state.edit = action.payload
        })
        builder.addCase(createTodo.fulfilled, (state, action) => {
            state.todos.push(action.payload)
        })
        builder.addCase(deleteTodo.fulfilled, (state, action) => {
            state.todos = state.todos.filter(item => item.id !== action.payload)
        })
        builder.addCase(postEdit.fulfilled, (state, action) => {
            let res = state.todos.map(item => {
                if (item.id === action.payload.id) {
                    return action.payload
                }
                return item
            })
            state.todos = res

        })
    }
})

export default todoSlice.reducer