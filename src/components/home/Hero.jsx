import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Container, Typography, Button, Stack } from '@mui/material';
import { motion, useReducedMotion } from 'framer-motion';
import { Play, MapPin } from 'lucide-react';

const Hero = () => {
  const reduceMotion = useReducedMotion();

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        height: { xs: '88vh', md: '92vh' },
        minHeight: 560,
        maxHeight: 900,
        overflow: 'hidden',
      }}
    >
      <motion.div
        initial={reduceMotion ? false : { scale: 1.06 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.2, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/images/hero/congregation.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
          backgroundRepeat: 'no-repeat',
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(11,17,32,0.35) 0%, rgba(11,17,32,0.15) 40%, rgba(11,17,32,0.78) 100%)',
        }}
      />

      <Container
        maxWidth="lg"
        sx={{
          position: 'relative',
          height: '100%',
          display: 'flex',
          alignItems: 'flex-end',
          pb: { xs: 10, md: 12 },
          zIndex: 2,
        }}
      >
        <Box sx={{ maxWidth: 720 }}>
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
          >
            <Typography
              component="p"
              sx={{
                color: 'rgba(255,255,255,0.85)',
                fontSize: '0.95rem',
                fontWeight: 500,
                letterSpacing: '0.16em',
                mb: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <MapPin size={15} />
              Dominion City, Lagos
            </Typography>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Typography
              component="h1"
              sx={{
                color: '#FFFFFF',
                fontSize: { xs: '2.6rem', md: '4.6rem' },
                lineHeight: 1.08,
                mb: 3,
                textShadow: '0 2px 24px rgba(2,6,18,0.45)',
                fontWeight: 600,
              }}
            >
              A place where lives are transformed and leaders are raised.
            </Typography>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
          >
            <Typography
              component="p"
              sx={{
                color: 'rgba(255,255,255,0.88)',
                fontSize: { xs: '1rem', md: '1.2rem' },
                fontWeight: 300,
                maxWidth: 560,
                mb: 4,
                textShadow: '0 1px 12px rgba(2,6,18,0.4)',
              }}
            >
              We are a family of believers in Christ — learning, growing, and
              giving together so that every generation knows their purpose.
            </Typography>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
              <Button
                component={Link}
                to="/sermons"
                variant="contained"
                size="large"
                startIcon={<Play size={17} />}
              >
                Watch live
              </Button>
              <Button
                component={Link}
                to="/contact"
                variant="outlined"
                size="large"
                sx={{
                  borderColor: 'rgba(255,255,255,0.7)',
                  color: '#FFFFFF',
                  borderWidth: 1.5,
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.12)',
                    borderColor: '#FFFFFF',
                    color: '#FFFFFF',
                  },
                }}
              >
                Plan your visit
              </Button>
            </Stack>

            <Stack direction="row" spacing={3} sx={{ mt: 5, flexWrap: 'wrap', useFlexGap: true }}>
              <Box>
                <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.78rem', letterSpacing: '0.1em' }}>
                  Sundays
                </Typography>
                <Typography sx={{ color: '#FFFFFF', fontWeight: 600, fontSize: '0.95rem' }}>
                  8:00 &amp; 10:00 AM
                </Typography>
              </Box>
              <Box>
                <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.78rem', letterSpacing: '0.1em' }}>
                  Wednesdays
                </Typography>
                <Typography sx={{ color: '#FFFFFF', fontWeight: 600, fontSize: '0.95rem' }}>
                  6:00 PM · Digging Deep
                </Typography>
              </Box>
            </Stack>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
};

export default Hero;