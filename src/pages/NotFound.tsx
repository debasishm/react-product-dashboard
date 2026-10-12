import { Box, Button, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function NotFound() {
  return (
    <Box textAlign="center" mt={8}>
      <Typography variant="h4" component="h1" gutterBottom>
        404
      </Typography>
      <Typography color="text.secondary" mb={3}>
        Page not found.
      </Typography>
      <Button variant="contained" component={RouterLink} to="/">
        Back to Home
      </Button>
    </Box>
  );
}
