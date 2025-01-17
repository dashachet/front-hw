import {FilterValues, Todolist} from "../App.tsx";

type RemoveTodolistActionType = {
    type: "REMOVE-TODOLIST"
    payload: {
    id: string
    }
}

export type AddTodolistAT = {
    type: "ADD-TODOLIST"
    payload: {
        id: string,
        title: string
    }
}

export type ChangeTitleTodolistAT = {
    type: 'CHANGE-TITLE-TODOLIST'
    payload: {
        id: string
        title: string
    }
}

export type ChangeFilterTodolistAT = {
    type: 'CHANGE-FILTER-TODOLIST'
    payload: {
        id: string
        filter: FilterValues
    },
}

type ActionType = RemoveTodolistActionType | AddTodolistAT | ChangeTitleTodolistAT | ChangeFilterTodolistAT

export const todolistReducer = (todolists: Array<Todolist>, action: ActionType): Array<Todolist> => {


   switch (action.type) {
       case "REMOVE-TODOLIST":
          return todolists.filter(todolist => todolist.id !== action.payload.id)
       case "ADD-TODOLIST":
            const newTodolist: Todolist =  {
                id: action.payload.id,
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