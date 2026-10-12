import { useState, type ReactNode } from 'react';
import type { Product } from '../types/product.types';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Skeleton,
  Typography,
  CardActions,
  Button,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { formatPrice } from '../utils/formatPrice';
import '../styles/productCard.css';

interface ProductCardProps {
  product: Product;
  /** Extra buttons shown next to "View" (e.g. favorite / remove) */
  actions?: ReactNode;
}

/**
 * ProductCard Component
 *
 * Responsibility:
 * - Displays product thumbnail, title, and price
 * - Links to the product detail page
 * - Lets pages inject their own extra actions
 */
export default function ProductCard({ product, actions }: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  return (
    <Card className="product-card">
      <Box sx={{ position: 'relative', height: 160 }}>
        {!imageLoaded && (
          <Skeleton
            variant="rectangular"
            animation="wave"
            sx={{ position: 'absolute', inset: 0, height: '100%' }}
          />
        )}
        <CardMedia
          component="img"
          image={product.thumbnail}
          alt={product.title}
          loading="lazy"
          className="product-card-media"
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageLoaded(true)}
          sx={{ opacity: imageLoaded ? 1 : 0, transition: 'opacity 0.3s' }}
        />
      </Box>
      <CardContent className="product-card-content">
        <Typography variant="h6" gutterBottom noWrap>
          {product.title}
        </Typography>

        <Typography color="text.secondary">
          {formatPrice(product.price)}
        </Typography>
      </CardContent>
      <CardActions className="product-card-actions">
        <Button
          size="small"
          component={RouterLink}
          to={`/products/${product.id}`}
        >
          View
        </Button>
        {actions}
      </CardActions>
    </Card>
  );
}
