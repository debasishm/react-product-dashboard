import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Alert, Box, Button } from '@mui/material';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

/**
 * Catches rendering errors in the component tree and shows a fallback UI
 * instead of a blank screen.
 */
export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Unhandled UI error:', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ p: 4 }}>
          <Alert
            severity="error"
            action={
              <Button
                color="inherit"
                size="small"
                onClick={() => window.location.reload()}
              >
                Try again
              </Button>
            }
          >
            Something went wrong.
          </Alert>
        </Box>
      );
    }

    return this.props.children;
  }
}
