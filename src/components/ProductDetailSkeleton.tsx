import { Box, Skeleton } from '@mui/material';
import Grid from '@mui/material/Grid';

/**
 * Placeholder for the product detail page while it loads
 */
export default function ProductDetailSkeleton() {
  return (
    <Box className="main-content" role="status" aria-label="Loading product">
      <Skeleton variant="text" sx={{ fontSize: '2rem' }} width="50%" />

      <Grid container spacing={4}>
        {/* Images */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Skeleton variant="rectangular" height={350} />

          <Grid container spacing={2} sx={{ mt: 1 }}>
            {[0, 1, 2].map(index => (
              <Grid key={index} size={{ xs: 4 }}>
                <Skeleton variant="rectangular" height={100} />
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Product info */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Skeleton variant="text" sx={{ fontSize: '1.5rem' }} width="30%" />
          <Skeleton variant="rounded" width={200} height={36} sx={{ my: 2 }} />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Skeleton variant="text" width="60%" />
        </Grid>
      </Grid>
    </Box>
  );
}
