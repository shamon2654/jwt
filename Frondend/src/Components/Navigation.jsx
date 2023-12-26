import React, { useState } from "react"
import { AppBar, Box, Tabs, Tab, Toolbar, Typography } from "@mui/material"
import { Link, Outlet } from "react-router-dom"

const Navigation = () => {
  const [value, setValue] = useState()
  return (
    <>
      <div>
        <AppBar>
          <Toolbar>
            <Typography variant="h4">JWT</Typography>
            <Box sx={{ marginLeft: "auto" }}>
              <Tabs
                textColor="inherit"
                onChange={(e, val) => {
                  setValue(val)
                }}
                value={value}
              >
                <Tab label="Login" to="/login" LinkComponent={Link} />
                <Tab label="Signup" to="/signup" LinkComponent={Link} />
              </Tabs>
            </Box>
          </Toolbar>
        </AppBar>   
      </div>
      <Outlet />
    </>
  )
}

export default Navigation
