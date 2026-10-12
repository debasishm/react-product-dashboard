import { Typography, Button, Box, Alert } from '@mui/material';
import Grid from '@mui/material/Grid';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ProductCard from '../components/ProductCard';
import ProductGridSkeleton from '../components/ProductGridSkeleton';
import { useFavoriteProducts } from '../hooks/useFavoriteProducts';
import { toggleFavorite } from '../utils/favourites';
import '../styles/page.css';
import { PRODUCT_GRID_SIZE } from '../constants/text.constants';

/**
 * Dashboard Page
 *
 * Displays all favorite products added by the user.
 *
 * Features:
 * - Fetches favorite products using custom hook
 * - Allows navigation to product detail page
 * - Allows removal from favorites
 * - Handles loading, error, and empty states
 */
export default function Dashboard() {
  /**
   * Custom hook to retrieve favorite products
   */
  const { products, setProducts, loading, error } = useFavoriteProducts();

  /**
   * Removes a product from favorites
   *
   * @param id - Product ID to remove
   */
  const handleRemove = (id: number) => {
    toggleFavorite(id);
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  return (
    <Box className="main-content">
      <Typography variant="h5" className="page-title">
        Favorite Products
      </Typography>

      {loading && <ProductGridSkeleton count={4} />}

      {error && <Alert severity="error">{error}</Alert>}

      {!loading && !error && products.length === 0 && (
        <Box className="empty-state">
          <Typography color="text.secondary">
            No favorite products added yet.
          </Typography>
        </Box>
      )}

      <Grid container spacing={3}>
        {products.map(product => (
          <Grid key={product.id} size={PRODUCT_GRID_SIZE}>
            <ProductCard
              product={product}
              actions={
                <Button
                  size="small"
                  color="error"
                  startIcon={<FavoriteIcon />}
                  aria-label={`Remove ${product.title} from favorites`}
                  onClick={() => handleRemove(product.id)}
                >
                  Remove
                </Button>
              }
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
