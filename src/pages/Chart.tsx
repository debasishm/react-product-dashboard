import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { BarChart, PieChart } from '@mui/x-charts';
import { useEffect, useState } from 'react';
import { getAllProducts } from '../services/product.service';
import type { Product } from '../types/product.types';

/**
 * Product analytics dashboard
 */
export default function Chart() {
  const [data, setData] = useState<{ category: string; count: number }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const chartHeight = isMobile ? 300 : 350;

  useEffect(() => {
    let ignore = false;

    const loadAnalytics = async () => {
      try {
        const products: Product[] = await getAllProducts(100);
        if (ignore) return;

        const categoryMap: Record<string, number> = {};

        products.forEach(p => {
          categoryMap[p.category] = (categoryMap[p.category] || 0) + 1;
        });

        const formatted = Object.entries(categoryMap)
          .map(([category, count]) => ({ category, count }))
          .sort((a, b) => b.count - a.count);

        setData(formatted);
      } catch {
        if (ignore) return;
        setError('Unable to load analytics data.');
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    loadAnalytics();

    return () => {
      ignore = true;
    };
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
      <Typography variant="h4" component="h1" mb={4}>
        Product Analytics
      </Typography>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h6" component="h2" gutterBottom>
            Products per category
          </Typography>
          <BarChart
            xAxis={[
              {
                scaleType: 'band',
                data: data.map(d => d.category),
                label: 'Category',
              },
            ]}
            yAxis={[{ label: 'Number of products' }]}
            series={[{ data: data.map(d => d.count) }]}
            height={350}
          />
          <Paper sx={{ p: { xs: 2, md: 3 } }}>
            <BarChart
              xAxis={[
                {
                  scaleType: 'band',
                  data: data.map(d => d.category),
                  tickLabelStyle: {
                    angle: -45,
                    textAnchor: 'end',
                    fontSize: 10,
                  },
                  height: 100,
                },
              ]}
              series={[
                {
                  data: data.map(d => d.count),
                  color: theme.palette.secondary.main,
                },
              ]}
              height={chartHeight}
            />
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h6" component="h2" gutterBottom>
            Products per category
          </Typography>
          <BarChart
            xAxis={[
              {
                scaleType: 'band',
                data: data.map(d => d.category),
                label: 'Category',
              },
            ]}
            yAxis={[{ label: 'Number of products' }]}
            series={[{ data: data.map(d => d.count) }]}
            height={350}
          />
          <Paper sx={{ p: { xs: 2, md: 3 } }}>
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
              hideLegend={isMobile}
              height={chartHeight}
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
