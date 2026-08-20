import React, { useState } from 'react';
import { Box, Container, Typography, Button, Stack, TextField, Chip, alpha } from '@mui/material';
import { motion } from 'framer-motion';
import Seo from '../components/common/Seo';
import { Clock, MapPin, Tag } from 'lucide-react';
import { toast } from 'react-toastify';

const events = [
  { id: 1, title: 'Dominion Night of Glory', date: '2024-03-15', time: '6:00 PM', location: 'Main Auditorium', description: 'A special night of worship, prayer, and prophetic impartation with Dr. David Ogbueli.', category: 'conference', featured: true, tags: ['All Services', 'Prayer'] },
  { id: 2, title: 'Workforce Empowerment Summit', date: '2024-03-22', time: '9:00 AM', location: 'Conference Hall', description: 'Annual training and equipping for all workforce members across all units.', category: 'training', tags: ['Workforce', 'Training'] },
  { id: 3, title: 'The Edge Youth Conference', date: '2024-04-05', time: '10:00 AM', location: 'Youth Centre', description: 'Empowering the next generation to take their place in God\'s purpose.', category: 'youth', tags: ['Youth', 'Conference'] },
  { id: 4, title: 'Women of Impact Breakfast', date: '2024-04-12', time: '8:00 AM', location: 'Fellowship Hall', description: 'A special gathering for women to connect, share, and be empowered.', category: 'women', tags: ['Women', 'Fellowship'] },
  { id: 5, title: 'Community Outreach Day', date: '2024-04-19', time: '8:00 AM', location: 'Various Locations', description: 'Taking the love of Christ to our community through various outreach programs.', category: 'outreach', tags: ['Outreach', 'Community'] },
  { id: 6, title: 'Men of Honour Summit', date: '2024-04-26', time: '9:00 AM', location: 'Main Auditorium', description: 'Equipping men to fulfill their God-given mandate in family and society.', category: 'men', tags: ['Men', 'Summit'] },
];

const categories = ['all', 'conference', 'training', 'youth', 'women', 'men', 'outreach'];

const Events = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = events.filter((event) => {
    const matchesCat = selectedCategory === 'all' || event.category === selectedCategory;
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleRegister = (title) => {
    toast.success(`Registration for ${title} opened! You will receive details via email.`);
  };

  const formatDate = (dateString) => {
    if (!dateString) return { day: '--', month: '---' };
    const date = new Date(dateString);
    return { day: date.getDate(), month: date.toLocaleString('default', { month: 'short' }).toUpperCase() };
  };

  return (
    <>
      <Seo
        path="/events"
        title="Events | Dominion City"
        description="Stay updated with all upcoming events, conferences, and programs at Dominion City."
      />
      <Box sx={{ pt: '80px' }}>
        <Box sx={{ py: { xs: 8, md: 12 }, textAlign: 'center', background: (theme) =>
          theme.palette.mode === 'dark' ? 'linear-gradient(135deg, #000000, #1E3A8A)' : 'linear-gradient(135deg, #F8FAFC, #E8F0FE)',
        }}>
          <Container maxWidth="md">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Typography variant="h1" sx={{ fontSize: { xs: '2.5rem', md: '4rem' }, mb: 2 }}>Upcoming Events</Typography>
              <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 300 }}>Join us for life-changing experiences</Typography>
            </motion.div>
          </Container>
        </Box>

        <Box sx={{ py: { xs: 6, md: 8 } }}>
          <Container maxWidth="lg">
            <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems="center" spacing={2} sx={{ mb: 4 }}>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {categories.map((cat) => (
                  <Chip key={cat} label={cat.charAt(0).toUpperCase() + cat.slice(1)}
                    onClick={() => setSelectedCategory(cat)}
                    variant={selectedCategory === cat ? 'filled' : 'outlined'}
                    sx={{ fontWeight: 600, bgcolor: selectedCategory === cat ? 'primary.main' : 'transparent',
                      color: selectedCategory === cat ? 'white' : 'text.primary', borderColor: 'primary.main' }}
                  />
                ))}
              </Stack>
              <TextField size="small" placeholder="Search events..." value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{ minWidth: 250, '& .MuiOutlinedInput-root': { borderRadius: 4 } }} />
            </Stack>

            <Stack spacing={2}>
              {filtered.map((event, index) => {
                const date = formatDate(event.date);
                return (
                  <motion.div key={event.id} initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.05 }} viewport={{ once: true }}>
                    <Box sx={{ display: 'flex', gap: 3, p: { xs: 2, md: 3 }, borderRadius: 3,
                      bgcolor: 'background.paper', border: '1px solid',
                      borderColor: event.featured ? 'primary.main' : 'divider',
                      transition: 'all 0.3s ease', '&:hover': { boxShadow: '0 10px 30px -10px rgba(65,105,225,0.3)', transform: 'translateY(-2px)' },
                      flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center',
                    }}>
                      <Box sx={{ textAlign: 'center', minWidth: 80, p: 1.5, borderRadius: 2, bgcolor: alpha('#4169E1', 0.1), color: 'primary.main' }}>
                        <Typography variant="h4" sx={{ fontFamily: "'Cormorant Garamond', serif", lineHeight: 1, fontWeight: 700 }}>{date.day}</Typography>
                        <Typography variant="caption" sx={{ fontWeight: 600 }}>{date.month}</Typography>
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="h6" sx={{ fontFamily: "'Cormorant Garamond', serif" }}>{event.title}</Typography>
                        <Stack direction="row" spacing={2} sx={{ '& svg': { width: 14, height: 14 } }}>
                          <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'primary.main' }}>
                            <Clock /> {event.time}
                          </Typography>
                          <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'primary.main' }}>
                            <MapPin /> {event.location}
                          </Typography>
                        </Stack>
                        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>{event.description}</Typography>
                        <Stack direction="row" spacing={1}>
                          {event.tags?.map((tag) => (
                            <Typography key={tag} variant="caption" sx={{ px: 1.5, py: 0.3, borderRadius: 20, bgcolor: alpha('#4169E1', 0.1), color: 'primary.main', fontWeight: 600 }}>
                              <Tag size={10} style={{ marginRight: 4 }} />{tag}
                            </Typography>
                          ))}
                        </Stack>
                      </Box>
                      <Button variant={event.featured ? 'contained' : 'outlined'} size="small" onClick={() => handleRegister(event.title)}>
                        {event.featured ? 'Register Now' : 'Learn More'}
                      </Button>
                    </Box>
                  </motion.div>
                );
              })}
            </Stack>

            {filtered.length === 0 && (
              <Typography sx={{ textAlign: 'center', py: 8, color: 'text.secondary' }}>
                No events found matching your criteria.
              </Typography>
            )}
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default Events;
