import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  Stack,
  Divider,
} from '@mui/material';
import {
  Globe,
  Camera,
  Video,
  MessageCircle,
  MapPin,
  Phone,
  Mail,
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'background.default',
        borderTop: '3px solid',
        borderColor: 'primary.main',
        pt: { xs: 6, md: 8 },
        pb: 3,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          <Grid item xs={12} md={4}>
            <Typography
              variant="h4"
              sx={{
                fontFamily: "'Cormorant Garamond', serif",
                color: 'primary.main',
                mb: 2,
              }}
            >
              Dominion City
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
              Raising Leaders, Impacting Generations
            </Typography>
            <Stack direction="row" spacing={1}>
              {[
                { icon: <Globe size={18} />, href: 'https://facebook.com/dominioncity' },
                { icon: <Camera size={18} />, href: 'https://instagram.com/dominioncity' },
                { icon: <Video size={18} />, href: 'https://youtube.com/dominioncity' },
                { icon: <MessageCircle size={18} />, href: 'https://twitter.com/dominioncity' },
              ].map((social, i) => (
                <IconButton
                  key={i}
                  component="a"
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    bgcolor: 'action.hover',
                    color: 'primary.main',
                    '&:hover': {
                      bgcolor: 'primary.main',
                      color: 'primary.contrastText',
                    },
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Stack>
          </Grid>

          <Grid item xs={6} md={2}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: 'primary.main' }}>
              Quick Links
            </Typography>
            <Stack spacing={1.5}>
              {[
                { label: 'About Us', to: '/about' },
                { label: 'Ministries', to: '/ministries' },
                { label: 'Events', to: '/events' },
                { label: 'Sermons', to: '/sermons' },
                { label: 'Giving', to: '/give' },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  style={{
                    color: 'inherit',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.secondary',
                      '&:hover': { color: 'primary.main' },
                    }}
                  >
                    {link.label}
                  </Typography>
                </Link>
              ))}
            </Stack>
          </Grid>

          <Grid item xs={6} md={2}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: 'primary.main' }}>
              Ministries
            </Typography>
            <Stack spacing={1.5}>
              {['Worship Team', 'The Edge Youth', 'Women of Impact', 'Men of Honour', "Children's Church"].map(
                (item) => (
                  <Typography
                    key={item}
                    variant="body2"
                    component={Link}
                    to="/ministries"
                    sx={{
                      color: 'text.secondary',
                      textDecoration: 'none',
                      '&:hover': { color: 'primary.main' },
                    }}
                  >
                    {item}
                  </Typography>
                )
              )}
            </Stack>
          </Grid>

          <Grid item xs={12} md={3}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: 'primary.main' }}>
              Contact Us
            </Typography>
            <Stack spacing={2}>
              <Stack direction="row" spacing={1} alignItems="center">
                <MapPin size={16} />
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  23 Dominion Way, Lagos, Nigeria
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <Phone size={16} />
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  +234 123 456 7890
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <Mail size={16} />
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  info@dominioncity.org
                </Typography>
              </Stack>
            </Stack>
            <Box sx={{ mt: 3, p: 2, bgcolor: 'action.hover', borderRadius: 2 }}>
              <Typography variant="subtitle2" sx={{ color: 'primary.main', mb: 1 }}>
                Service Times
              </Typography>
              <Typography variant="caption" display="block" sx={{ color: 'text.secondary' }}>
                Sundays: 8:00 AM & 10:00 AM
              </Typography>
              <Typography variant="caption" display="block" sx={{ color: 'text.secondary' }}>
                Wednesdays: 6:00 PM (Digging Deep)
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: 'divider' }} />

        <Typography
          variant="body2"
          align="center"
          sx={{ color: 'text.secondary' }}
        >
          &copy; {currentYear} Dominion City. All Rights Reserved. | Website by{' '}
          <Typography
            component="a"
            href="https://github.com/Phynix23"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: 'primary.main', textDecoration: 'none' }}
          >
            Abuoma David
          </Typography>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
