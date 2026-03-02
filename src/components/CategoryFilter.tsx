import { useEffect, useState } from "react";
import { TextField, MenuItem } from "@mui/material";
import { fetchCategories } from "../api/product.api";
import "../styles/ProductCard.css";
import { APP_TEXT } from "../constants/text.constants";

/**
 * CategoryFilter Component
 *
 * Displays a dropdown list of product categories.
 * Categories are fetched from API on component mount.
 */
interface Props {
  value: string;
  onChange: (category: string) => void;
}

export default function CategoryFilter({ value, onChange }: Props) {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  /**
   * Fetch categories on first render
   */
  useEffect(() => {
    fetchCategories()
      .then((data) => {
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
      className="category-filter"
    >
      <MenuItem value="">{APP_TEXT.ALL_CATEGORY}</MenuItem>

      {categories.map((cat) => (
        <MenuItem key={cat} value={cat}>
          {cat}
        </MenuItem>
      ))}
    </TextField>
  );
}
