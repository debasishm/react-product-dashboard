import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink } from 'react-router-dom';
import { APP_TEXT } from '../constants/text.constants';

export default function Header() {
  const [open, setOpen] = useState(false);

  const menuItems = [
    { label: APP_TEXT.NAVIGATION.HOME, path: '/' },
    { label: APP_TEXT.NAVIGATION.DASHBOARD, path: '/dashboard' },
    { label: APP_TEXT.NAVIGATION.CHART, path: '/chart' },
    { label: APP_TEXT.NAVIGATION.ABOUT, path: '/about' },
  ];

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          {/* Hamburger (Mobile Only) */}
          <IconButton
            edge="start"
            color="inherit"
            sx={{ display: { xs: 'block', md: 'none' }, mr: 2 }}
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
          </IconButton>

          {/* Site Title */}
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
            Product Dashboard
          </Typography>

          {/* Desktop Menu */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            {menuItems.map(item => (
              <Button
                key={item.path}
                color="inherit"
                component={RouterLink}
                to={item.path}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 250 }} onClick={() => setOpen(false)}>
          <List>
            {menuItems.map(item => (
              <ListItem key={item.path} disablePadding>
                <ListItemButton component={RouterLink} to={item.path}>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
