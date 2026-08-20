import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Box, Container, Typography, Button, Grid } from '@mui/material';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Cross } from 'lucide-react';
import CountUp from 'react-countup';

const stats = [
  { value: 30, label: 'Years of Impact', suffix: '+' },
  { value: 1000, label: 'Branches', suffix: '+' },
  { value: 1000000, label: 'Lives Changed', suffix: '+' },
];

const AboutSection = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) controls.start('visible');
  }, [isInView, controls]);

  return (
    <Box ref={ref} sx={{ py: { xs: 8, md: 12 }, position: 'relative', overflow: 'hidden' }}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          variants={{ visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
        >
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="overline" sx={{ color: 'primary.main', letterSpacing: 4, display: 'block', mb: 1 }}>
              Welcome to
            </Typography>
            <Typography variant="h2">Dominion City</Typography>
            <Box
              sx={{
                width: 80,
                height: 2,
                background: 'linear-gradient(90deg, transparent, #4169E1, transparent)',
                mx: 'auto',
                mt: 2,
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Cross size={16} style={{ color: '#4169E1', marginTop: -7, background: 'inherit' }} />
            </Box>
          </Box>
        </motion.div>

        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={controls}
              variants={{ visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.2 } } }}
            >
              <Typography variant="body1" sx={{ color: 'primary.main', fontSize: '1.15rem', fontWeight: 500, mb: 2 }}>
                Dominion City is more than a church; it&apos;s a movement of people passionate about God and
                committed to raising kingdom-minded leaders who will impact their generations.
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>
                Under the visionary leadership of Dr. David Ogbueli, we have seen countless lives transformed,
                families restored, and destinies fulfilled. Our mandate is clear: to raise leaders, impact
                generations, and demonstrate the love of Christ to our world.
              </Typography>

              <Grid container spacing={3} sx={{ mb: 4 }}>
                {stats.map((stat) => (
                  <Grid item xs={4} key={stat.label}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography
                        variant="h4"
                        sx={{ color: 'primary.main', fontFamily: "'Cormorant Garamond', serif", fontWeight: 700 }}
                      >
                        {isInView && <CountUp end={stat.value} duration={2.5} suffix={stat.suffix} />}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        {stat.label}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>

              <Button component={Link} to="/about" variant="contained">
                Read Our Story
              </Button>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={controls}
              variants={{ visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.3 } } }}
            >
              <Box
                sx={{
                  position: 'relative',
                  borderRadius: 4,
                  overflow: 'hidden',
                  boxShadow: '0 20px 40px -15px rgba(65,105,225,0.4)',
                }}
              >
                <Box
                  component="img"
                  src="/images/pastor/Dr. David Ogbueli.jpeg"
                  alt="Dr. David Ogbueli"
                  sx={{ width: '100%', height: { xs: 300, md: 450 }, objectFit: 'cover', display: 'block' }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    p: 3,
                    background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                  }}
                >
                  <Typography variant="h5" sx={{ color: 'primary.main', fontFamily: "'Cormorant Garamond', serif" }}>
                    Dr. David Ogbueli
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                    Founder & Senior Pastor
                  </Typography>
                </Box>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AboutSection;
