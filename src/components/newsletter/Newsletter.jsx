import React, { useState } from 'react';
import { Box, Container, Typography, Button, TextField } from '@mui/material';
import { motion } from 'framer-motion';
import { Mail, Send } from 'lucide-react';
import { toast } from 'react-toastify';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setIsSubscribing(true);
    try {
      await new Promise((r) => setTimeout(r, 1000));
      toast.success('Subscribed successfully! Check your email for confirmation.');
      setEmail('');
    } catch {
      toast.error('Subscription failed. Please try again.');
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <Box sx={{ py: { xs: 6, md: 8 }, background: (theme) =>
      theme.palette.mode === 'dark' ? 'linear-gradient(135deg, #1E3A8A, #000000)' : 'linear-gradient(135deg, #E8F0FE, #F8FAFC)',
    }}>
      <Container maxWidth="sm">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <Box sx={{ textAlign: 'center' }}>
            <Mail size={48} style={{ color: '#4169E1', marginBottom: 16 }} />
            <Typography variant="h3" sx={{ mb: 1 }}>Stay Connected</Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>
              Get daily devotionals, sermon updates, and event notifications delivered to your inbox.
            </Typography>
            <Box component="form" onSubmit={handleSubscribe} sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
              <TextField fullWidth type="email" placeholder="Enter your email address" value={email}
                onChange={(e) => setEmail(e.target.value)} required
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 50, bgcolor: 'background.paper' } }} />
              <Button type="submit" variant="contained" disabled={isSubscribing}
                startIcon={<Send size={16} />}
                sx={{ borderRadius: 50, px: 4, whiteSpace: 'nowrap', minWidth: { xs: '100%', sm: 'auto' } }}>
                {isSubscribing ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </Box>
            <Typography variant="caption" sx={{ color: 'text.secondary', mt: 2, display: 'block', opacity: 0.7 }}>
              No spam, unsubscribe anytime.
            </Typography>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Newsletter;
