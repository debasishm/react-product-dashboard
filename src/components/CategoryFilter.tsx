import { useEffect, useState } from "react";
import { TextField, MenuItem } from "@mui/material";
import { fetchCategories } from "../api/productsApi";

interface Props {
  value: string;
  onChange: (category: string) => void;
}

export default function CategoryFilter({ value, onChange }: Props) {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories()
      .then((data) => {
        console.log("Categories:", data);
        setCategories(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <TextField
      select
      fullWidth
      label="Select Category"
      value={value}
      disabled={loading}
      onChange={(e) => onChange(e.target.value)}
      sx={{ minWidth: 250 }}
    >
      <MenuItem value="">All Categories</MenuItem>

      {categories.map((cat) => (
        <MenuItem key={cat} value={cat}>
          {cat}
        </MenuItem>
      ))}
    </TextField>
  );
}
