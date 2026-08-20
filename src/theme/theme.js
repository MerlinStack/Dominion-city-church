import { createTheme } from '@mui/material/styles';

const commonTheme = {
  typography: {
    fontFamily: "'Inter', sans-serif",
    h1: {
      fontFamily: "'Cormorant Garamond', serif",
      fontWeight: 700,
    },
    h2: {
      fontFamily: "'Cormorant Garamond', serif",
      fontWeight: 600,
    },
    h3: {
      fontFamily: "'Cormorant Garamond', serif",
      fontWeight: 600,
    },
    h4: {
      fontFamily: "'Cormorant Garamond', serif",
      fontWeight: 600,
    },
    h5: {
      fontFamily: "'Cormorant Garamond', serif",
      fontWeight: 600,
    },
    h6: {
      fontFamily: "'Cormorant Garamond', serif",
      fontWeight: 600,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 40,
          padding: '12px 32px',
          fontSize: '0.9rem',
          fontWeight: 600,
        },
        contained: {
          boxShadow: '0 5px 20px rgba(65, 105, 225, 0.3)',
          '&:hover': {
            boxShadow: '0 8px 25px rgba(65, 105, 225, 0.4)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          backdropFilter: 'blur(10px)',
        },
      },
    },
  },
};

export const darkTheme = createTheme({
  ...commonTheme,
  palette: {
    mode: 'dark',
    primary: {
      main: '#4169E1',
      light: '#6B8CFF',
      dark: '#2E4DB0',
    },
    secondary: {
      main: '#1E3A8A',
    },
    background: {
      default: '#000000',
      paper: '#0A0A0A',
    },
    text: {
      primary: '#F1F5F9',
      secondary: '#CBD5E1',
    },
  },
});

export const lightTheme = createTheme({
  ...commonTheme,
  palette: {
    mode: 'light',
    primary: {
      main: '#4169E1',
      light: '#6B8CFF',
      dark: '#2E4DB0',
    },
    secondary: {
      main: '#E8F0FE',
    },
    background: {
      default: '#F8FAFC',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1E293B',
      secondary: '#475569',
    },
  },
});