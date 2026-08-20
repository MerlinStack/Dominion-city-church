import React from 'react';

import { motion } from 'framer-motion';
import Seo from '../components/common/Seo';
import Hero from '../components/home/Hero';
import LiveServiceBanner from '../components/home/LiveServiceBanner';
import WhatToExpect from '../components/home/WhatToExpect';
import AboutSection from '../components/home/AboutSection';
import SermonsSection from '../components/home/SermonsSection';
import MinistriesSection from '../components/home/MinistriesSection';
import EventsSection from '../components/home/EventsSection';
import TestimonyForum from '../components/testimony/TestimonyForum';
import GivingSection from '../components/home/GivingSection';
import MarqueeGrid from '../components/home/MarqueeGrid';
import BooksSection from '../components/books/BooksSection';

const churchJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Church',
  name: 'Dominion City',
  alternateName: 'Seeds of Dominion',
  url: typeof window !== 'undefined' ? window.location.origin : '',
  telephone: '+234 123 456 7890',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '23 Dominion Way',
    addressLocality: 'Lagos',
    addressCountry: 'NG',
  },
  openingHours: ['Su 08:00-10:00', 'Su 10:00-12:00', 'We 18:00-20:00'],
  founder: { '@type': 'Person', name: 'Dr. David Ogbueli' },
  sameAs: [
    'https://facebook.com/dominioncity',
    'https://instagram.com/dominioncity',
    'https://youtube.com/dominioncity',
    'https://twitter.com/dominioncity',
  ],
};

const Home = () => {
  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
      <Seo
        path="/"
        title="Dominion City | A Place Where Leaders Are Raised"
        description="Dominion City is a life-transforming church community led by Dr. David Ogbueli, dedicated to raising kingdom-minded leaders and impacting generations. Join us Sundays at 8:00 and 10:00 AM."
        image="/images/hero/congregation.jpeg"
        jsonLd={churchJsonLd}
      />
      <Hero />
      <LiveServiceBanner />
      <WhatToExpect />
      <AboutSection />
      <SermonsSection />
      <MinistriesSection />
      <EventsSection />
      <TestimonyForum />
      <GivingSection />
      <MarqueeGrid />
      <BooksSection />
    </motion.main>
  );
};

export default Home;