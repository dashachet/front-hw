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

export type RemoveTaskAT =  ReturnType<typeof RemoveTaskAC>
type ActionType = AddTaskAT | RemoveTaskAT;

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