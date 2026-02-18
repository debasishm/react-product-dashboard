import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  CircularProgress,
  Card,
  CardMedia,
  Button,
  Divider,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { isFavorite, toggleFavorite } from "../utils/favorites";

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
  brand: string;
  category: string;
};

// type Comment = {
//   text: string;
//   date: string;
// };

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  // const [comment, setComment] = useState("");
  // const [comments, setComments] = useState<Comment[]>([]);
  const [fav, setFav] = useState(false);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`https://dummyjson.com/products/${id}`);
      setProduct(res.data);
    } catch (err) {
      console.error("Failed to load product", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (id) setFav(isFavorite(Number(id)));
  }, [id]);

  // const addComment = () => {
  //   if (!comment.trim()) return;

  //   const newComment: Comment = {
  //     text: comment,
  //     date: new Date().toLocaleString(),
  //   };

  //   const updated = [newComment, ...comments];
  //   setComments(updated);
  //   localStorage.setItem(`comments_${id}`, JSON.stringify(updated));
  //   setComment("");
  // };

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

      {/* <Typography variant="h5" mb={2}>
        Comments
      </Typography> */}

      {/* <Box mb={2}>
        <TextField
          fullWidth
          multiline
          minRows={3}
          placeholder="Write a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <Button variant="contained" sx={{ mt: 2 }} onClick={addComment}>
          Add Comment
        </Button>
      </Box>

      {comments.length === 0 && (
        <Typography color="text.secondary">No comments yet.</Typography>
      )}

      {comments.map((c, index) => (
        <Box
          key={index}
          p={2}
          mb={2}
          border="1px solid #e0e0e0"
          borderRadius={2}
        >
          <Typography variant="body2">{c.text}</Typography>
          <Typography variant="caption" color="text.secondary">
            {c.date}
          </Typography>
        </Box>
      ))} */}
    </Box>
  );
}
