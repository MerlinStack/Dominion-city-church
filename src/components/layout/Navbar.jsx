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
import { Menu, X, Search, Sun, Moon } from 'lucide-react';

import { useThemeStore } from '../../stores/useThemeStore';
import { useUiStore } from '../../stores/useUiStore';

const navLinks = [
  {
    label: 'About',
    dropdown: [
      { path: '/about#story', label: 'Our story' },
      { path: '/about#beliefs', label: 'Our beliefs' },
      { path: '/about#pastor', label: 'Our pastor' },
    ],
  },
  {
    label: 'Ministries',
    dropdown: [
      { path: '/ministries#workforce', label: 'Workforce' },
      { path: '/ministries#youth', label: 'The Edge Youth' },
      { path: '/ministries#women', label: 'Women of Impact' },
      { path: '/ministries#men', label: 'Men of Honour' },
    ],
  },
  { path: '/events', label: 'Events' },
  { path: '/sermons', label: 'Messages' },
  { path: '/books', label: 'Books' },
  { path: '/contact', label: 'Contact' },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const location = useLocation();
  const scrolled = useScrollTrigger({ disableHysteresis: true, threshold: 50 });
  const toggleTheme = useThemeStore((s) => s.toggleTheme);
  const mode = useThemeStore((s) => s.mode);
  const openSearch = useUiStore((s) => s.openSearch);

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
              fontSize: '0.92rem',
              fontWeight: 500,
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
                  elevation={0}
                  sx={{
                    mt: 1,
                    minWidth: 210,
                    borderRadius: 2,
                    bgcolor: 'background.paper',
                    border: '1px solid',
                    borderColor: 'divider',
                    boxShadow: '0 16px 40px -16px rgba(2,6,18,0.35)',
                    overflow: 'hidden',
                  }}
                >
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList sx={{ py: 1 }}>
                      {link.dropdown?.map((item) => (
                        <ListItemButton
                          key={item.path}
                          component={Link}
                          to={item.path}
                          onClick={handleClose}
                          sx={{
                            py: 1.2,
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
          fontSize: '0.92rem',
          fontWeight: 500,
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
        <IconButton onClick={() => setMobileOpen(false)} aria-label="Close menu">
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
            <ListItemText primary="Give" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: scrolled ? 'background.default' : 'transparent',
          backdropFilter: scrolled ? 'blur(14px)' : 'none',
          transition: 'background-color 0.4s ease, backdrop-filter 0.4s ease',
          borderBottom: scrolled ? '1px solid' : 'none',
          borderColor: 'divider',
          boxShadow: scrolled ? '0 8px 30px -20px rgba(2,6,18,0.4)' : 'none',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between', minHeight: { xs: 64, md: 72 } }}>
            <Box
              component={Link}
              to="/"
              sx={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}
              aria-label="Dominion City home"
            >
              <Box
                component="img"
                src="/images/logo.png"
                alt="Dominion City"
                sx={{ height: 46, width: 'auto' }}
              />
            </Box>

            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 0.5 }}>
              {navLinks.map((link, index) => renderLink(link, index))}
              <IconButton onClick={openSearch} aria-label="Search" sx={{ color: 'text.primary', ml: 1 }}>
                <Search size={19} />
              </IconButton>
              <IconButton onClick={toggleTheme} sx={{ color: 'text.primary' }} aria-label="Toggle theme">
                {mode === 'dark' ? <Sun size={19} /> : <Moon size={19} />}
              </IconButton>
              <Button component={Link} to="/give" variant="contained" sx={{ ml: 1.5 }}>
                Give
              </Button>
            </Box>

            <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', gap: 0.5 }}>
              <IconButton onClick={openSearch} sx={{ color: 'text.primary' }} aria-label="Search">
                <Search size={19} />
              </IconButton>
              <IconButton onClick={toggleTheme} sx={{ color: 'text.primary' }} aria-label="Toggle theme">
                {mode === 'dark' ? <Sun size={19} /> : <Moon size={19} />}
              </IconButton>
              <IconButton onClick={() => setMobileOpen(true)} sx={{ color: 'text.primary' }} aria-label="Open menu">
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
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Navbar;