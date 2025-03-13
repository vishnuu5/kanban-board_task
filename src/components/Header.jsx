import { useState } from "react"
import { AppBar, Toolbar, Typography, InputBase, Box, alpha } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"

const Header = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState("")

  const handleSearchChange = (e) => {
    const value = e.target.value
    setSearchValue(value)
    onSearch(value)
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}>
          Kanban Board
        </Typography>
        <Box
          sx={{
            position: "relative",
            borderRadius: 1,
            backgroundColor: alpha("#fff", 0.15),
            "&:hover": {
              backgroundColor: alpha("#fff", 0.25),
            },
            width: { xs: "100%", sm: "auto" },
            ml: { xs: 0, sm: 2 },
          }}
        >
          <Box
            sx={{
              position: "absolute",
              pointerEvents: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              padding: "0 16px",
            }}
          >
            <SearchIcon />
          </Box>
          <InputBase
            placeholder="Search tasks..."
            value={searchValue}
            onChange={handleSearchChange}
            sx={{
              color: "inherit",
              padding: "8px 8px 8px 48px",
              width: "100%",
            }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header

