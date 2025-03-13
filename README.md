# Kanban Board Application
A modern, responsive Kanban board application built with React, Redux, and Material UI. This application allows users to manage tasks across different stages of completion with a drag-and-drop interface.

## Kanban Board Screenshot

![Image](https://github.com/user-attachments/assets/cdd7396b-02a2-4415-a928-c9d0ecbc3ec8)


## Demo:
Click => [Here](https://kanban-board-task-ten.vercel.app){:target="_blank"}
## Features
Kanban Board Layout: Four columns representing different stages of task completion (To Do, In Progress, Peer Review, Done)
Task Management: Create, read, update, and delete tasks
Drag and Drop: Move tasks between columns with intuitive drag and drop functionality
Search Functionality: Filter tasks across all columns based on title or description
Task Actions: Quick action buttons to move tasks between stages
Responsive Design: Works on desktop and mobile devices
Data Persistence: Tasks are saved to localStorage and persist between sessions.

## Technologies Used
React: UI library for building the user interface
Vite: Build tool for fast development
Redux Toolkit: State management
React Beautiful DnD: Drag and drop functionality
Material UI: Component library for styling
LocalStorage: For data persistence

## Installation and Setup

## Prerequisites
Node.js (v14 or higher)
npm or yarn

## Installation Steps

1. Clone the repository:
```bash
git clone https://github.com/yourusername/kanban-board.git
cd kanban-board
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Usage Guide

### Managing Tasks

#### Creating a Task

1. Click the "+" floating action button in the bottom right corner
2. Enter a title (required) and description (optional)
3. Click "Add Task" to create the task in the "To Do" column


#### Moving Tasks

- **Drag and Drop**: Click and drag a task to move it between columns
- **Action Buttons**:

- Use the main button at the bottom of each task to move it to the next logical stage
- Use the letter chips (T, I, P, D) to move directly to a specific column

#### Editing a Task

1. Click the three-dot menu in the top-right corner of a task
2. Select "Edit"
3. Update the title and/or description
4. Click "Save Changes"

#### Deleting a Task

1. Click the three-dot menu in the top-right corner of a task
2. Select "Delete"
3. Confirm deletion in the dialog

### Searching Tasks

- Use the search bar in the header to filter tasks
- Tasks will be filtered in real-time as you type
- The search matches against both task titles and descriptions

## Project Structure
```bash
kanban-board/
├── public/
├── src/
│   ├── app/
│   │   └── store.js          
│   ├── components/
│   │   ├── AddTaskModal.jsx  
│   │   ├── Board.jsx        
│   │   ├── Column.jsx      
│   │   ├── EditTaskModal.jsx 
│   │   ├── Header.jsx        
│   │   └── Task.jsx          
│   ├── features/
│   │   └── tasks/
│   │       └── tasksSlice.js 
│   ├── App.jsx              
│   ├── index.css           
│   └── main.jsx           
├── index.html                
├── package.json             
└── vite.config.js
```
Thought for 2 seconds```markdown project="Kanban Board" file="README.md"
...
```

2. Install dependencies:

```shellscript
npm install
# or
yarn
```


3. Start the development server:

```shellscript
npm run dev
# or
yarn dev
```


4. Open your browser and navigate to `http://localhost:5173`


## Usage Guide

### Managing Tasks

#### Creating a Task

1. Click the "+" floating action button in the bottom right corner
2. Enter a title (required) and description (optional)
3. Click "Add Task" to create the task in the "To Do" column


#### Moving Tasks

- **Drag and Drop**: Click and drag a task to move it between columns
- **Action Buttons**:

- Use the main button at the bottom of each task to move it to the next logical stage
- Use the letter chips (T, I, P, D) to move directly to a specific column





#### Editing a Task

1. Click the three-dot menu in the top-right corner of a task
2. Select "Edit"
3. Update the title and/or description
4. Click "Save Changes"


#### Deleting a Task

1. Click the three-dot menu in the top-right corner of a task
2. Select "Delete"
3. Confirm deletion in the dialog


### Searching Tasks

- Use the search bar in the header to filter tasks
- Tasks will be filtered in real-time as you type
- The search matches against both task titles and descriptions


## Project Structure

```plaintext
kanban-board/
├── public/
├── src/
│   ├── app/
│   │   └── store.js          # Redux store configuration
│   ├── components/
│   │   ├── AddTaskModal.jsx  # Modal for adding new tasks
│   │   ├── Board.jsx         # Main board component
│   │   ├── Column.jsx        # Column component
│   │   ├── EditTaskModal.jsx # Modal for editing tasks
│   │   ├── Header.jsx        # App header with search
│   │   └── Task.jsx          # Task card component
│   ├── features/
│   │   └── tasks/
│   │       └── tasksSlice.js # Redux slice for tasks
│   ├── App.jsx               # Main application component
│   ├── index.css             # Global styles
│   └── main.jsx              # Application entry point
├── index.html                # HTML template
├── package.json              # Dependencies and scripts
└── vite.config.js            # Vite configuration
```

## State Management

The application uses Redux Toolkit for state management. The main state slice is `tasksSlice.js`, which manages:

- Tasks data (title, description, ID)
- Column data (which tasks belong to which column)
- Column order


Actions include:

- `addTask`: Create a new task in the To Do column
- `updateTask`: Update an existing task's title or description
- `deleteTask`: Remove a task from the board
- `moveTask`: Move a task between columns (used by drag and drop)
- `moveToNextStage`: Move a task to the next logical stage
- `moveToSpecificStage`: Move a task to any specific column


## Local Storage

The application uses localStorage to persist the state between sessions. The Redux store is saved to localStorage whenever it changes, and loaded from localStorage when the application starts.

## Responsive Design

The Kanban board is fully responsive:

- On desktop, columns are displayed side by side
- On smaller screens, columns adjust their width
- The UI is optimized for touch interactions on mobile devices


## Troubleshooting

### Common Issues

**Tasks not saving between sessions**

- Make sure localStorage is enabled in your browser
- Check if you're in incognito/private browsing mode (which may limit localStorage)


**Drag and drop not working**

- Ensure you're clicking and holding on the task card
- Check if any browser extensions might be interfering with drag events


**Search not finding tasks**

- The search is case-insensitive but requires exact text matching
- Make sure you're searching for text that appears in the title or description


## Future Enhancements

Potential future improvements for the application:

- User authentication and multi-user support
- Backend integration for persistent storage
- Task priorities and due dates
- Labels and categorization
- Task comments and activity history
- Dark mode support
- Customizable columns and workflow


## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [React Beautiful DnD](https://github.com/atlassian/react-beautiful-dnd) for the drag and drop functionality
- [Material UI](https://mui.com/) for the component library
- [Redux Toolkit](https://redux-toolkit.js.org/) for state management
