import React, { createContext, useContext, useReducer } from 'react'
import { v4 } from 'uuid'
import { findItemIndexById } from './utils/findItemIndexById'

export interface Task {
    id: string
    text: string
}

export interface List {
    id: string
    text: string
    tasks: Task[]
}

export interface AppState {
    lists: List[]
}

export interface AppStateContextProps {
    state: AppState
    dispatch: React.Dispatch<Action>
}

export const appData:AppState = {
    lists: [
        {
            id: "0",
            text: "To Do",
            tasks: [{ id: "c0", text: "Generate app scaffold" }]
            },
            {
            id: "1",
            text: "In Progress",
            tasks: [{ id: "c2", text: "Learn Typescript" }]
            },
            {
            id: "2",
            text: "Done",
            tasks: [{ id: "c3", text: "Begin to use static typing" }]
            }
    ]
}

type Action = {
    type: "ADD_LIST"
    payload: string
} | {
    type: "ADD_TASK"
    payload: {
        text: string, taskId: string
    }
}



export const appStateReducer = (state: AppState, action: Action): AppState => {
    switch(action.type ) {
       case 'ADD_LIST': {
           return {
               ...state,
               lists: [...state.lists,{ id: v4(), text: action.payload, tasks: [] }]
           }
       }
       case 'ADD_TASK': {
        const targetLaneIndex = findItemIndexById(state.lists,action.payload.taskId)   
        state.lists[targetLaneIndex].tasks.push({
            id: v4(),
            text: action.payload.text
        })
        return {
               ...state
           }
       }
       default: {
           return state
       } 
    }
}


const AppStateContext = createContext({} as AppStateContextProps)

export const AppStateProvider = ({ children }: React.PropsWithChildren<{}>) =>
 {
    const [ state, dispatch ] = useReducer(appStateReducer, appData) 
    return (
         <AppStateContext.Provider value= {{ state, dispatch }}>
            { children}
         </AppStateContext.Provider>
     )
 }

 export const useAppState = () => {
     return  useContext(AppStateContext)
}

