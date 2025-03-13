import { configureStore } from "@reduxjs/toolkit"
import tasksReducer from "../features/tasks/tasksSlice"

// Load state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("kanbanState")
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (err) {
    console.error("Error loading state from localStorage:", err)
    return undefined
  }
}

// Save state to localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem("kanbanState", serializedState)
  } catch (err) {
    console.error("Error saving state to localStorage:", err)
  }
}

const preloadedState = loadState()

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
  preloadedState,
})

// Subscribe to store changes and save to localStorage
store.subscribe(() => {
  saveState(store.getState())
})

