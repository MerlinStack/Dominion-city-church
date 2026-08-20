import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Container, Typography, Button, Grid, IconButton, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import { Play, Download, Share2 } from 'lucide-react';

const sermons = [
  {
    id: 1, title: 'The Power of Dominion', preacher: 'Dr. David Ogbueli',
    date: 'Mar 10, 2024', thumbnail: '/images/sermons/sermon-1.jpg',
  },
  {
    id: 2, title: 'Raising Kingdom Leaders', preacher: 'Pastor Sarah Ogbueli',
    date: 'Mar 3, 2024', thumbnail: '/images/sermons/sermon-2.jpg',
  },
  {
    id: 3, title: 'Faith That Moves Mountains', preacher: 'Pastor Shola Olapade',
    date: 'Feb 25, 2024', thumbnail: '/images/sermons/sermon-3.jpg',
  },
];

const SermonsSection = () => {
  return (
    <Box sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="overline" sx={{ color: 'primary.main', letterSpacing: 4, display: 'block', mb: 1 }}>
            The Word
          </Typography>
          <Typography variant="h2">Latest Sermons</Typography>
        </Box>

        <Grid container spacing={4}>
          {sermons.map((sermon, index) => (
            <Grid item xs={12} sm={6} md={4} key={sermon.id}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Box
                  sx={{
                    borderRadius: 4,
                    overflow: 'hidden',
                    bgcolor: 'background.paper',
                    border: '1px solid',
                    borderColor: 'divider',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-10px)',
                      boxShadow: '0 10px 30px -10px rgba(65,105,225,0.3)',
                    },
                  }}
                >
                  <Box sx={{ position: 'relative', overflow: 'hidden', height: 200 }}>
                    <Box
                      component="img"
                      src={sermon.thumbnail}
                      alt={sermon.title}
                      sx={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        inset: 0,
                        bgcolor: 'rgba(0,0,0,0.4)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: 0,
                        transition: 'opacity 0.3s ease',
                        '&:hover': { opacity: 1 },
                      }}
                    >
                      <IconButton sx={{ bgcolor: 'primary.main', color: 'white', '&:hover': { bgcolor: 'primary.dark' } }}>
                        <Play />
                      </IconButton>
                    </Box>
                  </Box>
                  <Box sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ fontFamily: "'Cormorant Garamond', serif", mb: 0.5 }}>
                      {sermon.title}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'primary.main', display: 'block', mb: 2 }}>
                      {sermon.preacher} | {sermon.date}
                    </Typography>
                    <Stack direction="row" spacing={1}>
                      <IconButton size="small" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
                        <Play size={16} />
                      </IconButton>
                      <IconButton size="small" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
                        <Download size={16} />
                      </IconButton>
                      <IconButton size="small" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
                        <Share2 size={16} />
                      </IconButton>
                    </Stack>
                  </Box>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button component={Link} to="/sermons" variant="outlined">
            Watch More Sermons
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default SermonsSection;
