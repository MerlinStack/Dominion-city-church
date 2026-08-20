import React, { useState } from 'react';
import { Box, Container, Typography, Button, Grid, IconButton, Chip, Stack } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Play, Download, Share2, User, Calendar, Headphones } from 'lucide-react';

const sermons = [
  { id: 1, title: 'The Power of Dominion', preacher: 'Dr. David Ogbueli', date: '2024-03-10', thumbnail: '/images/sermons/sermon-1.jpg', series: 'Dominion Life', duration: '45:32', videoUrl: 'https://www.youtube.com/embed/example1', description: 'Understanding your authority in Christ and how to walk in dominion.' },
  { id: 2, title: 'Raising Kingdom Leaders', preacher: 'Pastor Sarah Ogbueli', date: '2024-03-03', thumbnail: '/images/sermons/sermon-2.jpg', series: 'Leadership Series', duration: '52:18', videoUrl: 'https://www.youtube.com/embed/example2', description: 'Discovering the principles of raising leaders who will impact generations.' },
  { id: 3, title: 'Faith That Moves Mountains', preacher: 'Pastor Shola Olapade', date: '2024-02-25', thumbnail: '/images/sermons/sermon-3.jpg', series: 'Faith Foundations', duration: '38:45', videoUrl: 'https://www.youtube.com/embed/example3', description: 'Building unshakeable faith that produces extraordinary results.' },
  { id: 4, title: 'The Spirit of Wisdom', preacher: 'Dr. David Ogbueli', date: '2024-02-18', thumbnail: '/images/sermons/sermon-4.jpg', series: 'Wisdom for Living', duration: '55:20', videoUrl: 'https://www.youtube.com/embed/example4', description: 'Accessing the Spirit of wisdom for supernatural success.' },
  { id: 5, title: 'Financial Freedom', preacher: 'Pastor John Adekunle', date: '2024-02-11', thumbnail: '/images/sermons/sermon-5.jpg', series: 'Financial Freedom', duration: '42:15', videoUrl: 'https://www.youtube.com/embed/example5', description: 'Biblical principles for financial breakthrough and stewardship.' },
  { id: 6, title: 'The Power of Prayer', preacher: 'Dr. David Ogbueli', date: '2024-02-04', thumbnail: '/images/sermons/sermon-6.jpg', series: 'Prayer School', duration: '48:50', videoUrl: 'https://www.youtube.com/embed/example6', description: 'Unlocking the power of prayer for supernatural results.' },
];

const seriesList = ['All Series', 'Dominion Life', 'Leadership Series', 'Faith Foundations', 'Wisdom for Living', 'Financial Freedom', 'Prayer School'];

