import { Droppable } from "react-beautiful-dnd"
import Task from "./Task"
import { Paper, Typography, Box } from "@mui/material"

const getColumnColor = (columnId) => {
  switch (columnId) {
    case "column-1":
      return { bg: "#e3f2fd", header: "#1976d2" } // blue
    case "column-2":
      return { bg: "#fff3e0", header: "#e65100" } // orange
    case "column-3":
      return { bg: "#f3e5f5", header: "#7b1fa2" } // purple
    case "column-4":
      return { bg: "#e8f5e9", header: "#2e7d32" } // green
    default:
      return { bg: "#f5f5f5", header: "#212121" } // grey
  }
}

const Column = ({ column, tasks }) => {
  const colors = getColumnColor(column.id)

  return (
    <Paper
      elevation={2}
      sx={{
        p: 2,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: colors.bg,
        borderTop: `4px solid ${colors.header}`,
      }}
    >
      <Typography
        variant="h6"
        component="h2"
        sx={{
          mb: 2,
          fontWeight: "bold",
          color: colors.header,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {column.title}
        <Typography
          component="span"
          sx={{
            ml: 1,
            fontSize: "0.9rem",
            fontWeight: "normal",
            backgroundColor: colors.header,
            color: "white",
            borderRadius: "50%",
            width: 24,
            height: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {tasks.length}
        </Typography>
      </Typography>

      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <Box
            ref={provided.innerRef}
            {...provided.droppableProps}
            sx={{
              flexGrow: 1,
              minHeight: "100px",
              backgroundColor: snapshot.isDraggingOver ? "rgba(0, 0, 0, 0.05)" : "transparent",
              borderRadius: 1,
              p: 1,
              overflow: "auto",
            }}
          >
            {tasks.map((task, index) => (
              <Task key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </Paper>
  )
}

export default Column

