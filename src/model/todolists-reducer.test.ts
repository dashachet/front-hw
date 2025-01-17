import {v1} from 'uuid'
import { expect, test } from 'vitest'
import type {Todolist} from '../App'
import { todolistReducer} from './todolist-reducer'


test('correct todolist should be deleted', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    // 1. Стартовый state
    const startState: Todolist[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]

    // 2. Действие
    const action = {
        type: 'REMOVE-TODOLIST' as const,
        payload: {
            id: todolistId1,
        },
    }
    const endState = todolistReducer(startState, action)

    // 3. Проверка, что действие измененило state соответствующим образом
    // в массиве останется один тудулист
    expect(endState.length).toBe(1)
    // удалится нужный тудулист, не любой
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be created', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: Todolist[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]
    const action = {
        type: 'ADD-TODOLIST' as const,
        payload: {
            id: v1(),
            title: "New Todolist"
        },
    }



    const endState = todolistReducer(startState,  action)

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(action.payload.title)
})

test('correct todolist should change its title', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: Todolist[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]
    const action = {
        type: 'CHANGE-TITLE-TODOLIST' as const,
        payload: {
            id: todolistId2,
            title: "New Todolist"
        },
    }


    const endState = todolistReducer(startState, action)

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(action.payload.title)
})

test('correct todolist should change its filter', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: Todolist[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]
    const action = {
        type: 'CHANGE-FILTER-TODOLIST' as const,
        payload: {
            id: todolistId2,
           filter: 'completed'
        },
    } as const

    const endState = todolistReducer(startState, action)

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(action.payload.filter)
})