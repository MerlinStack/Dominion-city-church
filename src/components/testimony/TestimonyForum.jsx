import React, { useState, useEffect } from 'react';
import {
  Box, Container, Typography, Button, Stack, TextField, MenuItem,
  IconButton, Chip, Dialog, DialogTitle, DialogContent, DialogActions,
  Checkbox, FormControlLabel, Avatar, alpha, InputAdornment,
} from '@mui/material';
import { motion } from 'framer-motion';
import {
  User, Heart, Share2, ThumbsUp, Search, Star,
  HandHelping, HelpingHand, Church, Home, Plus,
} from 'lucide-react';
import { toast } from 'react-toastify';

const categoryConfig = {
  healing: { icon: <Heart size={16} />, color: '#4CAF50' },
  financial: { icon: <HandHelping size={16} />, color: '#FFC107' },
  family: { icon: <Home size={16} />, color: '#9C27B0' },
  deliverance: { icon: <HelpingHand size={16} />, color: '#F44336' },
  career: { icon: <Church size={16} />, color: '#2196F3' },
};

const categories = [
  { id: 'all', name: 'All Testimonies', icon: <Star size={16} /> },
  { id: 'healing', name: 'Healing', icon: <Heart size={16} /> },
  { id: 'financial', name: 'Financial', icon: <HandHelping size={16} /> },
  { id: 'family', name: 'Family', icon: <Home size={16} /> },
  { id: 'deliverance', name: 'Deliverance', icon: <HelpingHand size={16} /> },
  { id: 'career', name: 'Career', icon: <Church size={16} /> },
];

const TestimonyCard = ({ testimony, isLiked, onLike, onPray, onShare, onView }) => {
  const cat = categoryConfig[testimony.category] || categoryConfig.healing;
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} whileHover={{ y: -5 }}>
      <Box sx={{ p: 3, borderRadius: 3, bgcolor: 'background.paper', border: '1px solid', borderColor: testimony.featured ? 'primary.main' : 'divider', position: 'relative', transition: 'all 0.3s ease', '&:hover': { boxShadow: '0 10px 30px -10px rgba(65,105,225,0.3)' } }}>
        {testimony.featured && (
          <Chip icon={<Star size={14} />} label="Featured" size="small" color="primary" sx={{ position: 'absolute', top: 12, right: 12 }} />
        )}
        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
          <Avatar sx={{ bgcolor: alpha('#4169E1', 0.2), color: 'primary.main' }}><User size={18} /></Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{testimony.name}</Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              {new Date(testimony.date).toLocaleDateString()}
            </Typography>
          </Box>
          <Box sx={{ color: cat.color, bgcolor: alpha(cat.color, 0.1), p: 1, borderRadius: 2 }}>
            {cat.icon}
          </Box>
        </Stack>
        <Typography variant="h6" sx={{ fontFamily: "'Cormorant Garamond', serif", mb: 1 }}>{testimony.title}</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
          {testimony.testimony.substring(0, 120)}...
        </Typography>
        <Stack direction="row" spacing={1} alignItems="center">
          <IconButton size="small" onClick={onLike} sx={{ color: isLiked ? 'primary.main' : 'text.secondary' }}>
            <ThumbsUp size={16} /> <Typography variant="caption" sx={{ ml: 0.5 }}>{testimony.likes}</Typography>
          </IconButton>
          <IconButton size="small" onClick={onPray} sx={{ color: 'text.secondary' }}>
            <HelpingHand size={16} /> <Typography variant="caption" sx={{ ml: 0.5 }}>{testimony.prayerCount}</Typography>
          </IconButton>
          <IconButton size="small" onClick={onShare} sx={{ color: 'text.secondary' }}><Share2 size={16} /></IconButton>
          <Button size="small" onClick={onView} sx={{ ml: 'auto' }}>Read More</Button>
        </Stack>
      </Box>
    </motion.div>
  );
};

