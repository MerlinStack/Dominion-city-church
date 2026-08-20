import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Container, Typography, Button, Stack, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
  {
    id: 1,
    image: '/images/hero/year-of-eagle.jpeg',
    bgPosition: 'center 10%',
    title: 'Welcome to Dominion City',
    subtitle: 'A place where lives are transformed, destinies are fulfilled, and leaders are raised.',
    buttons: [
      { text: 'PLAN YOUR VISIT', link: '/contact', primary: true },
      { text: 'WATCH LIVE', link: '/sermons', primary: false },
    ],
  },
  {
    id: 2,
    image: '/images/hero/dr-david-ogbueli.jpeg',
    bgPosition: 'center 10%',
    title: 'With Dr. David Ogbueli',
    subtitle: "Experience the transformative power of God's Word through prophetic teaching.",
    buttons: [
      { text: 'LATEST SERMONS', link: '/sermons', primary: true },
      { text: 'MEET THE MAN OF GOD', link: '/about', primary: false },
    ],
  },
  {
    id: 3,
    image: '/images/hero/congregation.jpeg',
    bgPosition: 'center 40%',
    title: 'Join Our Growing Family',
    subtitle: 'Be part of a vibrant community of believers passionate about God.',
    buttons: [
      { text: 'CONNECT WITH US', link: '/contact', primary: true },
      { text: 'UPCOMING EVENTS', link: '/events', primary: false },
    ],
  },
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <Box
      sx={{
        position: 'relative',
        height: { xs: '65vh', md: '85vh' },
        overflow: 'hidden',
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${slide.image})`,
            backgroundSize: 'cover',
            backgroundPosition: slide.bgPosition,
            backgroundRepeat: 'no-repeat',
          }}
        />
      </AnimatePresence>

      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)',
        }}
      />

      <Container
        maxWidth="lg"
        sx={{
          position: 'relative',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          zIndex: 2,
        }}
      >
        <motion.div
          key={slide.id + '-content'}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.5rem', md: '4.5rem' },
              color: '#FFFFFF',
              mb: 2,
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              lineHeight: 1.2,
            }}
          >
            {slide.title}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: '#FFFFFF',
              mb: 4,
              maxWidth: 600,
              opacity: 0.9,
              textShadow: '1px 1px 3px rgba(0,0,0,0.5)',
              fontWeight: 300,
              fontSize: { xs: '1rem', md: '1.25rem' },
            }}
          >
            {slide.subtitle}
          </Typography>
          <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
            {slide.buttons.map((btn, idx) => (
              <Button
                key={idx}
                component={Link}
                to={btn.link}
                variant={btn.primary ? 'contained' : 'outlined'}
                startIcon={!btn.primary ? <Play size={16} /> : undefined}
                sx={{
                  borderColor: '#FFFFFF',
                  color: btn.primary ? undefined : '#FFFFFF',
                  borderWidth: 2,
                  '&:hover': btn.primary
                    ? {
                        bgcolor: 'transparent',
                        borderColor: 'primary.main',
                        color: 'primary.main',
                        boxShadow: 'none',
                      }
                    : {
                        bgcolor: '#FFFFFF',
                        color: 'primary.main',
                      },
                }}
              >
                {btn.text}
              </Button>
            ))}
          </Stack>
        </motion.div>
      </Container>

      <IconButton
        onClick={() => setCurrent((prev) => (prev - 1 + slides.length) % slides.length)}
        sx={{
          position: 'absolute',
          left: { xs: 8, md: 24 },
          top: '50%',
          transform: 'translateY(-50%)',
          color: 'white',
          bgcolor: 'rgba(255,255,255,0.15)',
          backdropFilter: 'blur(4px)',
          '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' },
          zIndex: 3,
        }}
      >
        <ChevronLeft />
      </IconButton>

      <IconButton
        onClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
        sx={{
          position: 'absolute',
          right: { xs: 8, md: 24 },
          top: '50%',
          transform: 'translateY(-50%)',
          color: 'white',
          bgcolor: 'rgba(255,255,255,0.15)',
          backdropFilter: 'blur(4px)',
          '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' },
          zIndex: 3,
        }}
      >
        <ChevronRight />
      </IconButton>

      <Stack
        direction="row"
        spacing={1}
        sx={{
          position: 'absolute',
          bottom: 40,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 3,
        }}
      >
        {slides.map((_, idx) => (
          <Box
            key={idx}
            onClick={() => setCurrent(idx)}
            sx={{
              width: idx === current ? 32 : 12,
              height: 12,
              borderRadius: 6,
              bgcolor: idx === current ? '#FFFFFF' : 'rgba(255,255,255,0.5)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default HeroSlider;