const Sermons = () => {
  const [selectedSeries, setSelectedSeries] = useState('All Series');
  const [selectedSermon, setSelectedSermon] = useState(sermons[0]);

  const filtered = selectedSeries === 'All Series' ? sermons : sermons.filter((s) => s.series === selectedSeries);

  const formatDate = (dateString) => new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <>
      <Helmet>
        <title>Sermons | Dominion City</title>
        <meta name="description" content="Listen and watch sermons by Dr. David Ogbueli and other ministers at Dominion City." />
      </Helmet>
      <Box sx={{ pt: '80px' }}>
        <Box sx={{ py: { xs: 8, md: 12 }, textAlign: 'center', background: (theme) =>
          theme.palette.mode === 'dark' ? 'linear-gradient(135deg, #000000, #1E3A8A)' : 'linear-gradient(135deg, #F8FAFC, #E8F0FE)',
        }}>
          <Container maxWidth="md">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Typography variant="h1" sx={{ fontSize: { xs: '2.5rem', md: '4rem' }, mb: 2 }}>Sermons & Messages</Typography>
              <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 300 }}>Listen to life-transforming messages anytime, anywhere</Typography>
            </motion.div>
          </Container>
        </Box>

        <Box sx={{ py: { xs: 6, md: 8 } }}>
          <Container maxWidth="lg">
            <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', md: 'row' }, mb: 6, p: { xs: 2, md: 3 }, borderRadius: 4, bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider' }}>
              <Box sx={{ flex: { xs: 'none', md: 1.5 }, aspectRatio: '16/9', borderRadius: 3, overflow: 'hidden', bgcolor: '#000' }}>
                <Box component="iframe" src={selectedSermon.videoUrl} title={selectedSermon.title}
                  sx={{ width: '100%', height: '100%', border: 'none' }} allowFullScreen />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h4" sx={{ fontFamily: "'Cormorant Garamond', serif", mb: 1 }}>{selectedSermon.title}</Typography>
                <Stack direction="row" spacing={2} sx={{ mb: 2, '& svg': { width: 16, height: 16 } }}>
                  <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'primary.main' }}>
                    <User /> {selectedSermon.preacher}
                  </Typography>
                  <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'primary.main' }}>
                    <Calendar /> {formatDate(selectedSermon.date)}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'primary.main' }}>{selectedSermon.duration}</Typography>
                </Stack>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>{selectedSermon.description}</Typography>
                <Stack direction="row" spacing={2}>
                  <Button variant="contained" startIcon={<Download size={16} />}>Download</Button>
                  <Button variant="outlined" startIcon={<Share2 size={16} />}>Share</Button>
                </Stack>
              </Box>
            </Box>

            <Stack direction="row" justifyContent="center" spacing={1} sx={{ mb: 4, flexWrap: 'wrap', gap: 1 }}>
              {seriesList.map((series) => (
                <Chip key={series} label={series} onClick={() => setSelectedSeries(series)}
                  variant={selectedSeries === series ? 'filled' : 'outlined'}
                  sx={{ fontWeight: 600, bgcolor: selectedSeries === series ? 'primary.main' : 'transparent',
                    color: selectedSeries === series ? 'white' : 'text.primary', borderColor: 'primary.main' }}
                />
              ))}
            </Stack>

            <Grid container spacing={3}>
              <AnimatePresence>
                {filtered.map((sermon, index) => (
                  <Grid item xs={12} sm={6} md={4} key={sermon.id}>
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 30 }} transition={{ duration: 0.5, delay: index * 0.05 }}>
                      <Box sx={{ borderRadius: 4, overflow: 'hidden', bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', transition: 'all 0.3s ease', '&:hover': { transform: 'translateY(-8px)', boxShadow: '0 10px 30px -10px rgba(65,105,225,0.3)' } }}>
                        <Box sx={{ position: 'relative', height: 180, overflow: 'hidden' }}>
                          <Box component="img" src={sermon.thumbnail} alt={sermon.title}
                            sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                          <Box onClick={() => setSelectedSermon(sermon)}
                            sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', opacity: 0, transition: 'opacity 0.3s ease', '&:hover': { opacity: 1 } }}>
                            <IconButton sx={{ bgcolor: 'primary.main', color: 'white', '&:hover': { bgcolor: 'primary.dark' } }}><Play /></IconButton>
                          </Box>
                        </Box>
                        <Box sx={{ p: 3 }}>
                          <Typography variant="h6" sx={{ fontFamily: "'Cormorant Garamond', serif", mb: 1 }}>{sermon.title}</Typography>
                          <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                            <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'primary.main' }}><User size={12} /> {sermon.preacher}</Typography>
                            <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'primary.main' }}><Calendar size={12} /> {formatDate(sermon.date)}</Typography>
                          </Stack>
                          <Stack direction="row" spacing={1}>
                            <Button size="small" startIcon={<Play size={14} />} onClick={() => setSelectedSermon(sermon)}>Watch</Button>
                            <Button size="small" startIcon={<Headphones size={14} />}>Audio</Button>
                          </Stack>
                        </Box>
                      </Box>
                    </motion.div>
                  </Grid>
                ))}
              </AnimatePresence>
            </Grid>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default Sermons;
