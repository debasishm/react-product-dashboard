import Grid from '@mui/material/Grid';
import ProductCardSkeleton from './ProductCardSkeleton';
import { PRODUCT_LIMIT } from '../constants/product.constants';

interface ProductGridSkeletonProps {
  /** How many placeholder cards to show */
  count?: number;
}

/**
 * Grid of placeholder cards, laid out exactly like the real product grid
 */
export default function ProductGridSkeleton({
  count = PRODUCT_LIMIT,
}: ProductGridSkeletonProps) {
  return (
    <Grid container spacing={3} role="status" aria-label="Loading products">
      {Array.from({ length: count }, (_, index) => (
        <Grid key={index} size={{ xs: 12, sm: 6, md: 3 }}>
          <ProductCardSkeleton />
        </Grid>
      ))}
    </Grid>
  );
}
