import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box, Container, Typography, Button, Grid, Chip, Stack, alpha,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Video, Hand, Baby, HelpingHand, Heart, Shield, UtensilsCrossed } from 'lucide-react';

const ministries = [
  { id: 1, name: 'Worship Team', icon: <Music />, description: 'Lead the congregation into God\'s presence through music and song.', members: 45, meeting: 'Sat 3pm', category: 'worship' },
  { id: 2, name: 'Media & Technical', icon: <Video />, description: 'Behind-the-scenes heroes managing sound, lights, and broadcast.', members: 30, meeting: 'Thu 5pm', category: 'technical' },
  { id: 3, name: 'Ushering & Protocol', icon: <Hand />, description: 'Create a warm, welcoming atmosphere with excellence and order.', members: 60, meeting: 'Sun 8am', category: 'hospitality' },
  { id: 4, name: 'Children\'s Ministry', icon: <Baby />, description: 'Nurture the next generation in the ways of the Lord.', members: 35, meeting: 'Wed 4pm', category: 'children' },
  { id: 5, name: 'Prayer & Intercession', icon: <HelpingHand />, description: 'Stand in the gap through prayer and spiritual warfare.', members: 50, meeting: 'Mon-Fri 5am', category: 'prayer' },
  { id: 6, name: 'Outreach & Missions', icon: <Heart />, description: 'Take the love of Christ beyond our walls to communities.', members: 40, meeting: 'Sat 8am', category: 'outreach' },
  { id: 7, name: 'Security Team', icon: <Shield />, description: 'Ensure a safe and secure environment for worship.', members: 25, meeting: 'Sat 10am', category: 'security' },
  { id: 8, name: 'Hospitality', icon: <UtensilsCrossed />, description: 'Serve with love through refreshments and visitor care.', members: 20, meeting: '1st Sun', category: 'hospitality' },
];

const categories = ['all', 'worship', 'technical', 'hospitality', 'children', 'prayer', 'outreach'];

const MinistriesSection = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const filtered = ministries.filter((m) => activeCategory === 'all' || m.category === activeCategory);

  return (
    <Box sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="overline" sx={{ color: 'primary.main', letterSpacing: '0.14em', display: 'block', mb: 1 }}>
            Serving With Purpose
          </Typography>
          <Typography variant="h2">Our Ministries & Workforce</Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', mt: 1, maxWidth: 600, mx: 'auto' }}>
            Every member is a minister. Discover where you can serve and make an impact.
          </Typography>
        </Box>

        <Stack direction="row" justifyContent="center" spacing={1} sx={{ mb: 4, flexWrap: 'wrap', gap: 1 }}>
          {categories.map((cat) => (
            <Chip
              key={cat}
              label={cat.charAt(0).toUpperCase() + cat.slice(1)}
              onClick={() => setActiveCategory(cat)}
              variant={activeCategory === cat ? 'filled' : 'outlined'}
              sx={{
                fontWeight: 600,
                bgcolor: activeCategory === cat ? 'primary.main' : 'transparent',
                color: activeCategory === cat ? 'white' : 'text.primary',
                borderColor: 'primary.main',
                '&:hover': { bgcolor: activeCategory === cat ? 'primary.dark' : alpha('#4169E1', 0.1) },
              }}
            />
          ))}
        </Stack>

        <Grid container spacing={3}>
          <AnimatePresence>
            {filtered.map((ministry) => (
              <Grid item xs={12} sm={6} md={3} key={ministry.id}>
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                >
                  <Box
                    sx={{
                      p: 3,
                      borderRadius: 4,
                      bgcolor: 'background.paper',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid',
                      borderColor: 'divider',
                      textAlign: 'center',
                      height: '100%',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-10px)',
                        boxShadow: '0 10px 30px -10px rgba(65,105,225,0.3)',
                        borderColor: 'primary.main',
                      },
                    }}
                  >
                    <Box sx={{ color: 'primary.main', mb: 2, '& svg': { width: 36, height: 36 } }}>
                      {ministry.icon}
                    </Box>
                    <Typography variant="h6" sx={{ mb: 1, fontFamily: "'Cormorant Garamond', serif" }}>
                      {ministry.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2, fontSize: '0.85rem' }}>
                      {ministry.description}
                    </Typography>
                    <Stack direction="row" justifyContent="center" spacing={1} sx={{ mb: 2 }}>
                      <Chip label={`${ministry.members} Members`} size="small" variant="outlined" />
                      <Chip label={ministry.meeting} size="small" variant="outlined" />
                    </Stack>
                    <Button component={Link} to="/ministries" size="small" sx={{ color: 'primary.main' }}>
                      Join Team ?
                    </Button>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </AnimatePresence>
        </Grid>

        <Box
          sx={{
            mt: 6,
            p: { xs: 4, md: 6 },
            borderRadius: 4,
            textAlign: 'center',
            background: (theme) =>
              theme.palette.mode === 'dark'
                ? 'linear-gradient(135deg, #1E3A8A, #000000)'
                : 'linear-gradient(135deg, #E8F0FE, #F8FAFC)',
          }}
        >
          <Typography variant="h4" sx={{ mb: 1, fontFamily: "'Cormorant Garamond', serif" }}>
            Ready to Serve?
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3 }}>
            Fill out our workforce interest form and we&apos;ll connect you with the right team.
          </Typography>
          <Button component={Link} to="/ministries" variant="contained" size="large">
            Join the Workforce
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default MinistriesSection;
