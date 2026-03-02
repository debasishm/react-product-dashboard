import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  TextField,
  Pagination,
  CircularProgress,
  Alert,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CategoryFilter from "../components/CategoryFilter";
import { useProducts } from "../hooks/useProducts";
import { PRODUCT_LIMIT } from "../constants/product.constants";
import { toggleFavorite, getFavorites } from "../utils/favourites";
import "../styles/page.css";

/**
 * Home Page
 *
 * Displays:
 * - Search + Category filters
 * - Product grid
 * - Pagination
 * - Favorite toggle feature
 */
export default function Home() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [favorites, setFavorites] = useState<number[]>(() => getFavorites());

  const navigate = useNavigate();

  const { products, total, loading, error } = useProducts(
    page,
    search || undefined,
    category || undefined,
  );

  return (
    <Box className="main-content">
      {/* Filters Section */}
      <Box className="filter-box">
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label="Search products"
              fullWidth
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <CategoryFilter
              value={category}
              onChange={(val) => {
                setCategory(val);
                setSearch("");
                setPage(1);
              }}
            />
          </Grid>
        </Grid>
      </Box>

      {/* Loader */}
      {loading && (
        <Box className="center-box">
          <CircularProgress />
        </Box>
      )}

      {/* Error Message */}
      {error && <Alert severity="error">{error}</Alert>}

      {/* Product Grid */}
      {!loading && !error && (
        <>
          <Grid container spacing={3}>
            {products.map((product) => (
              <Grid key={product.id} size={{ xs: 12, sm: 6, md: 3 }}>
                <Card className="product-card">
                  {/* Lazy loaded product image */}
                  <CardMedia
                    component="img"
                    height="160"
                    image={product.thumbnail}
                    alt={product.title}
                    className="product-image"
                    loading="lazy"
                  />

                  <CardContent>
                    <Typography variant="h6" noWrap>
                      {product.title}
                    </Typography>

                    <Typography color="text.secondary">
                      ${product.price}
                    </Typography>

                    <Box className="product-actions">
                      {/* View Product */}
                      <Button
                        size="small"
                        onClick={() => navigate(`/products/${product.id}`)}
                      >
                        View
                      </Button>

                      {/* Favorite Toggle */}
                      <Button
                        size="small"
                        color={
                          favorites.includes(product.id) ? "error" : "primary"
                        }
                        startIcon={
                          favorites.includes(product.id) ? (
                            <FavoriteIcon />
                          ) : (
                            <FavoriteBorderIcon />
                          )
                        }
                        onClick={() => {
                          const updated = toggleFavorite(product.id);
                          setFavorites(updated);
                        }}
                      >
                        Fav
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Pagination */}
          <Box className="pagination-box">
            <Pagination
              count={Math.ceil(total / PRODUCT_LIMIT)}
              page={page}
              onChange={(_, val) => setPage(val)}
            />
          </Box>
        </>
      )}
    </Box>
  );
}
