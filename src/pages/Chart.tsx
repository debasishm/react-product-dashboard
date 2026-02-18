import { Box, Typography, Paper, CircularProgress } from "@mui/material";
import Grid from "@mui/material/Grid";
import { BarChart, PieChart } from "@mui/x-charts";
import { useEffect, useState } from "react";
import axios from "axios";

type CategoryStats = {
  category: string;
  count: number;
};

export default function Charts() {
  const [data, setData] = useState<CategoryStats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await axios.get("https://dummyjson.com/products?limit=100");
        const products = res.data.products;

        const map: Record<string, number> = {};
        products.forEach((p: any) => {
          map[p.category] = (map[p.category] || 0) + 1;
        });

        const formatted: CategoryStats[] = Object.keys(map).map((key) => ({
          category: key,
          count: map[key],
        }));

        setData(formatted);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Product Analytics
      </Typography>

      <Grid spacing={4}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Products per Category
            </Typography>

            <BarChart
              xAxis={[
                {
                  data: data.map((d) => d.category),
                  scaleType: "band",
                },
              ]}
              series={[
                {
                  data: data.map((d) => d.count),
                },
              ]}
              height={300}
            />
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Category Distribution
            </Typography>

            <PieChart
              series={[
                {
                  data: data.map((d, index) => ({
                    id: index,
                    label: d.category,
                    value: d.count,
                  })),
                },
              ]}
              height={300}
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
