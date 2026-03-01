// src/pages/ProductDetail.tsx

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../services/product.service";
import {
  Box,
  Typography,
  CircularProgress,
  Card,
  CardMedia,
  Button,
  Divider,
  Rating,
  TextField,
  Alert,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { isFavorite, toggleFavorite } from "../utils/favourites";
import type { Product } from "../types/product.types";

/**
 * Product detail page
 */
export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [fav, setFav] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string>("");

  const [newRating, setNewRating] = useState<number | null>(0);
  const [newComment, setNewComment] = useState<string>("");

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;

      try {
        setLoading(true);
        setError(null);

        const data = await getProductById(id);
        setProduct(data);
        setSelectedImage(data.images?.[0] || data.thumbnail);
        setFav(isFavorite(Number(id)));
      } catch {
        setError("Unable to load product details.");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={6}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !product) {
    return <Alert severity="error">{error}</Alert>;
  }

  const discountedPrice = product.discountPercentage
    ? (
        product.price -
        (product.price * product.discountPercentage) / 100
      ).toFixed(2)
    : product.price.toFixed(2);

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
              image={selectedImage}
              alt={product.title}
              sx={{ objectFit: "cover" }}
            />
          </Card>

          <Grid container spacing={2} mt={1}>
            {product.images?.map((img) => (
              <Grid key={img} size={{ xs: 4 }}>
                <Card
                  onClick={() => setSelectedImage(img)}
                  sx={{
                    cursor: "pointer",
                    border:
                      selectedImage === img
                        ? "2px solid var(--color-primary)"
                        : "1px solid #eee",
                  }}
                >
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
          <Rating value={product.rating} precision={0.5} readOnly />

          <Typography variant="h5" color="primary" mt={2}>
            ${discountedPrice}
          </Typography>

          <Button
            variant="outlined"
            color={fav ? "error" : "primary"}
            startIcon={fav ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            sx={{ mt: 2, mb: 2 }}
            onClick={() => {
              toggleFavorite(product.id);
              setFav(!fav);
            }}
          >
            {fav ? "Remove from Favorites" : "Add to Favorites"}
          </Button>

          <Typography>{product.description}</Typography>
        </Grid>
      </Grid>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h6">Add a Review</Typography>

      <Rating value={newRating} onChange={(_, value) => setNewRating(value)} />

      <TextField
        fullWidth
        multiline
        rows={3}
        sx={{ mt: 2 }}
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />

      <Button
        variant="contained"
        sx={{ mt: 2 }}
        disabled={!newRating || !newComment}
      >
        Submit Review
      </Button>
    </Box>
  );
}
