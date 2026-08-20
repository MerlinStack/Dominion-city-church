import React from 'react';
import { Box } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import BooksSection from '../components/books/BooksSection';

const Books = () => {
  return (
    <>
      <Helmet>
        <title>Books & Resources | Dominion City</title>
        <meta name="description" content="Browse and purchase life-transforming books and resources from Dominion City Church." />
      </Helmet>
      <Box sx={{ pt: '80px' }}>
        <BooksSection />
      </Box>
    </>
  );
};

export default Books;
