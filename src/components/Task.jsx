import { useState } from "react"
import { Draggable } from "react-beautiful-dnd"
import { useDispatch, useSelector } from "react-redux"
import { moveToNextStage, moveToSpecificStage, deleteTask, selectColumns } from "../features/tasks/tasksSlice"
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Chip,
  CardActions,
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material"
import { PlayArrow, RateReview, CheckCircle, ArrowForward, MoreVert, Edit, Delete } from "@mui/icons-material"
import EditTaskModal from "./EditTaskModal"

const Task = ({ task, index }) => {
  const dispatch = useDispatch()
  const columns = useSelector(selectColumns)
  const [anchorEl, setAnchorEl] = useState(null)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  // Find which column this task is in
  const findColumnForTask = () => {
    for (const [columnId, column] of Object.entries(columns)) {
      if (column.taskIds.includes(task.id)) {
        return columnId
      }
    }
    return null
  }

  const currentColumnId = findColumnForTask()

  // Get column title for display
  const getColumnTitle = (columnId) => {
    return columns[columnId]?.title || ""
  }

  // Handle moving to next stage
  const handleMoveToNext = () => {
    if (currentColumnId) {
      dispatch(moveToNextStage({ taskId: task.id, currentColumnId }))
    }
  }

  // Handle moving to a specific stage
  const handleMoveToStage = (targetColumnId) => {
    if (currentColumnId && targetColumnId !== currentColumnId) {
      dispatch(
        moveToSpecificStage({
          taskId: task.id,
          currentColumnId,
          targetColumnId,
        }),
      )
    }
  }

  // Menu handlers
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  // Edit handlers
  const handleEditClick = () => {
    setEditModalOpen(true)
    handleMenuClose()
  }

  const handleEditClose = () => {
    setEditModalOpen(false)
  }

  // Delete handlers
  const handleDeleteClick = () => {
    setDeleteDialogOpen(true)
    handleMenuClose()
  }

  const handleDeleteConfirm = () => {
    dispatch(deleteTask({ id: task.id }))
    setDeleteDialogOpen(false)
  }

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false)
  }

  // Determine which action buttons to show based on current column
  const renderActionButtons = () => {
    switch (currentColumnId) {
      case "column-1": // To Do
        return (
          <Button
            size="small"
            variant="contained"
            color="primary"
            startIcon={<PlayArrow />}
            onClick={handleMoveToNext}
            fullWidth
          >
            Start Work
          </Button>
        )
      case "column-2": // In Progress
        return (
          <Button
            size="small"
            variant="contained"
            color="secondary"
            startIcon={<RateReview />}
            onClick={handleMoveToNext}
            fullWidth
          >
            Submit for Review
          </Button>
        )
      case "column-3": // Peer Review
        return (
          <Button
            size="small"
            variant="contained"
            color="success"
            startIcon={<CheckCircle />}
            onClick={handleMoveToNext}
            fullWidth
          >
            Mark as Done
          </Button>
        )
      case "column-4": // Done
        return (
          <Button
            size="small"
            variant="outlined"
            color="primary"
            startIcon={<ArrowForward />}
            onClick={() => handleMoveToStage("column-1")}
            fullWidth
          >
            Move to To Do
          </Button>
        )
      default:
        return null
    }
  }

  // Render quick action buttons for moving to any column
  const renderQuickActions = () => {
    return (
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
        {Object.entries(columns).map(([columnId, column]) => {
          // Don't show button for current column
          if (columnId === currentColumnId) return null

          return (
            <Tooltip key={columnId} title={`Move to ${column.title}`}>
              <Chip
                label={column.title.charAt(0)}
                size="small"
                onClick={() => handleMoveToStage(columnId)}
                sx={{
                  minWidth: "24px",
                  cursor: "pointer",
                  backgroundColor: getChipColor(columnId),
                  color: "white",
                  "&:hover": {
                    opacity: 0.8,
                  },
                }}
              />
            </Tooltip>
          )
        })}
      </Box>
    )
  }

  // Get color for column chips
  const getChipColor = (columnId) => {
    switch (columnId) {
      case "column-1":
        return "#2196f3" // blue
      case "column-2":
        return "#ff9800" // orange
      case "column-3":
        return "#9c27b0" // purple
      case "column-4":
        return "#4caf50" // green
      default:
        return "#757575" // grey
    }
  }

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          sx={{
            mb: 2,
            backgroundColor: snapshot.isDragging ? "rgba(255, 255, 255, 0.9)" : "white",
            boxShadow: snapshot.isDragging ? 8 : 2,
            transition: "background-color 0.2s ease, box-shadow 0.2s ease",
            "&:hover": {
              boxShadow: 4,
            },
          }}
        >
          <CardContent sx={{ pb: 1 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <Typography variant="h6" component="div" gutterBottom sx={{ fontWeight: "bold", flex: 1 }}>
                {task.title}
              </Typography>
              <IconButton size="small" onClick={handleMenuOpen} sx={{ ml: 1, mt: -1, mr: -1 }}>
                <MoreVert fontSize="small" />
              </IconButton>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem onClick={handleEditClick}>
                  <Edit fontSize="small" sx={{ mr: 1 }} />
                  Edit
                </MenuItem>
                <MenuItem onClick={handleDeleteClick} sx={{ color: "error.main" }}>
                  <Delete fontSize="small" sx={{ mr: 1 }} />
                  Delete
                </MenuItem>
              </Menu>
            </Box>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                mb: 1,
              }}
            >
              {task.description}
            </Typography>

            {renderQuickActions()}
          </CardContent>
          <CardActions sx={{ p: 2, pt: 0 }}>{renderActionButtons()}</CardActions>

          {/* Edit Task Modal */}
          <EditTaskModal open={editModalOpen} onClose={handleEditClose} task={task} />

          {/* Delete Confirmation Dialog */}
          <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
            <DialogTitle>Delete Task</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to delete "{task.title}"? This action cannot be undone.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDeleteCancel}>Cancel</Button>
              <Button onClick={handleDeleteConfirm} color="error" variant="contained">
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </Card>
      )}
    </Draggable>
  )
}

export default Task

