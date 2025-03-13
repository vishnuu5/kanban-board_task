import { createSlice, nanoid } from "@reduxjs/toolkit"

// Define the initial columns
const initialColumns = {
  "column-1": {
    id: "column-1",
    title: "To Do",
    taskIds: [],
  },
  "column-2": {
    id: "column-2",
    title: "In Progress",
    taskIds: [],
  },
  "column-3": {
    id: "column-3",
    title: "Peer Review",
    taskIds: [],
  },
  "column-4": {
    id: "column-4",
    title: "Done",
    taskIds: [],
  },
}

// Column order mapping for next stage transitions
const nextColumnMap = {
  "column-1": "column-2", // To Do -> In Progress
  "column-2": "column-3", // In Progress -> Peer Review
  "column-3": "column-4", // Peer Review -> Done
}

// The initial state with some sample tasks
const initialState = {
  tasks: {},
  columns: initialColumns,
  columnOrder: ["column-1", "column-2", "column-3", "column-4"],
}

// Create the tasks slice
export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      const { title, description } = action.payload
      const taskId = `task-${nanoid()}`

      // Create new task
      state.tasks[taskId] = {
        id: taskId,
        title,
        description,
      }

      // Add task to To Do column
      state.columns["column-1"].taskIds.push(taskId)
    },

    updateTask: (state, action) => {
      const { id, title, description } = action.payload

      // Check if task exists
      if (state.tasks[id]) {
        // Update task properties
        state.tasks[id] = {
          ...state.tasks[id],
          title: title || state.tasks[id].title,
          description: description || state.tasks[id].description,
        }
      }
    },

    deleteTask: (state, action) => {
      const { id } = action.payload

      // Check if task exists
      if (state.tasks[id]) {
        // Remove task from its column
        for (const columnId in state.columns) {
          state.columns[columnId].taskIds = state.columns[columnId].taskIds.filter((taskId) => taskId !== id)
        }

        // Delete the task
        delete state.tasks[id]
      }
    },

    moveTask: (state, action) => {
      const { taskId, sourceColumnId, destinationColumnId, sourceIndex, destinationIndex } = action.payload

      // Remove from source column
      const sourceTaskIds = [...state.columns[sourceColumnId].taskIds]
      sourceTaskIds.splice(sourceIndex, 1)

      // Add to destination column
      const destinationTaskIds = [...state.columns[destinationColumnId].taskIds]
      destinationTaskIds.splice(destinationIndex, 0, taskId)

      // Update the state
      state.columns[sourceColumnId].taskIds = sourceTaskIds
      state.columns[destinationColumnId].taskIds = destinationTaskIds
    },

    moveToNextStage: (state, action) => {
      const { taskId, currentColumnId } = action.payload

      // Check if there's a next column
      const nextColumnId = nextColumnMap[currentColumnId]
      if (!nextColumnId) return

      // Find the task index in current column
      const currentColumnTaskIds = [...state.columns[currentColumnId].taskIds]
      const taskIndex = currentColumnTaskIds.indexOf(taskId)

      if (taskIndex === -1) return

      // Remove from current column
      currentColumnTaskIds.splice(taskIndex, 1)

      // Add to next column
      const nextColumnTaskIds = [...state.columns[nextColumnId].taskIds]
      nextColumnTaskIds.push(taskId)

      // Update the state
      state.columns[currentColumnId].taskIds = currentColumnTaskIds
      state.columns[nextColumnId].taskIds = nextColumnTaskIds
    },

    moveToSpecificStage: (state, action) => {
      const { taskId, currentColumnId, targetColumnId } = action.payload

      // Ensure the columns exist
      if (!state.columns[currentColumnId] || !state.columns[targetColumnId]) return

      // Find the task index in current column
      const currentColumnTaskIds = [...state.columns[currentColumnId].taskIds]
      const taskIndex = currentColumnTaskIds.indexOf(taskId)

      if (taskIndex === -1) return

      // Remove from current column
      currentColumnTaskIds.splice(taskIndex, 1)

      // Add to target column
      const targetColumnTaskIds = [...state.columns[targetColumnId].taskIds]
      targetColumnTaskIds.push(taskId)

      // Update the state
      state.columns[currentColumnId].taskIds = currentColumnTaskIds
      state.columns[targetColumnId].taskIds = targetColumnTaskIds
    },
  },
})

// Export actions and selectors
export const { addTask, updateTask, deleteTask, moveTask, moveToNextStage, moveToSpecificStage } = tasksSlice.actions

export const selectTasks = (state) => state.tasks.tasks
export const selectColumns = (state) => state.tasks.columns
export const selectColumnOrder = (state) => state.tasks.columnOrder

export default tasksSlice.reducer

