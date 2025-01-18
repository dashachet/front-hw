import {TasksState} from "../App.tsx";
import {Task} from "../App";
import {v1} from "uuid";


export type AddTaskAT =  ReturnType<typeof AddTaskAC>
    // type: "ADD-TASK"
    // payload: {
    //     id: string,
    //     title: string
    //     isDone: boolean
    // }

type ActionType = AddTaskAT

export const tasksReducer = (tasks: TasksState, action: ActionType): TasksState => {
    switch (action.type) {
        case 'ADD-TASK':
            const newTask: Task = {
                id: v1(),
                title: action.payload.title,
                isDone: false
                }

           return {...tasks, [action.payload.todolistId]: [newTask, ...tasks[action.payload.todolistId] ] }
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