import React, { lazy, Suspense, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import LoadingSpinner from './components/common/LoadingSpinner';
import GlobalSearch from './components/common/GlobalSearch';
import ScrollToTop from './components/common/ScrollToTop';
import { AppThemeProvider } from './theme/MuiThemeProvider';
import { useThemeStore } from './stores/useThemeStore';
import { Box } from '@mui/material';
import './styles/index.css';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Ministries = lazy(() => import('./pages/Ministries'));
const Events = lazy(() => import('./pages/Events'));
const Sermons = lazy(() => import('./pages/Sermons'));
const Give = lazy(() => import('./pages/Give'));
const Contact = lazy(() => import('./pages/Contact'));
const Admin = lazy(() => import('./pages/Admin'));
const Books = lazy(() => import('./pages/Books'));

const App = () => {
  const mode = useThemeStore((s) => s.mode);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark-theme', 'light-theme');
    root.classList.add(`${mode}-theme`);
    localStorage.setItem('theme', mode);
  }, [mode]);

  return (
    <AppThemeProvider>
      <ScrollToTop />
      <Navbar />
      <GlobalSearch />
      <Box component="main" sx={{ minHeight: '100vh' }}>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/ministries" element={<Ministries />} />
            <Route path="/events" element={<Events />} />
            <Route path="/sermons" element={<Sermons />} />
            <Route path="/give" element={<Give />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/books" element={<Books />} />
          </Routes>
        </Suspense>
      </Box>
      <Footer />
    </AppThemeProvider>
  );
};

export default App;
