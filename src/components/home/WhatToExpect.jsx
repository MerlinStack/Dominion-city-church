import React from 'react';
import { Box, Container, Typography, Stack } from '@mui/material';
import { Car, UserPlus, HeartHandshake } from 'lucide-react';

const steps = [
  {
    icon: <Car size={26} />,
    title: 'Arrive',
    text: 'We gather at 23 Dominion Way, Lagos. Services hold on Sundays at 8:00 AM and 10:00 AM, and Wednesdays at 6:00 PM.',
  },
  {
    icon: <UserPlus size={26} />,
    title: 'Connect',
    text: 'Our welcome team will greet you at the door, help you find a seat, and point you toward Children\'s Church for the kids.',
  },
  {
    icon: <HeartHandshake size={26} />,
    title: 'Experience',
    text: 'Expect uplifting worship, a practical word, and a community that is glad you came. Come as you are — you belong here.',
  },
];

const WhatToExpect = () => {
  return (
    <Box component="section" sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="overline"
            sx={{ color: 'primary.main', display: 'block', mb: 1 }}
          >
            What to expect
          </Typography>
          <Typography variant="h2" sx={{ fontSize: { xs: '2.1rem', md: '3rem' } }}>
            Your first visit, made simple
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', mt: 1, maxWidth: 560, mx: 'auto' }}>
            Whether you are exploring faith or returning to church, here is what a
            Sunday with us looks like.
          </Typography>
        </Box>

        <Stack direction={{ xs: 'column', md: 'row' }} spacing={0} sx={{ maxWidth: 960, mx: 'auto' }}>
          {steps.map((step, index) => (
            <Box
              key={step.title}
              sx={{
                flex: 1,
                px: { xs: 2, md: 4 },
                py: { xs: 4, md: 5 },
                borderTop: index > 0 ? { xs: '1px solid', md: 'none' } : 'none',
                borderLeft: index > 0 ? { md: '1px solid' } : 'none',
                borderColor: 'divider',
                textAlign: { xs: 'left', md: 'center' },
              }}
            >
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'primary.main',
                  bgcolor: 'action.selected',
                  mb: 2.5,
                  mx: { md: 'auto' },
                }}
              >
                {step.icon}
              </Box>
              <Typography
                component="h3"
                sx={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', mb: 1 }}
              >
                {step.title}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: 280, mx: { md: 'auto' } }}>
                {step.text}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Container>
    </Box>
  );
};

export default WhatToExpect;