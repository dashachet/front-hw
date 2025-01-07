import {FilterValuesType, TaskType} from "./App";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import React from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from "@mui/icons-material/Delete";

import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Box from "@mui/material/Box";
import {filterButtonsContainer, listItemSx} from "./Todolist.styles";


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
                    <IconButton aria-label="delete" onClick={removeTodolistHandler}>
                        <DeleteIcon/>
                    </IconButton>
                </h3>

            </div>
            <AddItemForm addItem={addTaskHandler}/>
            <List>
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

                    return <ListItem
                        key={task.id}
                        sx={listItemSx(task.isDone)}>
                        <div>
                        <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler}/>
                        <EditableSpan title={task.title} addItem={(title)=>updateTaskHandler(task.id,title)}/>
                        </div>

                        <IconButton aria-label="delete" onClick={removeTaskHandler}>
                            <DeleteIcon/>
                        </IconButton>
                    </ListItem>
                })}
            </List>

            <Box sx={filterButtonsContainer}>
                <Button variant={filter === 'all' ? "outlined" : "contained"} color="success" onClick={() => changeFilterTasksHandler('all')}>
                    All
                </Button>
                <Button variant={filter === 'active' ? "outlined" : "contained"} color="primary" onClick={() => changeFilterTasksHandler('active')}>
                    Active
                </Button>
                <Button variant={filter === 'completed' ? "outlined" : "contained"} color="error" onClick={() => changeFilterTasksHandler('completed')}>
                    Completed
                </Button>

            </Box>
        </div>
    )
}
