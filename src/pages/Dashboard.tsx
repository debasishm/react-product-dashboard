import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";
import { useFavoriteProducts } from "../hooks/useFavoriteProducts";
import { toggleFavorite } from "../utils/favourites";
import "../styles/page.css";

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

  const navigate = useNavigate();

  /**
   * Removes a product from favorites
   *
   * @param id - Product ID to remove
   */
  const handleRemove = (id: number) => {
    toggleFavorite(id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <Box className="main-content">
      <Typography variant="h5" className="page-title">
        Favorite Products
      </Typography>

      {loading && (
        <Box className="center-box">
          <CircularProgress />
        </Box>
      )}

      {error && <Alert severity="error">{error}</Alert>}

      {!loading && !error && products.length === 0 && (
        <Box className="empty-state">
          <Typography color="text.secondary">
            No favorite products added yet.
          </Typography>
        </Box>
      )}

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid key={product.id} size={{ xs: 12, sm: 6, md: 3 }}>
            <Card className="product-card">
              <CardMedia
                component="img"
                height="160"
                image={product.thumbnail}
                alt={product.title}
                className="product-image clickable"
                loading="lazy"
                onClick={() => navigate(`/products/${product.id}`)}
              />

              <CardContent>
                <Typography variant="h6" noWrap>
                  {product.title}
                </Typography>

                <Typography color="text.secondary">${product.price}</Typography>

                <Button
                  fullWidth
                  color="error"
                  startIcon={<FavoriteIcon />}
                  className="remove-btn"
                  onClick={() => handleRemove(product.id)}
                >
                  Remove
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
