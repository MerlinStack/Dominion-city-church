import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Box,
  InputBase,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Chip,
  alpha,
} from '@mui/material';
import { Search, X, Calendar, Video, Heart, FileText } from 'lucide-react';

const GlobalSearch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [allContent, setAllContent] = useState([]);

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem('admin_events') || '[]');
    const storedSermons = JSON.parse(localStorage.getItem('admin_sermons') || '[]');
    const storedTestimonies = JSON.parse(localStorage.getItem('admin_testimonies') || '[]');

    const staticContent = [
      { type: 'page', title: 'Home', path: '/', content: 'Welcome to Dominion City' },
      { type: 'page', title: 'About Us', path: '/about', content: 'Our story and beliefs' },
      { type: 'page', title: 'Ministries', path: '/ministries', content: 'Church ministries' },
      { type: 'page', title: 'Events', path: '/events', content: 'Upcoming events' },
      { type: 'page', title: 'Sermons', path: '/sermons', content: 'Latest messages' },
      { type: 'page', title: 'Give', path: '/give', content: 'Support the vision' },
      { type: 'page', title: 'Contact', path: '/contact', content: 'Get in touch' },
    ];

    const formattedEvents = storedEvents.map((e) => ({
      ...e,
      type: 'event',
      path: '/events',
    }));
    const formattedSermons = storedSermons.map((s) => ({
      ...s,
      type: 'sermon',
      path: '/sermons',
    }));
    const formattedTestimonies = storedTestimonies.map((t) => ({
      ...t,
      type: 'testimony',
      path: '/',
    }));

    setAllContent([...staticContent, ...formattedEvents, ...formattedSermons, ...formattedTestimonies]);
  }, []);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }
    const q = query.toLowerCase();
    const filtered = allContent.filter(
      (item) =>
        item.title?.toLowerCase().includes(q) ||
        item.description?.toLowerCase().includes(q) ||
        item.content?.toLowerCase().includes(q)
    ).slice(0, 10);
    setResults(filtered);
  }, [query, allContent]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') setIsOpen(false);
    },
    []
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const getIcon = (type) => {
    switch (type) {
      case 'event':
        return <Calendar size={20} />;
      case 'sermon':
        return <Video size={20} />;
      case 'testimony':
        return <Heart size={20} />;
      default:
        return <FileText size={20} />;
    }
  };

  return (
    <>
      <IconButton
        onClick={() => setIsOpen(true)}
        sx={{
          position: 'fixed',
          right: 24,
          bottom: 24,
          zIndex: 1100,
          bgcolor: 'primary.main',
          color: 'white',
          '&:hover': { bgcolor: 'primary.dark' },
          width: 48,
          height: 48,
          boxShadow: '0 4px 15px rgba(65, 105, 225, 0.4)',
        }}
        aria-label="Search"
      >
        <Search size={20} />
      </IconButton>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 2000,
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'center',
              paddingTop: '80px',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              style={{ width: '90%', maxWidth: 700 }}
              initial={{ scale: 0.9, y: -50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: -50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Box
                sx={(theme) => ({
                  bgcolor: 'background.paper',
                  borderRadius: 3,
                  overflow: 'hidden',
                  border: '1px solid',
                  borderColor: 'primary.main',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                })}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    p: 2,
                    borderBottom: 1,
                    borderColor: 'divider',
                  }}
                >
                  <Search size={20} style={{ color: '#4169E1', marginRight: 12 }} />
                  <InputBase
                    autoFocus
                    fullWidth
                    placeholder="Search sermons, events, pages... (Ctrl+K)"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    sx={{ fontSize: '1.1rem' }}
                  />
                  <IconButton onClick={() => setIsOpen(false)} size="small">
                    <X size={20} />
                  </IconButton>
                </Box>

                <Box sx={{ maxHeight: 500, overflow: 'auto' }}>
                  {results.length > 0 ? (
                    <List disablePadding>
                      {results.map((result, index) => (
                        <ListItemButton
                          key={index}
                          component={Link}
                          to={result.path}
                          onClick={() => setIsOpen(false)}
                          sx={{
                            borderBottom: '1px solid',
                            borderColor: 'divider',
                            '&:hover': {
                              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.05),
                            },
                          }}
                        >
                          <ListItemIcon sx={{ minWidth: 40, color: 'primary.main' }}>
                            {getIcon(result.type)}
                          </ListItemIcon>
                          <ListItemText
                            primary={result.title}
                            secondary={
                              result.description?.substring(0, 100) ||
                              result.content?.substring(0, 100)
                            }
                            secondaryTypographyProps={{ noWrap: true }}
                          />
                          <Chip
                            label={result.type}
                            size="small"
                            sx={{
                              textTransform: 'uppercase',
                              fontSize: '0.7rem',
                              fontWeight: 600,
                              color: 'primary.main',
                              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                            }}
                          />
                        </ListItemButton>
                      ))}
                    </List>
                  ) : query.length >= 2 ? (
                    <Typography sx={{ textAlign: 'center', py: 6, color: 'text.secondary' }}>
                      No results found for &ldquo;{query}&rdquo;
                    </Typography>
                  ) : (
                    <Typography sx={{ textAlign: 'center', py: 6, color: 'text.secondary' }}>
                      Type at least 2 characters to search
                    </Typography>
                  )}
                </Box>
              </Box>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GlobalSearch;
