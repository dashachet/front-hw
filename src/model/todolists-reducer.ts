import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

let todolistID1 = v1()
let todolistID2 = v1()

const initialState: TodolistType[] = [
    {id: todolistID1, title: 'What to learn', filter: 'all'},
    {id: todolistID2, title: 'What to buy', filter: 'all'},
]

type ActionsType = {
    type: string
    payload: any
}


export const todolistsReducer = (state = initialState, action: ActionsTypes): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(el => el.id !== action.payload.id)
        }
        case "ADD-TODOLIST": {
            const todolistId = v1()
            const newTodolist: TodolistType = {id: todolistId, title: action.payload.title, filter: 'all'}
            return [...state, newTodolist]
        }
        case "UPDATE-TODOLIST":{
            const {id,title}=action.payload
            return state.map(tl => tl.id === id ? {...tl, title} : tl)
        }
        case "CHANGE-TODOLIST-FILTER":{
            const {id,filter}=action.payload
            return  state.map(tl => {return tl.id === id ? {...tl, filter} : tl})
        }

        default:
            return state
    }
}

type ActionsTypes = RemoveTodolistACType | AddTodolistACType | UpdateTodolistACType | changeFilterACType
type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>

export const removeTodolistAC = (id: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {id},
    } as const
}

type AddTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {title}
    } as const
}

type UpdateTodolistACType = ReturnType<typeof updateTodolistAC>
export  const updateTodolistAC=(id: string, title: string)=>{
    return{
        type: 'UPDATE-TODOLIST',
        payload: {id,title}
    }as const
}

type changeFilterACType = ReturnType<typeof changeFilterAC>
export const changeFilterAC=( id: string,filter: FilterValuesType)=>{
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            id, filter
        },
    }as const
}