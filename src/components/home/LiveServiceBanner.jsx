import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Container, Typography } from '@mui/material';
import { PlayCircle, ArrowRight } from 'lucide-react';

// Future: set from a real source (backend/Firebase) when available.
// When a service is live, provide { isLive: true, label: "We're live now" }.
const liveState = null;

const LiveServiceBanner = () => {
  const message = liveState
    ? liveState.label
    : 'Watch our latest service';

  return (
    <Box
      component="section"
      sx={{
        borderTop: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
      }}
    >
      <Container maxWidth="lg">
        <Box
          component={Link}
          to="/sermons"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
            py: { xs: 2.5, md: 3 },
            textDecoration: 'none',
            color: 'inherit',
            flexWrap: 'wrap',
            '&:hover .live-arrow': { transform: 'translateX(4px)' },
            '&:hover .live-title': { color: 'primary.main' },
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
              sx={{
                width: 42,
                height: 42,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                bgcolor: 'primary.main',
                flexShrink: 0,
              }}
            >
              <PlayCircle size={22} />
            </Box>
            <Box>
              <Typography
                className="live-title"
                variant="h6"
                sx={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: { xs: '1.05rem', md: '1.25rem' },
                  transition: 'color 0.3s ease',
                  lineHeight: 1.2,
                }}
              >
                {message}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.85rem' }}>
                The most recent message from Dominion City
              </Typography>
            </Box>
          </Box>
          <Typography
            className="live-arrow"
            sx={{
              color: 'text.secondary',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              fontWeight: 500,
              fontSize: '0.92rem',
              transition: 'transform 0.3s ease',
            }}
          >
            Watch now <ArrowRight size={17} />
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default LiveServiceBanner;