import React from 'react';
import { Helmet } from 'react-helmet-async';

const getSiteUrl = () => window.location.origin;

const Seo = ({ title, description, path = '', image, jsonLd }) => {
  const canonical = `${getSiteUrl()}${path}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Dominion City" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      {image && <meta property="og:image" content={`${getSiteUrl()}${image}`} />}
      <meta name="twitter:card" content="summary_large_image" />
      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
  );
};

export default Seo;