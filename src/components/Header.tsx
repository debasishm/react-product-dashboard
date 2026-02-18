import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function Header() {
  return (
    <AppBar position="static" sx={{ width: "100%" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Product Dashboard
        </Typography>

        <Box>
          <Button color="inherit" component={RouterLink} to="/">
            Home
          </Button>
          <Button color="inherit" component={RouterLink} to="/dashboard">
            Dashboard
          </Button>
          <Button color="inherit" component={RouterLink} to="/chart">
            Chart
          </Button>
          <Button color="inherit" component={RouterLink} to="/about">
            About
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