const TestimonyForum = () => {
  const [testimonies, setTestimonies] = useState([
    { id: 1, name: 'Sarah Johnson', date: '2024-03-15', title: 'Healed from Chronic Illness', testimony: 'After 5 years of chronic back pain, God healed me during a Sunday service! I can now walk without pain and serve in the ushering team.', category: 'healing', likes: 24, comments: 8, featured: true, prayerCount: 12, userAvatar: null },
    { id: 2, name: 'Michael Okonkwo', date: '2024-03-10', title: 'Financial Breakthrough', testimony: 'I was about to lose my business when God provided a miracle. A client I had been chasing for 2 years suddenly signed a contract worth 5 million!', category: 'financial', likes: 45, comments: 15, featured: true, prayerCount: 28, userAvatar: null },
    { id: 3, name: 'Pastor David Adeleke', date: '2024-03-05', title: 'Family Restoration', testimony: 'My marriage was on the brink of collapse, but through prayers and counseling at Dominion City, God restored our home.', category: 'family', likes: 67, comments: 23, featured: true, prayerCount: 35, userAvatar: null },
    { id: 4, name: 'Blessing Eze', date: '2024-02-28', title: 'Delivered from Depression', testimony: 'I struggled with depression for years. Through the Digging Deep service and mentorship, God set me free.', category: 'deliverance', likes: 52, comments: 18, featured: false, prayerCount: 22, userAvatar: null },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [likedTestimonies, setLikedTestimonies] = useState([]);
  const [selectedTestimony, setSelectedTestimony] = useState(null);
  const [newTestimony, setNewTestimony] = useState({ name: '', title: '', testimony: '', category: 'healing', isAnonymous: false, agreeToTerms: false });

  useEffect(() => {
    const saved = localStorage.getItem('likedTestimonies');
    if (saved) setLikedTestimonies(JSON.parse(saved));
  }, []);

  const handleLike = (id) => {
    if (likedTestimonies.includes(id)) {
      setTestimonies((prev) => prev.map((t) => t.id === id ? { ...t, likes: t.likes - 1 } : t));
      setLikedTestimonies((prev) => {
        const updated = prev.filter((v) => v !== id);
        localStorage.setItem('likedTestimonies', JSON.stringify(updated));
        return updated;
      });
      toast.info('You removed your like');
    } else {
      setTestimonies((prev) => prev.map((t) => t.id === id ? { ...t, likes: t.likes + 1 } : t));
      setLikedTestimonies((prev) => {
        const updated = [...prev, id];
        localStorage.setItem('likedTestimonies', JSON.stringify(updated));
        return updated;
      });
      toast.success('Thank you for encouraging this testimony!');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTestimony.agreeToTerms) { toast.error('Please agree to the terms before submitting'); return; }
    const testimony = {
      id: Date.now(),
      name: newTestimony.isAnonymous ? 'Anonymous' : newTestimony.name,
      date: new Date().toISOString().split('T')[0],
      title: newTestimony.title,
      testimony: newTestimony.testimony,
      category: newTestimony.category,
      likes: 0, comments: 0, featured: false, prayerCount: 0, userAvatar: null,
    };
    setTestimonies([testimony, ...testimonies]);
    setShowForm(false);
    setNewTestimony({ name: '', title: '', testimony: '', category: 'healing', isAnonymous: false, agreeToTerms: false });
    toast.success('Testimony submitted! It will be reviewed and published soon.');
  };

  const handlePray = (id) => {
    setTestimonies((prev) => prev.map((t) => t.id === id ? { ...t, prayerCount: t.prayerCount + 1 } : t));
    toast.success('Prayer offered for this testimony!');
  };

  const handleShare = async (testimony) => {
    const text = `${testimony.title}\n\n${testimony.testimony}\n\nShared from Dominion City Church`;
    if (navigator.share) {
      try { await navigator.share({ title: testimony.title, text, url: window.location.href }); } catch { navigator.clipboard.writeText(text); toast.info('Link copied to clipboard!'); }
    } else { navigator.clipboard.writeText(text); toast.info('Link copied to clipboard!'); }
  };

  const filtered = testimonies.filter((t) => {
    const matchesCat = selectedCategory === 'all' || t.category === selectedCategory;
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || t.testimony.toLowerCase().includes(searchQuery.toLowerCase()) || t.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const featured = filtered.filter((t) => t.featured);
  const regular = filtered.filter((t) => !t.featured);

  return (
    <Box sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="overline" sx={{ color: 'primary.main', letterSpacing: '0.14em', display: 'block', mb: 1 }}>
            Share Your Story
          </Typography>
          <Typography variant="h2">Testimony Forum</Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', mt: 1 }}>
            What has God done for you? Share your testimony to encourage others!
          </Typography>
        </Box>

        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Button variant="contained" startIcon={<Plus size={16} />} onClick={() => setShowForm(true)}>
            Share Your Testimony
          </Button>
        </Box>

        <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" spacing={2} sx={{ mb: 4 }}>
          <TextField size="small" placeholder="Search testimonies..." value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{ startAdornment: <InputAdornment position="start"><Search size={18} /></InputAdornment> }}
            sx={{ minWidth: 300, '& .MuiOutlinedInput-root': { borderRadius: 4 } }} />
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {categories.map((cat) => (
              <Chip key={cat.id} icon={cat.icon} label={cat.name}
                onClick={() => setSelectedCategory(cat.id)}
                variant={selectedCategory === cat.id ? 'filled' : 'outlined'}
                sx={{ fontWeight: 600, bgcolor: selectedCategory === cat.id ? 'primary.main' : 'transparent',
                  color: selectedCategory === cat.id ? 'white' : 'text.primary', borderColor: 'primary.main' }}
              />
            ))}
          </Stack>
        </Stack>

        {featured.length > 0 && (
          <Box sx={{ mb: 6 }}>
            <Typography variant="h5" sx={{ fontFamily: "'Cormorant Garamond', serif", mb: 3 }}>Featured Testimonies</Typography>
            <Stack spacing={2}>
              {featured.map((t) => (
                <TestimonyCard key={t.id} testimony={t} isLiked={likedTestimonies.includes(t.id)}
                  onLike={() => handleLike(t.id)} onPray={() => handlePray(t.id)}
                  onShare={() => handleShare(t)} onView={() => setSelectedTestimony(t)} />
              ))}
            </Stack>
          </Box>
        )}

        <Stack spacing={2}>
          {regular.map((t) => (
            <TestimonyCard key={t.id} testimony={t} isLiked={likedTestimonies.includes(t.id)}
              onLike={() => handleLike(t.id)} onPray={() => handlePray(t.id)}
              onShare={() => handleShare(t)} onView={() => setSelectedTestimony(t)} />
          ))}
        </Stack>

        {filtered.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Star size={48} style={{ color: '#4169E1', marginBottom: 16 }} />
            <Typography variant="h6">No testimonies found</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>Be the first to share what God has done for you!</Typography>
            <Button variant="contained" onClick={() => setShowForm(true)}>Share Your Testimony</Button>
          </Box>
        )}
      </Container>

      <Dialog open={showForm} onClose={() => setShowForm(false)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 4 } }}>
        <DialogTitle sx={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Share Your Testimony
        </DialogTitle>
        <Box component="form" onSubmit={handleSubmit}>
          <DialogContent>
            <Stack spacing={2}>
              <TextField fullWidth label="Your Name" value={newTestimony.name}
                onChange={(e) => setNewTestimony({ ...newTestimony, name: e.target.value })}
                disabled={newTestimony.isAnonymous} required={!newTestimony.isAnonymous} />
              <FormControlLabel control={<Checkbox checked={newTestimony.isAnonymous}
                onChange={(e) => setNewTestimony({ ...newTestimony, isAnonymous: e.target.checked })} />}
                label="Post anonymously" />
              <TextField fullWidth label="Testimony Title" value={newTestimony.title}
                onChange={(e) => setNewTestimony({ ...newTestimony, title: e.target.value })} required />
              <TextField select fullWidth label="Category" value={newTestimony.category}
                onChange={(e) => setNewTestimony({ ...newTestimony, category: e.target.value })} required>
                {categories.filter((c) => c.id !== 'all').map((cat) => (
                  <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>
                ))}
              </TextField>
              <TextField fullWidth multiline rows={5} label="Share your testimony..." value={newTestimony.testimony}
                onChange={(e) => setNewTestimony({ ...newTestimony, testimony: e.target.value })} required />
              <FormControlLabel control={<Checkbox checked={newTestimony.agreeToTerms}
                onChange={(e) => setNewTestimony({ ...newTestimony, agreeToTerms: e.target.checked })} />}
                label="I confirm that this testimony is true and agree to share it publicly" />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button onClick={() => setShowForm(false)}>Cancel</Button>
            <Button type="submit" variant="contained">Submit Testimony</Button>
          </DialogActions>
        </Box>
      </Dialog>

      <Dialog open={!!selectedTestimony} onClose={() => setSelectedTestimony(null)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 4 } }}>
        {selectedTestimony && (
          <>
            <DialogTitle sx={{ fontFamily: "'Cormorant Garamond', serif" }}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Avatar sx={{ bgcolor: alpha('#4169E1', 0.2), color: 'primary.main', width: 32, height: 32 }}>
                  <User size={16} />
                </Avatar>
                <Box>
                  <Typography variant="subtitle2">{selectedTestimony.name}</Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    {new Date(selectedTestimony.date).toLocaleDateString()}
                  </Typography>
                </Box>
                <Box sx={{ ml: 'auto' }}>
                  <Chip size="small" label={categories.find((c) => c.id === selectedTestimony.category)?.name} />
                </Box>
              </Stack>
            </DialogTitle>
            <DialogContent>
              <Typography variant="h5" sx={{ fontFamily: "'Cormorant Garamond', serif", mb: 2 }}>
                {selectedTestimony.title}
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3 }}>
                {selectedTestimony.testimony}
              </Typography>
              <Stack direction="row" spacing={2}>
                <Button startIcon={<ThumbsUp size={16} />} variant={likedTestimonies.includes(selectedTestimony.id) ? 'contained' : 'outlined'}
                  onClick={() => handleLike(selectedTestimony.id)}>
                  {selectedTestimony.likes} Encouraged
                </Button>
                <Button startIcon={<HelpingHand size={16} />} variant="outlined" onClick={() => handlePray(selectedTestimony.id)}>
                  {selectedTestimony.prayerCount} Prayed
                </Button>
                <Button startIcon={<Share2 size={16} />} variant="outlined" onClick={() => handleShare(selectedTestimony)}>
                  Share
                </Button>
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setSelectedTestimony(null)}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default TestimonyForum;
