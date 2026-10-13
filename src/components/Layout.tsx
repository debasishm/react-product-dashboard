import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import { Box, CircularProgress } from '@mui/material';
import '../styles/layout.css';

/**
 * Layout Component
 *
 * Provides the main application structure.
 */
export default function Layout() {
  return (
    <Box className="app-layout">
      <Header />
      <Box component="main" className="app-main">
        {/* Only the page area waits for lazy pages; the header stays visible */}
        <Suspense
          fallback={
            <Box
              sx={{
                minHeight: '60vh',
                display: 'flex',
                justifyContent: 'center',
                pt: 8,
              }}
            >
              <CircularProgress />
            </Box>
          }
        >
          <Outlet />
        </Suspense>
      </Box>
    </Box>
  );
}
