import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { useThemeStore } from '../stores/useThemeStore';
import { darkTheme, lightTheme } from './theme';

export const AppThemeProvider = ({ children }) => {
  const mode = useThemeStore((s) => s.mode);
  const theme = mode === 'dark' ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
