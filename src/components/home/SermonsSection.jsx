import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Container, Typography, Button, Stack } from '@mui/material';
import { motion, useReducedMotion } from 'framer-motion';
import { Play, ArrowRight } from 'lucide-react';

const sermons = [
  {
    id: 1,
    title: 'The Power of Dominion',
    preacher: 'Dr. David Ogbueli',
    date: 'Mar 10, 2024',
    thumbnail: '/images/grid/mpa1.jpeg',
  },
  {
    id: 2,
    title: 'Raising Kingdom Leaders',
    preacher: 'Pastor Sarah Ogbueli',
    date: 'Mar 3, 2024',
    thumbnail: '/images/grid/word1.jpeg',
  },
  {
    id: 3,
    title: 'Faith That Moves Mountains',
    preacher: 'Pastor Shola Olapade',
    date: 'Feb 25, 2024',
    thumbnail: '/images/grid/wor10.jpeg',
  },
];

const SermonsSection = () => {
  const reduceMotion = useReducedMotion();
  const [featured, ...rest] = sermons;

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 7 }}>
          <Typography variant="overline" sx={{ color: 'primary.main', display: 'block', mb: 1 }}>
            Latest message
          </Typography>
          <Typography variant="h2" sx={{ fontSize: { xs: '2.1rem', md: '3rem' } }}>
            Watch and be strengthened
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', mt: 1, maxWidth: 560, mx: 'auto' }}>
            Recent messages from the pulpit of Dominion City.
          </Typography>
        </Box>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Box
            component={Link}
            to="/sermons"
            sx={{
              position: 'relative',
              display: 'block',
              borderRadius: 4,
              overflow: 'hidden',
              mb: 6,
              textDecoration: 'none',
              '&:hover .msg-media': { transform: 'scale(1.03)' },
              '&:hover .msg-play': { bgcolor: 'primary.dark' },
            }}
          >
            <Box
              className="msg-media"
              component="img"
              src={featured.thumbnail}
              alt={featured.title}
              sx={{
                width: '100%',
                height: { xs: 320, md: 480 },
                objectFit: 'cover',
                display: 'block',
                transition: 'transform 0.8s ease',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(180deg, rgba(11,17,32,0.1) 0%, rgba(11,17,32,0.65) 100%)',
              }}
            />
            <Box
              className="msg-play"
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: { xs: 64, md: 84 },
                height: { xs: 64, md: 84 },
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'rgba(65,105,225,0.92)',
                color: 'white',
                transition: 'background-color 0.3s ease',
                boxShadow: '0 12px 40px -8px rgba(65,105,225,0.6)',
              }}
            >
              <Play size={30} style={{ marginLeft: 4 }} />
            </Box>
            <Box sx={{ position: 'absolute', left: 0, right: 0, bottom: 0, p: { xs: 3, md: 5 } }}>
              <Typography
                variant="overline"
                sx={{ color: 'rgba(255,255,255,0.75)', display: 'block', mb: 0.5, letterSpacing: '0.14em' }}
              >
                Featured message
              </Typography>
              <Typography
                component="h3"
                sx={{
                  color: '#FFFFFF',
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: { xs: '1.7rem', md: '2.5rem' },
                  lineHeight: 1.15,
                  mb: 1,
                  textShadow: '0 2px 16px rgba(2,6,18,0.4)',
                }}
              >
                {featured.title}
              </Typography>
              <Typography sx={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.92rem' }}>
                {featured.preacher} · {featured.date}
              </Typography>
            </Box>
          </Box>
        </motion.div>

        <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} sx={{ mb: 6 }}>
          {rest.map((sermon, index) => (
            <motion.div
              key={sermon.id}
              initial={reduceMotion ? false : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              viewport={{ once: true }}
              style={{ flex: 1 }}
            >
              <Box
                component={Link}
                to="/sermons"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2.5,
                  p: 1.5,
                  borderRadius: 3,
                  bgcolor: 'background.paper',
                  border: '1px solid',
                  borderColor: 'divider',
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'border-color 0.3s ease, transform 0.3s ease',
                  '&:hover': {
                    borderColor: 'primary.main',
                    transform: 'translateY(-3px)',
                  },
                }}
              >
                <Box
                  component="img"
                  src={sermon.thumbnail}
                  alt={sermon.title}
                  loading="lazy"
                  sx={{
                    width: 112,
                    height: 84,
                    borderRadius: 2,
                    objectFit: 'cover',
                    flexShrink: 0,
                  }}
                />
                <Box>
                  <Typography
                    component="h4"
                    sx={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.3rem', lineHeight: 1.25, mb: 0.5 }}
                  >
                    {sermon.title}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    {sermon.preacher} · {sermon.date}
                  </Typography>
                </Box>
              </Box>
            </motion.div>
          ))}
        </Stack>

        <Box sx={{ textAlign: 'center' }}>
          <Button component={Link} to="/sermons" variant="outlined" endIcon={<ArrowRight size={16} />}>
            Explore all messages
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default SermonsSection;