import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { APP_TEXT } from "../constants/text.constants";
import "../styles/header.css";

/**
 * Header Component
 *
 * Displays the main application navigation bar.
 * All static labels are sourced from text.constants.ts
 */
export default function Header() {
  return (
    /**
     * Application Top Navigation Bar
     */
    <AppBar position="static" className="app-header">
      <Toolbar>
        {/* Application Title */}
        <Typography variant="h6" className="header-title">
          {APP_TEXT.APP_TITLE}
        </Typography>

        {/* Navigation Buttons */}
        <Box className="header-nav">
          <Button color="inherit" component={RouterLink} to="/">
            {APP_TEXT.NAVIGATION.HOME}
          </Button>

          <Button color="inherit" component={RouterLink} to="/dashboard">
            {APP_TEXT.NAVIGATION.DASHBOARD}
          </Button>

          <Button color="inherit" component={RouterLink} to="/chart">
            {APP_TEXT.NAVIGATION.CHART}
          </Button>

          <Button color="inherit" component={RouterLink} to="/about">
            {APP_TEXT.NAVIGATION.ABOUT}
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
