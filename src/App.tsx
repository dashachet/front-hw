import './App.css';
import {Todolist} from "./Todolist";
import {useState} from "react";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import ButtonAppBar from "./components/ButtonAppBar";
import {Container, CssBaseline} from '@mui/material';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles'

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: TaskType[]
}

type ThemeMode = 'dark' | 'light'

function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()


    let [todolists, setTodolists] = useState<TodolistType[]>([
            {id: todolistID1, title: 'What to learn', filter: 'all'},
            {id: todolistID2, title: 'What to buy', filter: 'all'},
        ]
    )

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],

    })

    const removeTask = (taskId: string, todolistId: string) => {
        const newTodolistTasks = {...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)}
        setTasks(newTodolistTasks)
    }

    const changeTaskStatus = (taskId: string, taskStatus: boolean, todolistId: string) => {
        const newTodolistTasks = {
            ...tasks,
            [todolistId]: tasks[todolistId].map(t => t.id == taskId ? {...t, isDone: taskStatus} : t)
        }
        setTasks(newTodolistTasks)
    }
    const changeFilter = (filter: FilterValuesType, todolistId: string) => {
        const newTodolists = todolists.map(tl => {
            return tl.id === todolistId ? {...tl, filter} : tl
        })
        setTodolists(newTodolists)
    }
    const addTodolist = (title: string) => {
        const todolistID = v1()
        const newTodolist : TodolistType = {
            id: todolistID, title: title, filter: 'all'
        }
    setTodolists([...todolists, newTodolist])
        setTasks({...tasks, [todolistID]: [] })
    }
    const removeTodolist = (todolistId: string) => {
        const newTodolists = todolists.filter(tl => tl.id !== todolistId)
        setTodolists(newTodolists)

        delete tasks[todolistId]
        setTasks({...tasks})
    }
    const addTask = (title: string, todolistId: string) => {
        const newTask = {
            id: v1(),
            title: title,
            isDone: false
        }
        const newTodolistTasks = {...tasks, [todolistId]: [newTask, ...tasks[todolistId]]}
        setTasks(newTodolistTasks)
    }
    // const addTodolist = (title: string) => {
    //     const newTodoId = v1()
    //     const newTodo: TodolistType = {id: newTodoId, title, filter: 'all'}
    //     setTodolists((prevState) => ([newTodo, ...prevState]))
    //     setTasks((prevState) => ({...prevState, [newTodoId]: []}))
    // }

    const updateTask = (todolistId: string, taskId: string, title: string) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(el => el.id === taskId ? {...el, title} : el)
        })
    }

    type UpdateTodolistType={todolistId: string,  title: string}
    // const updateTodolist = (payload:UpdateTodolistType) => {
    const updateTodolist = (payload:{todolistId: string,  title: string}) => {
        const{todolistId,title}=payload
        setTodolists(todolists.map(el=>el.id===todolistId ? {...el,title} : el))
    }
    const [themeMode, setThemeMode] = useState<ThemeMode>('light')

    const theme = createTheme({
        palette: {
            mode: themeMode === 'light' ? 'light' : 'dark',
            primary: {
                main: '#ef6c00',
            },
        },
    })

    const changeModeHandler = () => {
        setThemeMode( themeMode === 'light' ? 'dark' : 'light' )
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
        <Container fixed>
            <div className="App">
                <ButtonAppBar changeModeHandler={changeModeHandler}/>
                <Grid container >
                    <AddItemForm addItem={addTodolist}/>
                </Grid>

                <Grid container sx={{mt: 5}}>
                    {todolists.map((tl) => {

                        const allTodolistTasks = tasks[tl.id]
                        let tasksForTodolist = allTodolistTasks

                        if (tl.filter === 'active') {
                            tasksForTodolist = allTodolistTasks.filter(task => !task.isDone)
                        }

                        if (tl.filter === 'completed') {
                            tasksForTodolist = allTodolistTasks.filter(task => task.isDone)
                        }

                        return (
                        <Paper elevation={3} sx={{p: 7, ml: 5, mb: 5}}>
                        <Todolist
                            key={tl.id}
                            todolistId={tl.id}
                            title={tl.title}
                            tasks={tasksForTodolist}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeTaskStatus={changeTaskStatus}
                            filter={tl.filter}
                            removeTodolist={removeTodolist}
                            updateTask={updateTask}
                            updateTodolist={updateTodolist}
                        />
                        </Paper>
                        )
                    })}
                </Grid>

            </div>
        </Container>
</ThemeProvider>
    );
}

export default App;
