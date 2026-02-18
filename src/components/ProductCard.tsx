import type { Product } from "../types/product";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Card
      sx={{
        width: 280,
        height: 360,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardMedia
        component="img"
        image={product.thumbnail}
        alt={product.title}
        sx={{
          height: 160,
          objectFit: "cover",
        }}
      />

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography fontWeight={600} gutterBottom noWrap>
          {product.title}
        </Typography>
        <Typography color="text.secondary">₹ {product.price}</Typography>
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
