import type { Product } from "../types/product.types";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import "../styles/productCcard.css";

/**
 * ProductCard Component
 *
 * Responsibility:
 * - Displays product thumbnail, title, and price
 * - Provides navigation to product detail page
 */
export default function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="product-card">
      <CardMedia
        component="img"
        image={product.thumbnail}
        alt={product.title}
        loading="lazy"
        className="product-card-media"
      />
      <CardContent className="product-card-content">
        <Typography gutterBottom noWrap className="product-card-title">
          {product.title}
        </Typography>

        <Typography color="text.secondary" className="product-card-price">
          ₹ {product.price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          component={RouterLink}
          to={`/product/${product.id}`}
        >
          View
        </Button>
      </CardActions>
    </Card>
  );
}
