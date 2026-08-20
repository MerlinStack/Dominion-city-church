import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box, Container, Typography, Button, Grid, alpha,
} from '@mui/material';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { BookOpen, Cross, Bird, Heart, Church, Crown } from 'lucide-react';

const timelineEvents = [
  { year: '1998', title: 'The Vision', description: 'Dr. David Ogbueli receives a prophetic vision to raise leaders who would impact generations.' },
  { year: '2000', title: 'First Service', description: 'First Sunday service held with 12 members in a small hall in Lagos.' },
  { year: '2005', title: 'First Branch', description: 'First branch outside Lagos opens in Abuja, marking the beginning of expansion.' },
  { year: '2010', title: 'Dominion City International', description: 'International branches established in London and United States.' },
  { year: '2024', title: 'Today', description: 'Over 1000+ branches worldwide, 1 million+ souls won for Christ, generations impacted.' },
];

const beliefs = [
  { icon: <BookOpen />, title: 'The Bible', description: 'We believe the Bible is the inspired, infallible Word of God and our final authority for faith and practice.' },
  { icon: <Cross />, title: 'Salvation', description: 'We believe salvation is through faith in Jesus Christ alone, by His death and resurrection.' },
  { icon: <Bird />, title: 'Holy Spirit', description: 'We believe in the baptism of the Holy Spirit and the operation of spiritual gifts today.' },
  { icon: <Heart />, title: 'Healing', description: 'We believe divine healing is provided for all in the atonement of Christ.' },
  { icon: <Church />, title: 'The Church', description: 'We believe in the importance of the local church and fellowship with believers.' },
  { icon: <Crown />, title: 'Second Coming', description: 'We believe in the blessed hope of Jesus Christ\'s imminent return.' },
];

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us | Dominion City</title>
        <meta name="description" content="Learn about Dominion City's history, our beliefs, and the vision God gave Dr. David Ogbueli." />
      </Helmet>
      <Box sx={{ pt: '80px' }}>
        <Box sx={{ py: { xs: 8, md: 12 }, textAlign: 'center', background: (theme) =>
          theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, #000000, #1E3A8A)'
            : 'linear-gradient(135deg, #F8FAFC, #E8F0FE)',
        }}>
          <Container maxWidth="md">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Typography variant="h1" sx={{ fontSize: { xs: '2.5rem', md: '4rem' }, mb: 2 }}>
                Our Story
              </Typography>
              <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 300 }}>
                Discover the journey of faith that birthed Dominion City
              </Typography>
            </motion.div>
          </Container>
        </Box>

        <Box sx={{ py: { xs: 8, md: 12 } }}>
          <Container maxWidth="md">
            <Box sx={{ textAlign: 'center', mb: 8 }}>
              <Typography variant="overline" sx={{ color: 'primary.main', letterSpacing: 4, display: 'block', mb: 1 }}>
                Our History
              </Typography>
              <Typography variant="h2">How It All Began</Typography>
            </Box>
            <Box sx={{ position: 'relative' }}>
              <Box sx={{
                position: 'absolute', left: '50%', top: 0, bottom: 0, width: 2,
                bgcolor: 'primary.main', transform: 'translateX(-50%)', display: { xs: 'none', md: 'block' },
              }} />
              {timelineEvents.map((event, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  style={{ display: 'flex', justifyContent: index % 2 === 0 ? 'flex-start' : 'flex-end', marginBottom: 32, position: 'relative' }}
                >
                  <Box sx={{
                    width: { xs: '100%', md: '45%' },
                    p: 3,
                    borderRadius: 3,
                    bgcolor: 'background.paper',
                    border: '1px solid',
                    borderColor: 'divider',
                    position: 'relative',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 24,
                      [index % 2 === 0 ? 'right' : 'left']: { xs: 'auto', md: -12 },
                      border: '8px solid transparent',
                      borderLeftColor: { xs: 'transparent', md: index % 2 === 0 ? 'primary.main' : 'transparent' },
                      borderRightColor: { xs: 'transparent', md: index % 2 === 0 ? 'transparent' : 'primary.main' },
                      display: { xs: 'none', md: 'block' },
                    },
                  }}>
                    <Typography variant="h4" sx={{ color: 'primary.main', fontFamily: "'Cormorant Garamond', serif" }}>
                      {event.year}
                    </Typography>
                    <Typography variant="h6" sx={{ fontFamily: "'Cormorant Garamond', serif" }}>
                      {event.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {event.description}
                    </Typography>
                  </Box>
                </motion.div>
              ))}
            </Box>
          </Container>
        </Box>

        <Box sx={{ py: { xs: 8, md: 12 } }}>
          <Container maxWidth="lg">
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Typography variant="overline" sx={{ color: 'primary.main', letterSpacing: 4, display: 'block', mb: 1 }}>
                What We Believe
              </Typography>
              <Typography variant="h2">Our Statement of Faith</Typography>
            </Box>
            <Grid container spacing={3}>
              {beliefs.map((belief, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Box sx={{
                      p: 4,
                      borderRadius: 4,
                      textAlign: 'center',
                      bgcolor: 'background.paper',
                      border: '1px solid',
                      borderColor: 'divider',
                      transition: 'all 0.3s ease',
                      '&:hover': { transform: 'translateY(-10px)', boxShadow: '0 10px 30px -10px rgba(65,105,225,0.3)' },
                    }}>
                      <Box sx={{ color: 'primary.main', mb: 2, '& svg': { width: 40, height: 40 } }}>
                        {belief.icon}
                      </Box>
                      <Typography variant="h6" sx={{ fontFamily: "'Cormorant Garamond', serif", mb: 1 }}>
                        {belief.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {belief.description}
                      </Typography>
                    </Box>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        <Box sx={{ py: { xs: 8, md: 12 }, background: (theme) =>
          theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, #000000, #1E3A8A)'
            : 'linear-gradient(135deg, #F8FAFC, #E8F0FE)',
        }}>
          <Container maxWidth="lg">
            <Grid container spacing={6} alignItems="center">
              <Grid item xs={12} md={5}>
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Box sx={{
                    borderRadius: 4, overflow: 'hidden',
                    boxShadow: '0 20px 40px -15px rgba(65,105,225,0.4)',
                  }}>
                    <Box component="img"
                      src="/images/pastor/Dr. David Ogbueli.jpeg"
                      alt="Dr. David Ogbueli"
                      sx={{ width: '100%', height: { xs: 350, md: 500 }, objectFit: 'cover', display: 'block' }}
                    />
                  </Box>
                </motion.div>
              </Grid>
              <Grid item xs={12} md={7}>
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Typography variant="h2" sx={{ mb: 1 }}>Dr. David Ogbueli</Typography>
                  <Typography variant="subtitle1" sx={{ color: 'primary.main', mb: 3, fontWeight: 500 }}>
                    Founder & Senior Pastor
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
                    Dr. David Ogbueli is a prophet, teacher, and apostle of grace with a mandate to raise leaders who will impact generations.
                    His ministry is characterized by profound revelational teaching, prophetic precision, and a deep passion for seeing
                    people walk in their God-given destiny.
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3 }}>
                    With over 30 years of ministry, he has impacted millions across the globe through conferences, seminars, and his daily
                    broadcast &ldquo;Wisdom for Living.&rdquo; He is a sought-after conference speaker known for his ability to simplify deep spiritual truths.
                  </Typography>
                  <Box sx={{
                    p: 3, mb: 3, borderRadius: 2,
                    borderLeft: '4px solid',
                    borderColor: 'primary.main',
                    bgcolor: alpha('#4169E1', 0.05),
                  }}>
                    <Typography variant="body1" sx={{ color: 'primary.main', fontStyle: 'italic' }}>
                      &ldquo;Every man&apos;s destiny is too great to be fulfilled alone. You need God, you need people, and you need purpose.&rdquo;
                    </Typography>
                  </Box>
                  <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>
                    He is married to Pastor Mrs. Sarah Ogbueli, and they are blessed with children.
                  </Typography>
                  <Button component={Link} to="/sermons" variant="contained" size="large">
                    Watch His Messages
                  </Button>
                </motion.div>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default About;
