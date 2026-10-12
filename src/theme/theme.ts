import { createTheme, responsiveFontSizes } from '@mui/material/styles';

// MUI has primary and secondary built in. These lines teach TypeScript
// about our extra `tertiary` color so it can be used like the others.
declare module '@mui/material/styles' {
  interface Palette {
    tertiary: Palette['primary'];
  }
  interface PaletteOptions {
    tertiary?: PaletteOptions['primary'];
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    tertiary: true;
  }
}

// Values mirror the design tokens in src/index.css - keep them in sync.
const baseTheme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#4791db',
      dark: '#125ea8',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#00796b',
      light: '#48a999',
      dark: '#004d40',
      contrastText: '#ffffff',
    },
    tertiary: {
      main: '#ffb300',
      light: '#ffc947',
      dark: '#c68400',
      contrastText: '#212121',
    },
    error: { main: '#d32f2f' },
    success: { main: '#2e7d32' },
    background: { default: '#fafafa', paper: '#ffffff' },
    text: { primary: '#212121', secondary: '#616161' },
  },

  // 1 spacing unit = 8px, so sx={{ p: 3 }} means 24px
  spacing: 8,
  shape: { borderRadius: 8 },

  typography: {
    fontFamily: [
      'system-ui',
      '-apple-system',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: { fontSize: '2.5rem', fontWeight: 600, lineHeight: 1.25 },
    h2: { fontSize: '2rem', fontWeight: 600, lineHeight: 1.25 },
    h3: { fontSize: '1.75rem', fontWeight: 600, lineHeight: 1.25 },
    h4: { fontSize: '1.5rem', fontWeight: 600, lineHeight: 1.25 },
    h5: { fontSize: '1.25rem', fontWeight: 600, lineHeight: 1.25 },
    h6: { fontSize: '1.125rem', fontWeight: 600, lineHeight: 1.25 },
    body1: { fontSize: '1rem', lineHeight: 1.5 },
    body2: { fontSize: '0.875rem', lineHeight: 1.5 },
    button: { textTransform: 'none', fontWeight: 600 },
  },

  // Component states: hover, active, disabled, focus
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          transition: 'background-color 150ms ease, transform 150ms ease',
          '&:active': { transform: 'scale(0.98)' },
          '&.Mui-disabled': { opacity: 0.5 },
          '&:focus-visible': {
            outline: '2px solid #1976d2',
            outlineOffset: 2,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)',
        },
      },
    },
  },
});

// Headings shrink automatically on small screens
const theme = responsiveFontSizes(baseTheme);

export default theme;
