import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Container, Typography, Button, Stack, alpha } from '@mui/material';
import { motion } from 'framer-motion';
import { Clock, MapPin } from 'lucide-react';

const events = [
  {
    id: 1, day: 15, month: 'MAR', title: 'Dominion Night of Glory', time: '6:00 PM',
    location: 'Main Auditorium', description: 'A special night of worship, prayer, and prophetic impartation with Dr. David Ogbueli.',
    tags: ['All Services', 'Prayer'], featured: true,
  },
  {
    id: 2, day: 22, month: 'MAR', title: 'Workforce Empowerment Summit', time: '9:00 AM',
    location: 'Conference Hall', description: 'Annual training and equipping for all workforce members across all units.',
    tags: ['Workforce', 'Training'], featured: false,
  },
  {
    id: 3, day: 5, month: 'APR', title: 'The Edge Youth Conference', time: '10:00 AM',
    location: 'Youth Centre', description: 'Empowering the next generation to take their place in God\'s purpose.',
    tags: ['Youth', 'Conference'], featured: false,
  },
  {
    id: 4, day: 12, month: 'APR', title: 'Women of Impact Breakfast', time: '8:00 AM',
    location: 'Fellowship Hall', description: 'A special gathering for women to connect, share, and be empowered.',
    tags: ['Women', 'Fellowship'], featured: false,
  },
];

const EventsSection = () => {
  return (
    <Box sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="overline" sx={{ color: 'primary.main', letterSpacing: 4, display: 'block', mb: 1 }}>
            Stay Connected
          </Typography>
          <Typography variant="h2">Upcoming Events</Typography>
        </Box>

        <Stack spacing={2} sx={{ maxWidth: 800, mx: 'auto' }}>
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Box
                sx={{
                  display: 'flex',
                  gap: 3,
                  p: { xs: 2, md: 3 },
                  borderRadius: 3,
                  bgcolor: 'background.paper',
                  border: '1px solid',
                  borderColor: event.featured ? 'primary.main' : 'divider',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 10px 30px -10px rgba(65,105,225,0.3)',
                    transform: 'translateY(-4px)',
                  },
                  flexDirection: { xs: 'column', sm: 'row' },
                  alignItems: { xs: 'flex-start', sm: 'center' },
                }}
              >
                <Box
                  sx={{
                    textAlign: 'center',
                    minWidth: 80,
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: alpha('#4169E1', 0.1),
                    color: 'primary.main',
                  }}
                >
                  <Typography variant="h4" sx={{ fontFamily: "'Cormorant Garamond', serif", lineHeight: 1, fontWeight: 700 }}>
                    {event.day}
                  </Typography>
                  <Typography variant="caption" sx={{ fontWeight: 600 }}>
                    {event.month}
                  </Typography>
                </Box>

                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" sx={{ fontFamily: "'Cormorant Garamond', serif", mb: 0.5 }}>
                    {event.title}
                  </Typography>
                  <Stack direction="row" spacing={2} sx={{ mb: 0.5, '& svg': { width: 14, height: 14 } }}>
                    <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'primary.main' }}>
                      <Clock /> {event.time}
                    </Typography>
                    <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'primary.main' }}>
                      <MapPin /> {event.location}
                    </Typography>
                  </Stack>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                    {event.description}
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    {event.tags.map((tag) => (
                      <Typography
                        key={tag}
                        variant="caption"
                        sx={{
                          px: 1.5,
                          py: 0.3,
                          borderRadius: 20,
                          bgcolor: alpha('#4169E1', 0.1),
                          color: 'primary.main',
                          fontWeight: 600,
                        }}
                      >
                        {tag}
                      </Typography>
                    ))}
                  </Stack>
                </Box>

                <Box>
                  {event.featured ? (
                    <Button variant="contained" size="small">Register</Button>
                  ) : (
                    <Button component={Link} to="/events" size="small" sx={{ color: 'primary.main' }}>
                      Learn More ?
                    </Button>
                  )}
                </Box>
              </Box>
            </motion.div>
          ))}
        </Stack>

        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button component={Link} to="/events" variant="contained">
            View All Events
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default EventsSection;
