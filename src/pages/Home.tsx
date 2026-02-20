import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  TextField,
  Pagination,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { fetchProducts } from "../api/productsApi";
import type { Product as ProductType } from "../types/product";
import CategoryFilter from "../components/CategoryFilter";
import { useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { toggleFavorite, getFavorites } from "../utils/favorites";

const LIMIT = 30;

export default function Home() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [favorites, setFavorites] = useState<number[]>(() => getFavorites());

  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts({
      page,
      limit: LIMIT,
      search: search || undefined,
      category: category || undefined,
    }).then((res) => {
      setProducts(res.products);
      setTotal(res.total);
    });
  }, [page, search, category]);

  return (
    <Box>
      <Box sx={{ mb: 4, p: 2, bgcolor: "#f5f5f5", borderRadius: 2 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label="Search products"
              fullWidth
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <CategoryFilter
              value={category}
              onChange={(val) => {
                setCategory(val);
                setSearch("");
                setPage(1);
              }}
            />
          </Grid>
        </Grid>
      </Box>

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid key={product.id} size={{ xs: 12, sm: 6, md: 3 }}>
            <Card sx={{ height: "100%" }}>
              <CardMedia
                component="img"
                height="160"
                image={product.thumbnail}
                sx={{ objectFit: "contain" }}
              />

              <CardContent>
                <Typography variant="h6" noWrap>
                  {product.title}
                </Typography>

                <Typography color="text.secondary">${product.price}</Typography>

                <Box sx={{ mt: 1, display: "flex", gap: 1 }}>
                  <Button
                    size="small"
                    onClick={() => navigate(`/products/${product.id}`)}
                  >
                    View
                  </Button>

                  <Button
                    size="small"
                    color={favorites.includes(product.id) ? "error" : "primary"}
                    startIcon={
                      favorites.includes(product.id) ? (
                        <FavoriteIcon />
                      ) : (
                        <FavoriteBorderIcon />
                      )
                    }
                    onClick={() => {
                      const updated = toggleFavorite(product.id);
                      setFavorites(updated);
                    }}
                  >
                    Fav
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Pagination
          count={Math.ceil(total / LIMIT)}
          page={page}
          onChange={(_, val) => setPage(val)}
        />
      </Box>
    </Box>
  );
}
