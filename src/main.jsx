import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import App from "./App"
import { store } from "./app/store"
import "./index.css"

// Make sure DOM is loaded before rendering
document.addEventListener("DOMContentLoaded", () => {
  const rootElement = document.getElementById("root")

  if (rootElement) {
    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
      </React.StrictMode>,
    )
  } else {
    console.error("Root element with id 'root' not found in the document")
  }
})

