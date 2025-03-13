import { useSelector } from "react-redux"
import { selectTasks, selectColumns, selectColumnOrder } from "../features/tasks/tasksSlice"
import { Box, Grid } from "@mui/material"
import Column from "./Column"

const Board = ({ searchTerm }) => {
  const tasks = useSelector(selectTasks)
  const columns = useSelector(selectColumns)
  const columnOrder = useSelector(selectColumnOrder)

  // Filter tasks based on search term
  const filteredTasks = searchTerm
    ? Object.values(tasks).filter(
        (task) =>
          task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : null

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "nowrap",
        gap: 2,
        overflowX: "auto",
        pb: 2,
        height: "calc(100% - 50px)",
      }}
    >
      <Grid container spacing={2} sx={{ flexWrap: "nowrap", height: "100%" }}>
        {columnOrder.map((columnId) => {
          const column = columns[columnId]
          const columnTasks = column.taskIds
            .map((taskId) => tasks[taskId])
            .filter(
              (task) =>
                !searchTerm || (filteredTasks && filteredTasks.some((filteredTask) => filteredTask.id === task.id)),
            )

          return (
            <Grid item key={column.id} xs={12} sm={6} md={3} sx={{ height: "100%" }}>
              <Column column={column} tasks={columnTasks} />
            </Grid>
          )
        })}
      </Grid>
    </Box>
  )
}

export default Board

