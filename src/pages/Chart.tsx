// src/pages/Chart.tsx

import { Box, Typography, Paper, CircularProgress, Alert } from "@mui/material";
import Grid from "@mui/material/Grid";
import { BarChart, PieChart } from "@mui/x-charts";
import { useEffect, useState } from "react";
import { getAllProducts } from "../services/product.service";
import type { Product } from "../types/product.types";

/**
 * Product analytics dashboard
 */
export default function Charts() {
  const [data, setData] = useState<{ category: string; count: number }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const products: Product[] = await getAllProducts(100);

        const categoryMap: Record<string, number> = {};

        products.forEach((p) => {
          categoryMap[p.category] = (categoryMap[p.category] || 0) + 1;
        });

        const formatted = Object.entries(categoryMap)
          .map(([category, count]) => ({ category, count }))
          .sort((a, b) => b.count - a.count);

        setData(formatted);
      } catch {
        setError("Unable to load analytics data.");
      } finally {
        setLoading(false);
      }
    };

    loadAnalytics();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={8}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box>
      <Typography variant="h4" mb={4}>
        Product Analytics
      </Typography>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3 }}>
            <BarChart
              xAxis={[{ scaleType: "band", data: data.map((d) => d.category) }]}
              series={[{ data: data.map((d) => d.count) }]}
              height={350}
            />
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3 }}>
            <PieChart
              series={[
                {
                  data: data.map((d, index) => ({
                    id: index,
                    value: d.count,
                    label: d.category,
                  })),
                },
              ]}
              height={350}
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
