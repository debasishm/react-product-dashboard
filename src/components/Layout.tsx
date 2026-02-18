import { Outlet } from "react-router-dom";
import Header from "./Header";
import { Box } from "@mui/material";

export default function Layout() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      {/* FULL-WIDTH HEADER */}
      <Header />

      {/* PAGE CONTENT */}
      <Box
        component="main"
        sx={{
          flex: 1,
          width: "100%",
          maxWidth: 1200,
          mx: "auto",
          px: 2,
          py: 4,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
