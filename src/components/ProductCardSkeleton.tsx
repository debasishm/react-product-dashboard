import { Card, CardActions, CardContent, Skeleton } from '@mui/material';

/**
 * Placeholder with the same shape as ProductCard.
 * Shown while products are loading, so the layout does not jump.
 */
export default function ProductCardSkeleton() {
  return (
    <Card className="product-card">
      <Skeleton variant="rectangular" height={160} />

      <CardContent className="product-card-content">
        <Skeleton variant="text" sx={{ fontSize: '1.25rem' }} width="80%" />
        <Skeleton variant="text" width="40%" />
      </CardContent>

      <CardActions className="product-card-actions">
        <Skeleton variant="rounded" width={60} height={30} />
        <Skeleton variant="rounded" width={90} height={30} />
      </CardActions>
    </Card>
  );
}
