import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { Home, PlayCircle, Heart, MapPin } from 'lucide-react';

const items = [
  { path: '/', label: 'Home', icon: <Home size={21} /> },
  { path: '/sermons', label: 'Watch', icon: <PlayCircle size={21} /> },
  { path: '/give', label: 'Give', icon: <Heart size={21} /> },
  { path: '/contact', label: 'Visit', icon: <MapPin size={21} /> },
];

const MobileBottomNav = () => {
  const location = useLocation();

  return (
    <Box
      component="nav"
      aria-label="Primary mobile navigation"
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1200,
        display: { xs: 'flex', md: 'none' },
        bgcolor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'divider',
        backdropFilter: 'blur(16px)',
        pb: 'env(safe-area-inset-bottom)',
      }}
    >
      {items.map((item) => {
        const active = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            aria-current={active ? 'page' : undefined}
            style={{ flex: 1, textDecoration: 'none' }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 0.4,
                py: 1,
                minHeight: 60,
                color: active ? 'primary.main' : 'text.secondary',
                transition: 'color 0.25s ease',
              }}
            >
              {item.icon}
              <Typography sx={{ fontSize: '0.68rem', fontWeight: active ? 600 : 500 }}>
                {item.label}
              </Typography>
            </Box>
          </Link>
        );
      })}
    </Box>
  );
};

export default MobileBottomNav;