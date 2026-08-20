import React, { useRef, useState, useEffect } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { motion, useInView, useReducedMotion } from 'framer-motion';

const marqueeImages = [
  { src: '/images/grid/Sunday-service-.jpeg', label: 'Sunday Service', category: 'Free Transportaion' },
  { src: '/images/grid/Sunday-service.jpeg', label: 'Sunday Service', description: '29th March, 2026', category: 'Making the most of Time and Seasons' },
  { src: '/images/grid/mpa1.jpeg', label: 'Dr. David Ogbueli', description: 'Sunday Service', category: 'Activating the riches of God\'s redemption.' },
  { src: '/images/grid/ss1.jpeg', description: 'We are happy to have you!', category: 'Welcome to Church!' },
  { src: '/images/grid/ss2.jpeg' },
  { src: '/images/grid/ss3.jpeg' },
  { src: '/images/grid/ss4.jpeg' },
  { src: '/images/grid/ss7.jpeg' },
  { src: '/images/grid/mpa2.jpeg' },
  { src: '/images/grid/praiz12.jpeg', label: 'Enter his gate with thanksgiving...', category: 'PRAISE' },
  { src: '/images/grid/praiz14.jpeg', label: '...and into his court with praise.' },
  { src: '/images/grid/praiz15.jpeg' },
  { src: '/images/grid/praiz5.jpeg' },
  { src: '/images/grid/praiz16.jpeg' },
  { src: '/images/grid/mpa3.jpeg' },
  { src: '/images/grid/wor10.jpeg', label: 'We bow before you Lord...', category: 'WORSHIP' },
  { src: '/images/grid/wor17.jpeg', label: '...and we honour you...' },
  { src: '/images/grid/wor2.jpeg', label: '... with lifted hands...' },
  { src: '/images/grid/wor15.jpeg', label: '...worship you...' },
  { src: '/images/grid/wor9.jpeg' },
  { src: '/images/grid/mpa4.jpeg' },
  { src: '/images/grid/word1.jpeg', label: 'Activating the riches of God\'s redemption.', description: 'I am rich in Christ!', category: 'WORD' },
  { src: '/images/grid/word2.jpeg' },
  { src: '/images/grid/word4.jpeg' },
  { src: '/images/grid/word5.jpeg' },
  { src: '/images/grid/word7.jpeg' },
];

const MarqueeGrid = () => {
  const trackRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    if (reduceMotion) {
      track.style.transform = 'translateX(0)';
      return;
    }

    let animationId;
    let position = 0;

    const animate = () => {
      if (!isHovered) {
        position -= 0.5;
        if (Math.abs(position) >= track.scrollWidth / 2) {
          position = 0;
        }
        track.style.transform = `translateX(${position}px)`;
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [isHovered, reduceMotion]);

  return (
    <Box ref={sectionRef} sx={{ py: { xs: 6, md: 8 }, overflow: 'hidden' }}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography
              variant="overline"
              sx={{ color: 'primary.main', display: 'block', mb: 1 }}
            >
              Our community
            </Typography>
            <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '3rem' }, mb: 1 }}>
              Moments That Matter
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              Experience the vibrant life of Dominion City through our moments
            </Typography>
          </Box>
        </motion.div>
      </Container>

      <Box
        sx={(theme) => ({
          overflow: 'hidden',
          position: 'relative',
          '&::before, &::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            bottom: 0,
            width: 80,
            zIndex: 2,
            pointerEvents: 'none',
          },
          '&::before': { left: 0, background: `linear-gradient(90deg, ${theme.palette.background.default}, transparent)` },
          '&::after': { right: 0, background: `linear-gradient(-90deg, ${theme.palette.background.default}, transparent)` },
        })}
      >
        <Box
          ref={trackRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          sx={{ display: 'flex', gap: 2, py: 2 }}
        >
          {[...marqueeImages, ...marqueeImages, ...marqueeImages].map((item, index) => (
            <Box
              key={index}
              sx={{
                minWidth: { xs: 200, md: 260 },
                borderRadius: 3,
                overflow: 'hidden',
                position: 'relative',
                cursor: 'pointer',
                '&:hover img': { transform: 'scale(1.1)' },
                '&:hover .caption': { opacity: 1 },
              }}
            >
              <Box
                component="img"
                src={item.src}
                alt={item.label || ''}
                loading="lazy"
                sx={{
                  width: '100%',
                  height: { xs: 200, md: 260 },
                  objectFit: 'cover',
                  transition: 'transform 0.4s ease',
                }}
              />
              <Box
                className="caption"
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  p: 2,
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                  opacity: { xs: 1, md: 0 },
                  transition: 'opacity 0.3s ease',
                }}
              >
                {item.category && (
                  <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 600, display: 'block' }}>
                    {item.category}
                  </Typography>
                )}
                {item.label && (
                  <Typography variant="body2" sx={{ color: '#FFFFFF', fontWeight: 500 }}>
                    {item.label}
                  </Typography>
                )}
                {item.description && (
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                    {item.description}
                  </Typography>
                )}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default MarqueeGrid;
