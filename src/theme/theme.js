import { createTheme } from '@mui/material/styles';

const commonTheme = {
  typography: {
    fontFamily: "'Inter', sans-serif",
    h1: {
      fontFamily: "'Cormorant Garamond', serif",
      fontWeight: 600,
      lineHeight: 1.1,
    },
    h2: {
      fontFamily: "'Cormorant Garamond', serif",
      fontWeight: 600,
      lineHeight: 1.15,
    },
    h3: {
      fontFamily: "'Cormorant Garamond', serif",
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h4: {
      fontFamily: "'Cormorant Garamond', serif",
      fontWeight: 600,
      lineHeight: 1.25,
    },
    h5: {
      fontFamily: "'Cormorant Garamond', serif",
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h6: {
      fontFamily: "'Cormorant Garamond', serif",
      fontWeight: 600,
      lineHeight: 1.35,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      letterSpacing: 0,
    },
    overline: {
      textTransform: 'none',
      letterSpacing: '0.14em',
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
          borderRadius: 999,
          padding: '10px 28px',
          fontSize: '0.9rem',
          fontWeight: 600,
        },
        contained: {
          boxShadow: '0 4px 16px -4px rgba(65, 105, 225, 0.35)',
          '&:hover': {
            boxShadow: '0 8px 24px -6px rgba(65, 105, 225, 0.45)',
          },
        },
        outlined: {
          '&:hover': {
            boxShadow: '0 4px 14px -6px rgba(65, 105, 225, 0.3)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: 'none',
          border: '1px solid',
          borderColor: 'rgba(255,255,255,0.06)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          fontWeight: 500,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: 'none',
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
      default: '#0B1120',
      paper: '#0F172A',
    },
    divider: 'rgba(255,255,255,0.06)',
    text: {
      primary: '#E6EAF2',
      secondary: '#94A3B8',
    },
    action: {
      hover: 'rgba(255,255,255,0.06)',
      selected: 'rgba(65,105,225,0.16)',
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
      default: '#FAF7F2',
      paper: '#FFFFFF',
    },
    divider: 'rgba(15,23,42,0.08)',
    text: {
      primary: '#1E293B',
      secondary: '#5B6472',
    },
    action: {
      hover: 'rgba(15,23,42,0.05)',
      selected: 'rgba(65,105,225,0.12)',
    },
  },
});