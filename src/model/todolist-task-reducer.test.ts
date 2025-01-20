import {TasksState, Todolist} from "../App.tsx";
import {AddTodolistAC, todolistReducer} from "./todolist-reducer.ts";
import {tasksReducer} from "./tasks-reducer.ts";
import {expect, test} from "vitest";

test('ids should be equals', () => {
    const startTasksState: TasksState = {}
    const startTodolistsState: Todolist[] = []

    const action = AddTodolistAC('new todolist')

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.payload.todolistId)
    expect(idFromTodolists).toBe(action.payload.todolistId)
})