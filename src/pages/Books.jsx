import React from 'react';
import { Box } from '@mui/material';
import Seo from '../components/common/Seo';
import BooksSection from '../components/books/BooksSection';

const Books = () => {
  return (
    <>
      <Seo
        path="/books"
        title="Books & Resources | Dominion City"
        description="Browse life-transforming books and resources from Dominion City Church."
      />
      <Box sx={{ pt: '80px' }}>
        <BooksSection />
      </Box>
    </>
  );
};

export default Books;
