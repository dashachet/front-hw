import {FilterValues, Todolist} from "../App.tsx";
import {v1} from "uuid";


 export type RemoveTodolistActionType = {
    type: "REMOVE-TODOLIST"
    payload: {
    id: string
    }
}

export type AddTodolistAT = ReturnType<typeof AddTodolistAC>

export type ChangeTitleTodolistAT = {
    type: 'CHANGE-TITLE-TODOLIST'
    payload: {
        id: string
        title: string
    }
}

export type ChangeFilterTodolistAT = ReturnType<typeof ChangeTodolistFilterAC>

type ActionType = RemoveTodolistActionType | AddTodolistAT | ChangeTitleTodolistAT | ChangeFilterTodolistAT

export const todolistReducer = (todolists: Array<Todolist>, action: ActionType): Array<Todolist> => {


   switch (action.type) {
       case "REMOVE-TODOLIST":
          return todolists.filter(todolist => todolist.id !== action.payload.id)
       case "ADD-TODOLIST":
            const newTodolist: Todolist =  {
                id: action.payload.todolistId,
           title: action.payload.title,
           filter: 'all'}
           return [ ...todolists, newTodolist]
       case 'CHANGE-TITLE-TODOLIST':
           return todolists.map(todolist => todolist.id === action.payload.id ? {...todolist, title: action.payload.title} : todolist)
       case 'CHANGE-FILTER-TODOLIST':
          return todolists.map(todolist => todolist.id === action.payload.id? {...todolist, filter: action.payload.filter} : todolist)
        default:
           return todolists
   }
}

export const RemoveTodolistAC=(todolistId: string): RemoveTodolistActionType=> {
    return(
        {type: 'REMOVE-TODOLIST',
    payload: {
        id: todolistId,
    }})
}

export const AddTodolistAC = (title: string) => {
    return ({
        type: 'ADD-TODOLIST',
        payload: {
            todolistId: v1(),
            title
        }
    } as const)
}


export const ChangeTodoistTitleAC = (id: string, title: string): ChangeTitleTodolistAT => {
    return ({  type: 'CHANGE-TITLE-TODOLIST',
        payload: {
            id,
            title
        }

    })
}

export const ChangeTodolistFilterAC= (id: string, filter: FilterValues) => {
    return ({ type: 'CHANGE-FILTER-TODOLIST',
        payload: {
        id,
            filter
    }

    } as const)
}