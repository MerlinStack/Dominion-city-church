import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Container,
  useScrollTrigger,
  Divider,
  Typography,
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  MenuList,
  Stack,
  Collapse,
} from '@mui/material';
import { Menu, X, Heart, Sun, Moon } from 'lucide-react';

import { useThemeStore } from '../../stores/useThemeStore';

const navLinks = [
  { path: '/', label: 'HOME' },
  {
    label: 'ABOUT US',
    dropdown: [
      { path: '/about#story', label: 'Our Story' },
      { path: '/about#beliefs', label: 'Our Beliefs' },
      { path: '/about#pastor', label: 'Our Pastor' },
    ],
  },
  {
    label: 'MINISTRIES',
    dropdown: [
      { path: '/ministries#workforce', label: 'Workforce' },
      { path: '/ministries#youth', label: 'The Edge Youth' },
      { path: '/ministries#women', label: 'Women of Impact' },
      { path: '/ministries#men', label: 'Men of Honour' },
    ],
  },
  { path: '/events', label: 'EVENTS' },
  { path: '/sermons', label: 'SERMONS' },
  { path: '/books', label: 'BOOKS' },
  { path: '/contact', label: 'CONTACT' },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const location = useLocation();
  const scrolled = useScrollTrigger({ disableHysteresis: true, threshold: 50 });
  const toggleTheme = useThemeStore((s) => s.toggleTheme);
  const mode = useThemeStore((s) => s.mode);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
    setAnchorEl(null);
  }, [location]);

  const handleToggle = (index, e) => {
    const next = openDropdown === index ? null : index;
    setOpenDropdown(next);
    if (e) setAnchorEl(next !== null ? e.currentTarget : null);
  };

  const handleMouseEnter = (index, e) => {
    setOpenDropdown(index);
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setOpenDropdown(null);
    setAnchorEl(null);
  };

  const renderLink = (link, index) => {
    if (link.dropdown) {
      return (
        <Box key={index} sx={{ position: 'relative' }}>
          <Button
            onClick={(e) => handleToggle(index, e)}
            onMouseEnter={(e) => handleMouseEnter(index, e)}
            sx={{
              color: 'text.primary',
              fontSize: '0.85rem',
              fontWeight: 500,
              letterSpacing: '1px',
              py: 1,
              '&:hover': { color: 'primary.main' },
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: openDropdown === index ? '100%' : '0%',
                height: '2px',
                bgcolor: 'primary.main',
                transition: 'width 0.3s ease',
              },
              '&:hover::after': { width: '100%' },
            }}
          >
            {link.label}
          </Button>
          <Popper
            open={openDropdown === index}
            anchorEl={anchorEl}
            transition
            disablePortal
            onMouseLeave={handleClose}
          >
            {({ TransitionProps }) => (
              <Grow {...TransitionProps} style={{ transformOrigin: 'top' }}>
                <Paper
                  sx={{
                    mt: 1,
                    minWidth: 200,
                    borderRadius: 2,
                    bgcolor: 'background.paper',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid',
                    borderColor: 'primary.main',
                    boxShadow: '0 10px 30px -10px rgba(0,0,0,0.3)',
                  }}
                >
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList>
                      {link.dropdown?.map((item) => (
                        <ListItemButton
                          key={item.path}
                          component={Link}
                          to={item.path}
                          onClick={handleClose}
                          sx={{
                            color: 'text.secondary',
                            '&:hover': { color: 'primary.main', bgcolor: 'action.hover' },
                          }}
                        >
                          <ListItemText primary={item.label} />
                        </ListItemButton>
                      ))}
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </Box>
      );
    }

    return (
      <Button
        key={index}
        component={NavLink}
        to={link.path}
        sx={{
          color: 'text.primary',
          fontSize: '0.85rem',
          fontWeight: 500,
          letterSpacing: '1px',
          py: 1,
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '0%',
            height: '2px',
            bgcolor: 'primary.main',
            transition: 'width 0.3s ease',
          },
          '&:hover': { color: 'primary.main' },
          '&:hover::after': { width: '100%' },
          '&.active': {
            color: 'primary.main',
            '&::after': { width: '100%' },
          },
        }}
      >
        {link.label}
      </Button>
    );
  };

  const drawerContent = (
    <Box sx={{ width: 280, pt: 2 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" px={2} mb={2}>
        <Typography
          variant="h6"
          sx={{ fontFamily: "'Cormorant Garamond', serif", color: 'primary.main' }}
        >
          Menu
        </Typography>
        <IconButton onClick={() => setMobileOpen(false)}>
          <X />
        </IconButton>
      </Stack>
      <Divider />
      <List>
        {navLinks.map((link, index) => (
          <Box key={index}>
            {link.path ? (
              <ListItem disablePadding>
                <ListItemButton
                  component={NavLink}
                  to={link.path}
                  sx={{ '&.active': { color: 'primary.main', bgcolor: 'action.selected' } }}
                >
                  <ListItemText primary={link.label} />
                </ListItemButton>
              </ListItem>
            ) : (
              <>
                <ListItem disablePadding>
                  <ListItemButton onClick={() => handleToggle(index)}>
                    <ListItemText primary={link.label} />
                  </ListItemButton>
                </ListItem>
                <Collapse in={openDropdown === index}>
                  <List disablePadding>
                    {link.dropdown?.map((item) => (
                      <ListItemButton
                        key={item.path}
                        component={Link}
                        to={item.path}
                        sx={{ pl: 4 }}
                      >
                        <ListItemText primary={item.label} />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              </>
            )}
          </Box>
        ))}
        <Divider sx={{ my: 1 }} />
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/give">
            <Heart />
            <ListItemText primary="GIVE" sx={{ ml: 2 }} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        elevation={scrolled ? 1 : 0}
        sx={{
          bgcolor: scrolled
            ? 'background.default'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(10px)' : 'none',
          transition: 'all 0.4s ease',
          borderBottom: scrolled ? '1px solid' : 'none',
          borderColor: 'divider',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
            <Box
              component={Link}
              to="/"
              sx={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}
            >
              <Box
                component="img"
                src="/images/logo.png"
                alt="Dominion City"
                sx={{ height: 50, width: 'auto' }}
              />
            </Box>

            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
              {navLinks.map((link, index) => renderLink(link, index))}
              <IconButton onClick={toggleTheme} sx={{ color: 'text.primary', ml: 1 }}>
                {mode === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </IconButton>
              <Button
                component={Link}
                to="/give"
                variant="contained"
                startIcon={<Heart size={16} />}
                sx={{
                  ml: 1,
                  border: '2px solid transparent',
                  '&:hover': {
                    bgcolor: 'transparent',
                    borderColor: 'primary.main',
                    color: 'primary.main',
                    boxShadow: 'none',
                  },
                }}
              >
                GIVE
              </Button>
            </Box>

            <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', gap: 1 }}>
              <IconButton onClick={toggleTheme} sx={{ color: 'text.primary' }}>
                {mode === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </IconButton>
              <IconButton onClick={() => setMobileOpen(true)} sx={{ color: 'text.primary' }}>
                <Menu />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{
          sx: {
            bgcolor: 'background.default',
            backdropFilter: 'blur(20px)',
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Navbar;
