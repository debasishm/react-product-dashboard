import {
  Box,
  Typography,
  Button,
  TextField,
  Pagination,
  Alert,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ProductGridSkeleton from '../components/ProductGridSkeleton';
import CategoryFilter from '../components/CategoryFilter';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../hooks/useProducts';
import { PRODUCT_LIMIT } from '../constants/product.constants';
import { PRODUCT_GRID_SIZE } from '../constants/text.constants';
import { toggleFavorite, getFavorites } from '../utils/favourites';
import '../styles/page.css';

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
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [favorites, setFavorites] = useState<number[]>(() => getFavorites());
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Wait until the user stops typing before calling the API
  const debouncedSearch = useDebounce(search);

  const { products, total, loading, error } = useProducts(
    page,
    debouncedSearch || undefined,
    category || undefined
  );

  const pageCount = Math.ceil(total / PRODUCT_LIMIT);

  return (
    <Box className="main-content">
      {/* Filters Section */}
      <Box className="filter-box">
        {products.length === 0 && (
          <Typography color="text.secondary" align="center">
            No products found.
          </Typography>
        )}
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label="Search products"
              fullWidth
              value={search}
              onChange={e => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <CategoryFilter
              value={category}
              onChange={val => {
                setCategory(val);
                setSearch('');
                setPage(1);
              }}
            />
          </Grid>
        </Grid>
      </Box>

      {/* Loader */}
      {loading && <ProductGridSkeleton />}

      {/* Error Message */}
      {error && <Alert severity="error">{error}</Alert>}

      {/* Product Grid */}
      {!loading && !error && (
        <>
          <Grid container spacing={3}>
            {products.map(product => {
              const isFav = favorites.includes(product.id);

              return (
                <Grid key={product.id} size={PRODUCT_GRID_SIZE}>
                  <ProductCard
                    product={product}
                    actions={
                      <Button
                        size="small"
                        color={isFav ? 'error' : 'primary'}
                        aria-pressed={isFav}
                        aria-label={`${isFav ? 'Unfavorite' : 'Favorite'} ${product.title}`}
                        startIcon={
                          isFav ? <FavoriteIcon /> : <FavoriteBorderIcon />
                        }
                        onClick={() => setFavorites(toggleFavorite(product.id))}
                      >
                        Favorite
                      </Button>
                    }
                  />
                </Grid>
              );
            })}
          </Grid>

          {/* Pagination (only when there is more than one page) */}
          {pageCount > 1 && (
            <Box className="pagination-box">
              <Pagination
                count={pageCount}
                page={page}
                onChange={(_, val) => setPage(val)}
                size={isMobile ? 'small' : 'medium'}
                siblingCount={isMobile ? 0 : 1}
              />
            </Box>
          )}
        </>
      )}
    </Box>
  );
}
