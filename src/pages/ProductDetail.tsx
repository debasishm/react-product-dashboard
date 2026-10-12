import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Alert,
  Box,
  Typography,
  Card,
  CardMedia,
  Button,
  Divider,
  Rating,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ProductDetailSkeleton from '../components/ProductDetailSkeleton';
import { getProductById } from '../services/product.service';
import { isFavorite, toggleFavorite } from '../utils/favourites';
import type { Product } from '../types/product.types';
import '../styles/page.css';

/**
 * ProductDetail Page
 *
 * Displays:
 * - Product images
 * - Product information
 * - Favorite toggle
 * - Reviews list
 */
export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isFav, setIsFav] = useState<boolean>(false);

  /**
   * Loads product details from service
   */
  useEffect(() => {
    if (!id) return;

    // Set to true by the cleanup function below if this effect is outdated
    let ignore = false;

    const loadProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getProductById(id);
        if (ignore) return;

        setProduct(data);
        setIsFav(isFavorite(data.id));
      } catch {
        if (ignore) return;

        setProduct(null);
        setError('Unable to load this product. Please try again.');
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    loadProduct();

    return () => {
      ignore = true;
    };
  }, [id]);

  const handleFavoriteToggle = () => {
    if (!product) return;

    toggleFavorite(product.id);
    setIsFav(prev => !prev);
  };

  if (loading) {
    return <ProductDetailSkeleton />;
  }

  if (error || !product) {
    return <Alert severity="error">{error ?? 'Product not found.'}</Alert>;
  }

  return (
    <Box className="main-content">
      <Typography variant="h4" className="page-title">
        {product.title}
      </Typography>

      <Grid container spacing={4}>
        {/* ===============================
            Left Side - Product Images
        ================================ */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardMedia
              component="img"
              height="350"
              image={product.images[0]}
              alt={product.title}
              className="detail-main-image"
            />
          </Card>

          {/* Thumbnail Images */}
          <Grid container spacing={2} className="thumbnail-grid">
            {product.images.slice(1, 4).map((img, index) => (
              <Grid key={index} size={{ xs: 4 }}>
                <Card>
                  <CardMedia
                    component="img"
                    height="100"
                    image={img}
                    alt={`Thumbnail ${index}`}
                    className="detail-thumbnail"
                  />
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* ===============================
            Right Side - Product Info
        ================================ */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h5" color="primary" className="detail-price">
            ${product.price}
          </Typography>

          <Button
            variant="outlined"
            color={isFav ? 'error' : 'primary'}
            startIcon={isFav ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            className="detail-fav-btn"
            onClick={handleFavoriteToggle}
          >
            {isFav ? 'Remove from Favorites' : 'Add to Favorites'}
          </Button>

          <Typography variant="body1" className="product-description">
            {product.description}
          </Typography>

          <Typography variant="body2">
            <strong>Brand:</strong> {product.brand}
          </Typography>

          <Typography variant="body2">
            <strong>Category:</strong> {product.category}
          </Typography>
        </Grid>
      </Grid>

      <Divider className="detail-divider" />

      <Box className="reviews-section">
        <Typography variant="h5" className="section-title">
          Reviews
        </Typography>

        {!product.reviews || product.reviews.length === 0 ? (
          <Typography color="text.secondary">No reviews available.</Typography>
        ) : (
          product.reviews.map((review, index) => (
            <Box key={index} className="review-card">
              <Typography fontWeight={600}>{review.reviewerName}</Typography>

              <Rating
                value={review.rating}
                readOnly
                size="small"
                sx={{ '& .MuiRating-iconFilled': { color: 'tertiary.main' } }}
              />

              <Typography variant="body2">{review.comment}</Typography>

              <Typography className="review-date">
                {new Date(review.date).toLocaleDateString()}
              </Typography>
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
}
