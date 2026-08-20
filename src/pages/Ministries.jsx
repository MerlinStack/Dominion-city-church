import React, { useState } from 'react';
import { Box, Container, Typography, Button, Grid, Chip, Stack, TextField, MenuItem, Checkbox, FormControlLabel, alpha } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import Seo from '../components/common/Seo';
import { toast } from 'react-toastify';
import { Music, Video, Hand, Baby, HelpingHand, Heart, Shield, UtensilsCrossed, HandHelping, Users } from 'lucide-react';

const ministries = [
  { id: 1, name: 'Worship Team', icon: <Music />, description: 'Lead the congregation into God\'s presence through music and song.', members: 45, meeting: 'Sat 3pm', category: 'worship', requirements: ['Must be a committed member for at least 6 months', 'Must have musical skill (instrument/vocal)', 'Must attend weekly rehearsals', 'Must have a servant\'s heart'] },
  { id: 2, name: 'Media & Technical', icon: <Video />, description: 'Behind-the-scenes heroes managing sound, lights, and broadcast.', members: 30, meeting: 'Thu 5pm', category: 'technical', requirements: ['Technical aptitude or willingness to learn', 'Ability to work under pressure', 'Team player', 'Available for all services'] },
  { id: 3, name: 'Ushering & Protocol', icon: <Hand />, description: 'Create a warm, welcoming atmosphere with excellence and order.', members: 60, meeting: 'Sun 8am', category: 'hospitality', requirements: ['Friendly and welcoming demeanor', 'Punctuality and reliability', 'Good communication skills', 'Professional appearance'] },
  { id: 4, name: 'Children\'s Ministry', icon: <Baby />, description: 'Nurture the next generation in the ways of the Lord.', members: 35, meeting: 'Wed 4pm', category: 'children', requirements: ['Love for children', 'Patience and creativity', 'Background check required', 'Teaching ability'] },
  { id: 5, name: 'Prayer & Intercession', icon: <HelpingHand />, description: 'Stand in the gap through prayer and spiritual warfare.', members: 50, meeting: 'Mon-Fri 5am', category: 'prayer', requirements: ['Consistent prayer life', 'Ability to wake up for early prayers', 'Spiritual maturity', 'Filled with the Holy Spirit'] },
  { id: 6, name: 'Outreach & Missions', icon: <Heart />, description: 'Take the love of Christ beyond our walls to communities.', members: 40, meeting: 'Sat 8am', category: 'outreach', requirements: ['Compassionate heart', 'Available on Saturdays', 'Good interpersonal skills', 'Willingness to serve anywhere'] },
  { id: 7, name: 'Security Team', icon: <Shield />, description: 'Ensure a safe and secure environment for worship.', members: 25, meeting: 'Sat 10am', category: 'security', requirements: ['Physically fit', 'Alert and observant', 'Calm under pressure', 'Security training provided'] },
  { id: 8, name: 'Hospitality', icon: <UtensilsCrossed />, description: 'Serve with love through refreshments and visitor care.', members: 20, meeting: '1st Sun', category: 'hospitality', requirements: ['Warm and welcoming', 'Attention to detail', 'Food handling certification', 'Team player'] },
  { id: 9, name: 'Counselling Ministry', icon: <HandHelping />, description: 'Provide biblical counsel and support to those in need.', members: 15, meeting: 'By appointment', category: 'counselling', requirements: ['Biblical knowledge', 'Training in counselling', 'Confidentiality', 'Emotional maturity'] },
];

const categories = ['all', 'worship', 'technical', 'hospitality', 'children', 'prayer', 'outreach', 'security', 'counselling'];

