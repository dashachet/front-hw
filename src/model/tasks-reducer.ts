import {TasksState} from "../App.tsx";
import {Task} from "../App";
import {v1} from "uuid";
import {AddTodolistAT} from "./todolist-reducer.ts";



export type AddTaskAT =  ReturnType<typeof AddTaskAC>
    // type: "ADD-TASK"
    // payload: {
    //     id: string,
    //     title: string
    //     isDone: boolean
    // }
export type ChangeTitleAT = ReturnType<typeof changeTaskTitleAC>
export type ChangeTaskAT = ReturnType<typeof changeTaskStatusAC>
export type RemoveTaskAT =  ReturnType<typeof RemoveTaskAC>
type ActionType = AddTaskAT | RemoveTaskAT | ChangeTaskAT | ChangeTitleAT | AddTodolistAT

export const tasksReducer = (tasks: TasksState, action: ActionType): TasksState => {
    switch (action.type) {
        case 'ADD-TASK':
            const {todolistId, title} = action.payload
            const newTask: Task = {
                id: v1(),
                title: title,
                isDone: false
                }

           return {...tasks, [todolistId]: [newTask, ...tasks[todolistId] ] }
        case 'REMOVE-TASK':
            const filteredTasks= tasks[action.payload.todolistId].filter(t=> t.id !== action.payload.id)
        // return  {...tasks, [action.payload.todolistId]: tasks[action.payload.todolistId].filter(task => task.id !== action.payload.id)}
            return {...tasks, [action.payload.todolistId]: filteredTasks}
        case 'CHANGE-TASK':

            return {...tasks, [action.payload.todolistId]: tasks[action.payload.todolistId].map(task => task.id == action.payload.taskId ? {...task, isDone: action.payload.isDone} : task)}
        case 'CHANGE-TITLE':
            return {...tasks, [action.payload.todolistId]: tasks[action.payload.todolistId].map(task => task.id === action.payload.taskId ? {...task, title: action.payload.title} : task)}
        case 'ADD-TODOLIST':
            return {...tasks, [action.payload.todolistId]: [] }

        default:
            return tasks
    }
}

export const AddTaskAC =(todolistId:string, title: string)=> {
    return ({
        type: "ADD-TASK",
        payload: { todolistId, title}
    }) as const

}
export const RemoveTaskAC = (id: string, todolistId: string)=> {
    return ({
        type: "REMOVE-TASK",
        payload: { id:id
            , todolistId: todolistId}
    }) as const
}

export const changeTaskStatusAC=(payload: {taskId: string, isDone: boolean, todolistId:string})=> {
    return ({
        type: "CHANGE-TASK",
        payload
    } as const)

}

export const  changeTaskTitleAC = (payload: {taskId: string, title: string, todolistId: string})=> {
    return ({
        type: 'CHANGE-TITLE',
        payload
}as const) }