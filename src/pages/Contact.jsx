import React, { useState } from 'react';
import { Box, Container, Typography, Button, Grid, Stack, TextField, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { MapPin, Phone, Mail, Clock, Globe, Camera, Video, MessageCircle, Send } from 'lucide-react';
import { toast } from 'react-toastify';

const branches = [
  { name: 'Lagos HQ', address: '23 Dominion Way, Lagos Mainland', services: 'Sundays: 8am, 10am' },
  { name: 'Abuja', address: '15 Dominion Avenue, Central Business District', services: 'Sundays: 9am, 11am' },
  { name: 'Port Harcourt', address: '7 Grace Boulevard, GRA Phase 2', services: 'Sundays: 8am, 10am' },
  { name: 'Ibadan', address: '42 Victory Road, Bodija Estate', services: 'Sundays: 9am, 11am' },
];

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields');
      return;
    }
    toast.success('Message sent successfully! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | Dominion City</title>
        <meta name="description" content="Contact Dominion City for prayer requests, questions, or to connect with any of our branches." />
      </Helmet>
      <Box sx={{ pt: '80px' }}>
        <Box sx={{ py: { xs: 8, md: 12 }, textAlign: 'center', background: (theme) =>
          theme.palette.mode === 'dark' ? 'linear-gradient(135deg, #000000, #1E3A8A)' : 'linear-gradient(135deg, #F8FAFC, #E8F0FE)',
        }}>
          <Container maxWidth="md">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Typography variant="h1" sx={{ fontSize: { xs: '2.5rem', md: '4rem' }, mb: 2 }}>Get in Touch</Typography>
              <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 300 }}>We&apos;d love to hear from you</Typography>
            </motion.div>
          </Container>
        </Box>

        <Box sx={{ py: { xs: 6, md: 10 } }}>
          <Container maxWidth="lg">
            <Grid container spacing={6}>
              <Grid item xs={12} md={5}>
                <Typography variant="h3" sx={{ mb: 4 }}>Contact Information</Typography>
                <Stack spacing={3}>
                  {[
                    { icon: <MapPin />, title: 'Headquarters', desc: ['23 Dominion Way, Lagos, Nigeria'] },
                    { icon: <Phone />, title: 'Phone', desc: ['+234 123 456 7890', '+234 123 456 7891'] },
                    { icon: <Mail />, title: 'Email', desc: ['info@dominioncity.org', 'prayer@dominioncity.org'] },
                    { icon: <Clock />, title: 'Office Hours', desc: ['Monday - Friday: 9:00 AM - 5:00 PM', 'Saturday: 10:00 AM - 2:00 PM'] },
                  ].map((item, idx) => (
                    <Box key={idx} sx={{ display: 'flex', gap: 2, p: 2.5, borderRadius: 3, bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', transition: 'all 0.3s ease', '&:hover': { bgcolor: 'action.hover' } }}>
                      <Box sx={{ color: 'primary.main', '& svg': { width: 24, height: 24 } }}>{item.icon}</Box>
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{item.title}</Typography>
                        {item.desc.map((d, i) => (
                          <Typography key={i} variant="body2" sx={{ color: 'text.secondary' }}>{d}</Typography>
                        ))}
                      </Box>
                    </Box>
                  ))}
                </Stack>
              </Grid>

              <Grid item xs={12} md={7}>
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
                  <Box component="form" onSubmit={handleSubmit} sx={{ p: { xs: 3, md: 5 }, borderRadius: 4, bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider' }}>
                    <Typography variant="h4" sx={{ mb: 3, fontFamily: "'Cormorant Garamond', serif" }}>Send Us a Message</Typography>
                    <Stack spacing={2.5}>
                      <TextField fullWidth label="Your Name" name="name" value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                      <TextField fullWidth label="Your Email" type="email" name="email" value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                      <TextField fullWidth label="Subject" name="subject" value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })} />
                      <TextField fullWidth label="Your Message..." multiline rows={5} name="message" value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })} required />
                      <Button type="submit" variant="contained" size="large" startIcon={<Send size={16} />} fullWidth>
                        Send Message
                      </Button>
                    </Stack>
                  </Box>
                </motion.div>
              </Grid>
            </Grid>
          </Container>
        </Box>

        <Box sx={{ py: { xs: 6, md: 10 } }}>
          <Container maxWidth="lg">
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Typography variant="overline" sx={{ color: 'primary.main', letterSpacing: 4, display: 'block', mb: 1 }}>Find Us</Typography>
              <Typography variant="h2">Our Branches</Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>Worship with us at any of our locations near you</Typography>
            </Box>
            <Grid container spacing={3} sx={{ mb: 6 }}>
              {branches.map((branch, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }}>
                    <Box sx={{ p: 3, borderRadius: 4, bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', transition: 'all 0.3s ease', '&:hover': { transform: 'translateY(-8px)', boxShadow: '0 10px 30px -10px rgba(65,105,225,0.3)' } }}>
                      <Typography variant="h6" sx={{ color: 'primary.main', fontFamily: "'Cormorant Garamond', serif", mb: 1 }}>{branch.name}</Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0.5 }}><MapPin size={12} /> {branch.address}</Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}><Clock size={12} /> {branch.services}</Typography>
                    </Box>
                  </motion.div>
                </Grid>
              ))}
            </Grid>

            <Box sx={{ borderRadius: 4, overflow: 'hidden', mb: 6 }}>
              <Box component="iframe"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.711377187562!2d3.379214!3d6.5244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMzEnMjcuOCJOIDPCsDIyJzQ1LjIiRQ!5e0!3m2!1sen!2sng!4v1234567890"
                sx={{ width: '100%', height: 400, border: 'none' }} allowFullScreen loading="lazy" title="Dominion City Location Map" />
            </Box>
          </Container>
        </Box>

        <Box sx={{ py: { xs: 6, md: 8 }, textAlign: 'center' }}>
          <Container maxWidth="md">
            <Typography variant="h2" sx={{ mb: 1 }}>Connect With Us</Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>Follow us on social media for daily inspiration and updates</Typography>
            <Stack direction="row" justifyContent="center" spacing={2}>
              {[
                { icon: <Globe />, href: 'https://facebook.com/dominioncity' },
                { icon: <Camera />, href: 'https://instagram.com/dominioncity' },
                { icon: <Video />, href: 'https://youtube.com/dominioncity' },
                { icon: <MessageCircle />, href: 'https://twitter.com/dominioncity' },
                { icon: <MessageCircle />, href: 'https://wa.me/2341234567890' },
                { icon: <Send />, href: 'https://t.me/dominioncity' },
              ].map((social, i) => (
                <IconButton key={i} component="a" href={social.href} target="_blank" rel="noopener noreferrer"
                  sx={{ bgcolor: 'action.hover', color: 'primary.main', '&:hover': { bgcolor: 'primary.main', color: 'white' }, width: 56, height: 56 }}>
                  {social.icon}
                </IconButton>
              ))}
            </Stack>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default Contact;
