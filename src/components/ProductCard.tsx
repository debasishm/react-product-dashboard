import { type ReactNode } from 'react';
import type { Product } from '../types/product.types';
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { formatPrice } from '../utils/formatPrice';
import ImageWithSkeleton from './ImageWithSkeleton';
import '../styles/productCard.css';

interface ProductCardProps {
  product: Product;
  actions?: ReactNode;
  priority?: boolean;
}

/**
 * ProductCard Component
 *
 * Responsibility:
 * - Displays product thumbnail, title, and price
 * - Links to the product detail page
 * - Lets pages inject their own extra actions
 */
export default function ProductCard({
  product,
  actions,
  priority,
}: ProductCardProps) {
  return (
    <Card className="product-card">
      <ImageWithSkeleton
        src={product.thumbnail}
        alt={product.title}
        height={160}
        priority={priority}
      />
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
