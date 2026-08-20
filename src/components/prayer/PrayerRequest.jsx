import React, { useState } from 'react';
import { Box, Container, Typography, Button, Stack, TextField, Checkbox, FormControlLabel, alpha, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { HelpingHand, Lock, Mail } from 'lucide-react';
import { toast } from 'react-toastify';

const PrayerRequest = () => {
  const [formData, setFormData] = useState({ name: '', email: '', prayer: '', isPrivate: true });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await new Promise((r) => setTimeout(r, 1000));
      toast.success('Prayer request submitted! Our prayer team will pray for you.');
      setFormData({ name: '', email: '', prayer: '', isPrivate: true });
    } catch {
      toast.error('Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box sx={{ py: { xs: 6, md: 8 } }}>
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={5}>
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <Box sx={{ textAlign: 'center' }}>
                <HelpingHand size={64} style={{ color: '#4169E1', marginBottom: 16 }} />
                <Typography variant="h2" sx={{ mb: 2 }}>Prayer Request</Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>
                  Our prayer team is ready to stand with you in faith. Submit your prayer request and let us agree with you in prayer.
                </Typography>
                <Box sx={{ p: 2, borderRadius: 2, bgcolor: alpha('#4169E1', 0.1), display: 'flex', alignItems: 'center', gap: 1, mb: 4 }}>
                  <Lock size={16} style={{ color: '#4169E1' }} />
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Your request is confidential and will be handled with care
                  </Typography>
                </Box>
                <Box sx={{ p: 3, borderRadius: 3, bgcolor: 'action.hover', textAlign: 'left' }}>
                  <Typography variant="h6" sx={{ color: 'primary.main', mb: 2, fontFamily: "'Cormorant Garamond', serif" }}>
                    Prayer Schedule
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>Monday - Friday: 5:00 AM (Corporate Prayer)</Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>Wednesday: 6:00 PM (Digging Deep)</Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>24/7 Prayer Line: <strong>+234 123 456 7890</strong></Typography>
                </Box>
              </Box>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={7}>
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <Box component="form" onSubmit={handleSubmit} sx={{ p: { xs: 3, md: 5 }, borderRadius: 4, bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider' }}>
                <Typography variant="h4" sx={{ mb: 3, fontFamily: "'Cormorant Garamond', serif" }}>Submit Your Request</Typography>
                <Stack spacing={2.5}>
                  <TextField fullWidth label="Your Name" name="name" value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                  <TextField fullWidth label="Your Email (for response)" type="email" name="email" value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                  <TextField fullWidth label="What would you like us to pray about?" multiline rows={5} name="prayer" value={formData.prayer}
                    onChange={(e) => setFormData({ ...formData, prayer: e.target.value })} required />
                  <FormControlLabel control={<Checkbox checked={formData.isPrivate}
                    onChange={(e) => setFormData({ ...formData, isPrivate: e.target.checked })} />}
                    label="Keep this request private (only prayer team can see)" />
                  <Button type="submit" variant="contained" size="large" disabled={isSubmitting} fullWidth>
                    {isSubmitting ? 'Submitting...' : 'Submit Prayer Request'}
                  </Button>
                </Stack>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default PrayerRequest;
