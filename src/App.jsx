import { useState } from "react"
import { DragDropContext } from "react-beautiful-dnd"
import { useDispatch } from "react-redux"
import { moveTask } from "./features/tasks/tasksSlice"
import Header from "./components/Header"
import Board from "./components/Board"
import AddTaskModal from "./components/AddTaskModal"
import { Box, Container, Typography, Button, Snackbar, Alert } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"

function App() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  })
  const dispatch = useDispatch()

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result

    // If dropped outside of a droppable area
    if (!destination) return

    // If dropped in the same position
    if (destination.droppableId === source.droppableId && destination.index === source.index) return

    // Dispatch move action to redux
    dispatch(
      moveTask({
        taskId: draggableId,
        sourceColumnId: source.droppableId,
        destinationColumnId: destination.droppableId,
        sourceIndex: source.index,
        destinationIndex: destination.index,
      }),
    )

    // Show success message
    setSnackbar({
      open: true,
      message: "Task moved successfully",
      severity: "success",
    })
  }

  const handleSearch = (term) => {
    setSearchTerm(term)
  }

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false })
  }

  // Function to show notifications (can be passed to child components)
  const showNotification = (message, severity = "success") => {
    setSnackbar({
      open: true,
      message,
      severity,
    })
  }

  return (
    <Container maxWidth="xl" sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Header onSearch={handleSearch} />

      <Box sx={{ flexGrow: 1, overflow: "hidden", p: 1 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: "bold", mb: 3 }}>
          Kanban Board
        </Typography>

        <DragDropContext onDragEnd={handleDragEnd}>
          <Board searchTerm={searchTerm} onNotify={showNotification} />
        </DragDropContext>
      </Box>

      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon sx={{ fontSize: 45, width: 30, height: 30, marginLeft: 1.8 }} />} // Increased icon size
        sx={{
          position: "fixed",
          bottom: 24, // Adjusted margin from the bottom
          right: 24, // Adjusted margin from the right
          borderRadius: "50%",
          width: 64, // Increased button size
          height: 64, // Increased button size
          minWidth: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: 3, // Added a subtle shadow for better visibility
        }}
        onClick={handleOpenModal}
      >
        {/* <span className="sr-only">Add task</span> */}
      </Button>
      <AddTaskModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onSuccess={() => {
          showNotification("Task added successfully")
        }}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} variant="filled" sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  )
}

export default App