const Ministries = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedMinistry, setSelectedMinistry] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '', ministry: '',
    testimony: '', agree: false,
  });

  const filtered = ministries.filter((m) => activeCategory === 'all' || m.category === activeCategory);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.agree) {
      toast.error('Please confirm that you have been a member for at least 3 months');
      return;
    }
    toast.success('Application submitted successfully! We will contact you soon.');
    setFormData({ firstName: '', lastName: '', email: '', phone: '', ministry: '', testimony: '', agree: false });
    setSelectedMinistry(null);
  };

  return (
    <>
      <Seo
        path="/ministries"
        title="Ministries & Workforce | Dominion City"
        description="Discover various ministries and workforce units at Dominion City where you can serve and make an impact."
      />
      <Box sx={{ pt: '80px' }}>
        <Box sx={{ py: { xs: 8, md: 12 }, textAlign: 'center', background: (theme) =>
          theme.palette.mode === 'dark' ? 'linear-gradient(135deg, #000000, #1E3A8A)' : 'linear-gradient(135deg, #F8FAFC, #E8F0FE)',
        }}>
          <Container maxWidth="md">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Typography variant="h1" sx={{ fontSize: { xs: '2.5rem', md: '4rem' }, mb: 2 }}>
                Our Ministries & Workforce
              </Typography>
              <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 300 }}>
                Find your place to serve and make an eternal impact
              </Typography>
            </motion.div>
          </Container>
        </Box>

        <Box sx={{ py: { xs: 8, md: 12 } }}>
          <Container maxWidth="lg">
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Typography variant="overline" sx={{ color: 'primary.main', letterSpacing: '0.14em', display: 'block', mb: 1 }}>
                Serve With Purpose
              </Typography>
              <Typography variant="h2">Workforce Departments</Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', mt: 1 }}>
                Every member is a minister. Discover where God is calling you to serve.
              </Typography>
            </Box>

            <Stack direction="row" justifyContent="center" spacing={1} sx={{ mb: 4, flexWrap: 'wrap', gap: 1 }}>
              {categories.map((cat) => (
                <Chip key={cat} label={cat.charAt(0).toUpperCase() + cat.slice(1)}
                  onClick={() => setActiveCategory(cat)}
                  variant={activeCategory === cat ? 'filled' : 'outlined'}
                  sx={{ fontWeight: 600, bgcolor: activeCategory === cat ? 'primary.main' : 'transparent',
                    color: activeCategory === cat ? 'white' : 'text.primary', borderColor: 'primary.main',
                    '&:hover': { bgcolor: activeCategory === cat ? 'primary.dark' : alpha('#4169E1', 0.1) },
                  }}
                />
              ))}
            </Stack>

            <Grid container spacing={3}>
              <AnimatePresence>
                {filtered.map((ministry) => (
                  <Grid item xs={12} sm={6} md={4} key={ministry.id}>
                    <motion.div layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}>
                      <Box sx={{ p: 3, borderRadius: 4, bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', height: '100%' }}>
                        <Box sx={{ color: 'primary.main', mb: 2, '& svg': { width: 36, height: 36 } }}>{ministry.icon}</Box>
                        <Typography variant="h6" sx={{ fontFamily: "'Cormorant Garamond', serif" }}>{ministry.name}</Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>{ministry.description}</Typography>
                        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                          <Chip icon={<Users size={14} />} label={`${ministry.members} Members`} size="small" variant="outlined" />
                          <Chip label={ministry.meeting} size="small" variant="outlined" />
                        </Stack>
                        <Button size="small" variant="outlined"
                          onClick={() => setSelectedMinistry(selectedMinistry === ministry.id ? null : ministry.id)}>
                          {selectedMinistry === ministry.id ? 'Hide Requirements' : 'View Requirements'}
                        </Button>
                        <AnimatePresence>
                          {selectedMinistry === ministry.id && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                              <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
                                <Typography variant="subtitle2" sx={{ color: 'primary.main', mb: 1 }}>Requirements:</Typography>
                                <ul style={{ margin: 0, paddingLeft: 16 }}>
                                  {ministry.requirements.map((req, i) => (
                                    <li key={i}><Typography variant="caption" sx={{ color: 'text.secondary' }}>{req}</Typography></li>
                                  ))}
                                </ul>
                              </Box>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </Box>
                    </motion.div>
                  </Grid>
                ))}
              </AnimatePresence>
            </Grid>
          </Container>
        </Box>

        <Box sx={{ py: { xs: 8, md: 12 }, background: (theme) =>
          theme.palette.mode === 'dark' ? 'linear-gradient(135deg, #1E3A8A, #000000)' : 'linear-gradient(135deg, #E8F0FE, #F8FAFC)',
        }}>
          <Container maxWidth="sm">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Typography variant="h2" sx={{ textAlign: 'center', mb: 1 }}>Ready to Serve?</Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', textAlign: 'center', mb: 4 }}>
                Fill out the form below and our workforce coordinator will contact you.
              </Typography>
            </motion.div>
            <motion.form onSubmit={handleSubmit} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ width: '100%' }}>
              <Stack spacing={2}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField fullWidth label="First Name" name="firstName" value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} required />
                  <TextField fullWidth label="Last Name" name="lastName" value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} required />
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField fullWidth label="Email" type="email" name="email" value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                  <TextField fullWidth label="Phone" type="tel" name="phone" value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required />
                </Stack>
                <TextField select fullWidth label="Select Ministry Area" name="ministry" value={formData.ministry}
                  onChange={(e) => setFormData({ ...formData, ministry: e.target.value })} required>
                  {ministries.map((m) => (<MenuItem key={m.id} value={m.name}>{m.name}</MenuItem>))}
                </TextField>
                <TextField fullWidth multiline rows={4} label="Tell us about yourself and why you want to serve..."
                  name="testimony" value={formData.testimony}
                  onChange={(e) => setFormData({ ...formData, testimony: e.target.value })} required />
                <FormControlLabel control={<Checkbox checked={formData.agree}
                  onChange={(e) => setFormData({ ...formData, agree: e.target.checked })} />}
                  label="I have been a member for at least 3 months" />
                <Button type="submit" variant="contained" size="large" fullWidth>Submit Application</Button>
              </Stack>
            </motion.form>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default Ministries;
