import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { updateTask } from "../features/tasks/tasksSlice"
import { Modal, Box, Typography, TextField, Button, Stack } from "@mui/material"

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: 400 },
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
}

const EditTaskModal = ({ open, onClose, task }) => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [titleError, setTitleError] = useState(false)
  const dispatch = useDispatch()

  // Set initial values when task changes
  useEffect(() => {
    if (task) {
      setTitle(task.title || "")
      setDescription(task.description || "")
    }
  }, [task, open])

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validate title
    if (!title.trim()) {
      setTitleError(true)
      return
    }

    // Dispatch update task action
    dispatch(
      updateTask({
        id: task.id,
        title,
        description,
      }),
    )

    // Reset form and close modal
    setTitleError(false)
    onClose()
  }

  const handleClose = () => {
    setTitleError(false)
    onClose()
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" component="h2" mb={2}>
          Edit Task
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              label="Task Title"
              variant="outlined"
              fullWidth
              value={title}
              onChange={(e) => {
                setTitle(e.target.value)
                if (e.target.value.trim()) setTitleError(false)
              }}
              error={titleError}
              helperText={titleError ? "Title is required" : ""}
              autoFocus
            />
            <TextField
              label="Task Description"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
              <Button variant="outlined" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="contained" type="submit">
                Save Changes
              </Button>
            </Box>
          </Stack>
        </form>
      </Box>
    </Modal>
  )
}

export default EditTaskModal

