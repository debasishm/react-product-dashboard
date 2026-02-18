import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { useEffect, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { getFavorites, toggleFavorite } from "../utils/favorites";
import { useNavigate } from "react-router-dom";

type Product = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
};

export default function Dashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  // 🔹 Load favorite products
  const loadFavorites = async () => {
    const favoriteIds = getFavorites();

    if (favoriteIds.length === 0) {
      setProducts([]);
      return;
    }

    // Fetch each product by ID
    const requests = favoriteIds.map((id) =>
      fetch(`https://dummyjson.com/products/${id}`).then((res) => res.json()),
    );

    const results = await Promise.all(requests);
    setProducts(results);
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  const handleRemove = (id: number) => {
    toggleFavorite(id); // remove from localStorage
    setProducts((prev) => prev.filter((p) => p.id !== id)); // update UI immediately
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Favorite Products
      </Typography>

      {products.length === 0 && (
        <Typography color="text.secondary">
          No favorite products added yet.
        </Typography>
      )}

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={3} key={product.id}>
            <Card sx={{ height: "100%" }}>
              <CardMedia
                component="img"
                height="160"
                image={product.thumbnail}
                sx={{ objectFit: "contain", cursor: "pointer" }}
                onClick={() => navigate(`/products/${product.id}`)}
              />

              <CardContent>
                <Typography variant="h6" noWrap>
                  {product.title}
                </Typography>

                <Typography color="text.secondary">${product.price}</Typography>

                <Button
                  fullWidth
                  color="error"
                  startIcon={<FavoriteIcon />}
                  sx={{ mt: 1 }}
                  onClick={() => handleRemove(product.id)}
                >
                  Remove Favorite
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
