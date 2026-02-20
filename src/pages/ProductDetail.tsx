import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../api/productsApi";
import {
  Box,
  Typography,
  CircularProgress,
  Card,
  CardMedia,
  Button,
  Divider,
  Rating,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { isFavorite, toggleFavorite } from "../utils/favorites";
import type { Product } from "../types/product";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [fav, setFav] = useState(false);

  const fetchProduct = async () => {
    if (!id) return;

    try {
      setLoading(true);
      const data = await fetchProductById(id);
      setProduct(data);
    } catch (err) {
      console.error("Failed to load product", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchProduct();
  }, [id]);

  useEffect(() => {
    if (id) setFav(isFavorite(Number(id)));
  }, [id]);

  if (loading || !product) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" fontWeight={600} mb={3}>
        {product.title}
      </Typography>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardMedia
              component="img"
              height="350"
              image={product.images[0]}
              alt={product.title}
              sx={{ objectFit: "cover" }}
            />
          </Card>

          <Grid container spacing={2} sx={{ mt: 1 }}>
            {product.images.slice(1, 4).map((img, index) => (
              <Grid key={index} size={{ xs: 4 }}>
                <Card>
                  <CardMedia
                    component="img"
                    height="100"
                    image={img}
                    sx={{ objectFit: "cover" }}
                  />
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h5" color="primary" mb={1}>
            ${product.price}
          </Typography>

          <Button
            variant="outlined"
            color={fav ? "error" : "primary"}
            startIcon={fav ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            sx={{ mt: 2, mb: 2 }}
            onClick={() => {
              toggleFavorite(product.id);
              setFav((prev) => !prev);
            }}
          >
            {fav ? "Remove from Favorites" : "Add to Favorites"}
          </Button>

          <Typography variant="body1" mb={2}>
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

      <Divider sx={{ my: 4 }} />

      <Typography variant="h5" mb={2}>
        Reviews
      </Typography>

      {!product.reviews || product.reviews.length === 0 ? (
        <Typography color="text.secondary">No reviews available.</Typography>
      ) : (
        product.reviews.map((review, index) => (
          <Box
            key={index}
            p={2}
            mb={2}
            border="1px solid #e0e0e0"
            borderRadius={2}
          >
            <Typography fontWeight={600}>{review.reviewerName}</Typography>

            <Rating
              value={review.rating}
              readOnly
              size="small"
              sx={{ mb: 1 }}
            />

            <Typography variant="body2">{review.comment}</Typography>

            <Typography variant="caption" color="text.secondary">
              {new Date(review.date).toLocaleDateString()}
            </Typography>
          </Box>
        ))
      )}
    </Box>
  );
}
