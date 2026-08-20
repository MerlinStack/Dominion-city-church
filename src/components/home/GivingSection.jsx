import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Container, Typography, Button, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { Heart, Sprout, HandHeart } from 'lucide-react';

const givingOptions = [
  { icon: <HandHeart />, title: 'Tithes & Offerings', description: 'Support the vision through your faithful tithes and offerings.', link: '/give' },
  { icon: <Sprout />, title: 'Seeds & Projects', description: 'Sow a seed into specific projects and kingdom assignments.', link: '/give' },
  { icon: <Heart />, title: 'Benevolence', description: 'Touch lives through our outreach and compassion initiatives.', link: '/give' },
];

const GivingSection = () => {
  return (
    <Box sx={{ py: { xs: 8, md: 12 }, background: (theme) =>
      theme.palette.mode === 'dark'
        ? 'linear-gradient(135deg, #1E3A8A, #000000)'
        : 'linear-gradient(135deg, #E8F0FE, #F8FAFC)',
    }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Typography variant="h2">Partner With Us</Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mt: 1 }}>
              Your generous giving helps us reach more lives, raise leaders, and impact generations.
            </Typography>
          </motion.div>
        </Box>

        <Grid container spacing={4} justifyContent="center">
          {givingOptions.map((option, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Box
                  sx={{
                    p: 4,
                    borderRadius: 4,
                    textAlign: 'center',
                    bgcolor: 'background.paper',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid',
                    borderColor: 'divider',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-10px)',
                      boxShadow: '0 10px 30px -10px rgba(65,105,225,0.3)',
                    },
                  }}
                >
                  <Box sx={{ color: 'primary.main', mb: 2, '& svg': { width: 48, height: 48 } }}>
                    {option.icon}
                  </Box>
                  <Typography variant="h5" sx={{ fontFamily: "'Cormorant Garamond', serif", mb: 1 }}>
                    {option.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
                    {option.description}
                  </Typography>
                  <Button component={Link} to={option.link} variant="contained">
                    Give Now
                  </Button>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Box
            sx={{
              maxWidth: 500,
              mx: 'auto',
              mt: 6,
              p: 4,
              borderRadius: 3,
              border: '2px solid',
              borderColor: 'primary.main',
              textAlign: 'center',
              bgcolor: 'background.paper',
            }}
          >
            <Typography variant="h5" sx={{ color: 'primary.main', fontFamily: "'Cormorant Garamond', serif", mb: 2 }}>
              Bank Transfer Details
            </Typography>
            <Typography variant="body2"><strong>Account Name:</strong> Dominion City Church</Typography>
            <Typography variant="body2"><strong>Account Number:</strong> 1234567890</Typography>
            <Typography variant="body2"><strong>Bank:</strong> First Bank of Nigeria</Typography>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default GivingSection;
