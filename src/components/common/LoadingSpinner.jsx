import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const LoadingSpinner = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        gap: 2,
      }}
    >
      <CircularProgress size={60} sx={{ color: '#4169E1' }} />
      <Typography variant="body1" sx={{ color: 'text.secondary' }}>
        Loading...
      </Typography>
    </Box>
  );
};

export default LoadingSpinner;
