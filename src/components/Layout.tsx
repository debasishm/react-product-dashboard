import { Outlet } from "react-router-dom";
import Header from "./Header";
import { Box } from "@mui/material";
import "../styles/layout.css";

/**
 * Layout Component
 *
 * Provides the main application structure:
 */
export default function Layout() {
  return (
    /**
     * Full Page Layout Wrapper
     */
    <Box className="app-layout">
      <Header />
      <Box component="main" className="app-main">
        <Outlet />
      </Box>
    </Box>
  );
}
