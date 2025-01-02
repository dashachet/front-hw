import {FilterValuesType, TaskType} from "./App";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button} from "./Button";
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";

type PropsType = {
    title: string
    todolistId: string
    tasks: TaskType[]
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (filter: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, taskStatus: boolean, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    updateTask: (todolistId: string, taskId: string, title: string) => void
    updateTodolist:(payload:{todolistId: string,  title: string}) => void
}

export const Todolist = (props: PropsType) => {
    const {
        title,
        tasks,
        filter,
        removeTask,
        changeFilter,
        addTask,
        changeTaskStatus,
        todolistId,
        removeTodolist,
        updateTask,
        updateTodolist
    } = props


    const changeFilterTasksHandler = (filter: FilterValuesType) => {
        changeFilter(filter, props.todolistId)
    }

    const removeTodolistHandler = () => {
        removeTodolist(todolistId)
    }

    const addTaskHandler = (title: string) => {
        addTask(title, todolistId)
    }

    const updateTodolistHandler=(title:string)=>{
      //  payload:{todolistId: string,  title: string}
      //   updateTodolist({title:title,todolistId:todolistId})
        updateTodolist({todolistId,title})
    }


    const updateTaskHandler = (taskId:string,title: string) => {
        updateTask(todolistId, taskId, title)
    }

    return (
        <div>

            <div className={"todolist-title-container"}>
                <h3>
                    <EditableSpan title={title} addItem={updateTodolistHandler}/>
                </h3>
                <Button title={'x'} onClick={removeTodolistHandler}/>
            </div>
            <AddItemForm addItem={addTaskHandler}/>
            <ul>
                {tasks.map((task) => {
                    const removeTaskHandler = () => {
                        removeTask(task.id, todolistId)
                    }

                    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        const newStatusValue = e.currentTarget.checked
                        changeTaskStatus(task.id, newStatusValue, todolistId)
                    }

                    // const updateTaskHandler = (title: string) => {
                    //     updateTask(todolistId, task.id, title)
                    // }

                    return <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                        <input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler}/>
                        <EditableSpan title={task.title} addItem={(title)=>updateTaskHandler(task.id,title)}/>
                        <Button onClick={removeTaskHandler} title={'x'}/>
                    </li>
                })}
            </ul>

            <div>
                <Button className={filter === 'all' ? 'active-filter' : ''} title={'All'}
                        onClick={() => changeFilterTasksHandler('all')}/>
                <Button className={filter === 'active' ? 'active-filter' : ''} title={'Active'}
                        onClick={() => changeFilterTasksHandler('active')}/>
                <Button className={filter === 'completed' ? 'active-filter' : ''} title={'Completed'}
                        onClick={() => changeFilterTasksHandler('completed')}/>
            </div>
        </div>
    )
}
