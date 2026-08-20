import React, { useState } from 'react';
import {
  Box, Container, Typography, Button, Grid, Stack, Chip, IconButton,
  Select, MenuItem, Dialog, DialogTitle, DialogContent,
  Drawer, Divider, Rating,
} from '@mui/material';
import { motion } from 'framer-motion';
import {
  ShoppingCart, Heart, Share2, Eye, Plus, Minus, X,
} from 'lucide-react';
import { toast } from 'react-toastify';

const books = [
  { id: 1, title: 'The Power of Dominion', author: 'Dr. David Ogbueli', price: 5000, originalPrice: 7500, coverImage: '/images/books/power-of-dominion.jpg', description: 'Discover your authority in Christ and learn to walk in dominion over every circumstance.', rating: 4.8, reviews: 127, category: 'Spiritual Growth', isBestseller: true, isNew: false, format: ['Hardcover', 'Paperback', 'E-book'] },
  { id: 2, title: 'Raising Kingdom Leaders', author: 'Dr. David Ogbueli', price: 6500, originalPrice: 8500, coverImage: '/images/books/raising-kingdom-leaders.jpg', description: 'Biblical principles for raising leaders who will impact their generations.', rating: 4.9, reviews: 98, category: 'Leadership', isBestseller: true, isNew: false, format: ['Hardcover', 'Paperback'] },
  { id: 3, title: 'Wisdom for Living', author: 'Dr. David Ogbueli', price: 4500, originalPrice: 6000, coverImage: '/images/books/wisdom-for-living.jpg', description: 'Daily devotional for practical wisdom and spiritual growth.', rating: 4.7, reviews: 203, category: 'Devotional', isBestseller: false, isNew: true, format: ['Paperback', 'E-book'] },
  { id: 4, title: 'Financial Freedom', author: 'Pastor John Adekunle', price: 5500, originalPrice: 7000, coverImage: '/images/books/financial-freedom.jpg', description: 'Biblical principles for financial breakthrough and stewardship.', rating: 4.6, reviews: 86, category: 'Finance', isBestseller: false, isNew: false, format: ['Paperback', 'E-book'] },
  { id: 5, title: 'The Spirit of Prayer', author: 'Dr. David Ogbueli', price: 5000, originalPrice: 6500, coverImage: '/images/books/spirit-of-prayer.jpg', description: 'Understanding the power of prayer and developing a consistent prayer life.', rating: 4.9, reviews: 156, category: 'Prayer', isBestseller: true, isNew: false, format: ['Hardcover', 'Paperback', 'E-book'] },
  { id: 6, title: 'Marriage That Works', author: 'Pastor & Mrs. Ogbueli', price: 7000, originalPrice: 9000, coverImage: '/images/books/marriage-that-works.jpg', description: 'Biblical principles for building a strong and lasting marriage.', rating: 4.8, reviews: 112, category: 'Family', isBestseller: false, isNew: true, format: ['Hardcover', 'Paperback'] },
];

const categories = ['All', 'Spiritual Growth', 'Leadership', 'Devotional', 'Finance', 'Prayer', 'Family'];

const BooksSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [sortBy, setSortBy] = useState('featured');

  const filtered = books.filter((b) => selectedCategory === 'All' || b.category === selectedCategory);
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'bestseller') return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
    return 0;
  });

  const addToCart = (book) => {
    const existing = cart.find((item) => item.id === book.id);
    if (existing) {
      setCart(cart.map((item) =>
        item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
      toast.success(`${book.title} quantity updated!`);
    } else {
      setCart([...cart, { ...book, quantity: 1 }]);
      toast.success(`${book.title} added to cart!`);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
    toast.info('Item removed from cart');
  };

  const updateQty = (id, qty) => {
    if (qty < 1) return;
    setCart(cart.map((item) => item.id === id ? { ...item, quantity: qty } : item));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const checkout = () => {
    if (cart.length === 0) { toast.error('Your cart is empty'); return; }
    toast.info('Online checkout is coming soon — please contact the church office to order these books.');
  };

  return (
    <Box sx={{ py: { xs: 6, md: 10 } }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="overline" sx={{ color: 'primary.main', letterSpacing: '0.14em', display: 'block', mb: 1 }}>
            Resources
          </Typography>
          <Typography variant="h2">Books & Resources</Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>Empowering you with life-transforming materials</Typography>
        </Box>

        <IconButton onClick={() => setShowCart(true)} sx={{ position: 'fixed', top: 100, right: 24, zIndex: 100, bgcolor: 'primary.main', color: 'white', '&:hover': { bgcolor: 'primary.dark' }, width: 48, height: 48 }}>
          <ShoppingCart />
          {cart.length > 0 && (
            <Box sx={{ position: 'absolute', top: -4, right: -4, bgcolor: 'error.main', color: 'white', borderRadius: 10, width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 700 }}>
              {cart.length}
            </Box>
          )}
        </IconButton>

        <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" spacing={2} sx={{ mb: 4 }}>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {categories.map((cat) => (
              <Chip key={cat} label={cat} onClick={() => setSelectedCategory(cat)}
                variant={selectedCategory === cat ? 'filled' : 'outlined'}
                sx={{ fontWeight: 600, bgcolor: selectedCategory === cat ? 'primary.main' : 'transparent',
                  color: selectedCategory === cat ? 'white' : 'text.primary', borderColor: 'primary.main' }}
              />
            ))}
          </Stack>
          <Select size="small" value={sortBy} onChange={(e) => setSortBy(e.target.value)} sx={{ minWidth: 150, borderRadius: 4 }}>
            <MenuItem value="featured">Featured</MenuItem>
            <MenuItem value="price-low">Price: Low to High</MenuItem>
            <MenuItem value="price-high">Price: High to Low</MenuItem>
            <MenuItem value="rating">Highest Rated</MenuItem>
            <MenuItem value="bestseller">Bestsellers</MenuItem>
          </Select>
        </Stack>

        <Grid container spacing={3}>
          {sorted.map((book, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.05 }} viewport={{ once: true }}>
                <Box sx={{ borderRadius: 3, overflow: 'hidden', bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', transition: 'all 0.3s ease', '&:hover': { transform: 'translateY(-8px)', boxShadow: '0 10px 30px -10px rgba(65,105,225,0.3)' } }}>
                  <Box sx={{ position: 'relative', height: 220, overflow: 'hidden', cursor: 'pointer' }} onClick={() => setSelectedBook(book)}>
                    {book.isBestseller && <Chip label="Bestseller" color="primary" size="small" sx={{ position: 'absolute', top: 8, left: 8, zIndex: 2 }} />}
                    {book.isNew && <Chip label="New Release" color="secondary" size="small" sx={{ position: 'absolute', top: 8, left: 8, zIndex: 2 }} />}
                    <Box component="img" src={book.coverImage} alt={book.title}
                      sx={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                      onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                    <Box sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 0.3s ease', '&:hover': { opacity: 1 } }}>
                      <Eye size={24} style={{ color: 'white' }} />
                    </Box>
                  </Box>
                  <Box sx={{ p: 2.5 }}>
                    <Typography variant="h6" sx={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem', mb: 0.5 }}>
                      {book.title}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 1 }}>
                      by {book.author}
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                      <Rating value={book.rating} precision={0.1} readOnly size="small" />
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>({book.reviews})</Typography>
                    </Stack>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1, fontSize: '0.8rem' }}>
                      {book.description.substring(0, 60)}...
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                      <Typography variant="h6" sx={{ color: 'primary.main', fontFamily: "'Cormorant Garamond', serif" }}>
                        {'\u20A6'}{book.price.toLocaleString()}
                      </Typography>
                      {book.originalPrice && (
                        <Typography variant="caption" sx={{ color: 'text.secondary', textDecoration: 'line-through' }}>
                          {'\u20A6'}{book.originalPrice.toLocaleString()}
                        </Typography>
                      )}
                    </Stack>
                    <Button variant="contained" fullWidth size="small" startIcon={<ShoppingCart size={14} />}
                      onClick={() => addToCart(book)}>
                      Add to Cart
                    </Button>
                  </Box>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Drawer anchor="right" open={showCart} onClose={() => setShowCart(false)}
        PaperProps={{ sx: { width: { xs: '100%', sm: 400 }, bgcolor: 'background.default', p: 3 } }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <Typography variant="h5" sx={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Your Cart ({cart.length} items)
          </Typography>
          <IconButton onClick={() => setShowCart(false)}><X /></IconButton>
        </Stack>
        <Divider />
        <Box sx={{ flex: 1, overflow: 'auto', py: 2 }}>
          {cart.length === 0 ? (
            <Typography sx={{ textAlign: 'center', py: 6, color: 'text.secondary' }}>Your cart is empty</Typography>
          ) : (
            <Stack spacing={2}>
              {cart.map((item) => (
                <Box key={item.id} sx={{ display: 'flex', gap: 2, p: 2, borderRadius: 2, bgcolor: 'background.paper' }}>
                  <Box component="img" src={item.coverImage} alt={item.title}
                    sx={{ width: 60, height: 80, borderRadius: 2, objectFit: 'cover' }} />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle2">{item.title}</Typography>
                    <Typography variant="body2" sx={{ color: 'primary.main', fontWeight: 600 }}>{'\u20A6'}{item.price.toLocaleString()}</Typography>
                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1 }}>
                      <IconButton size="small" onClick={() => updateQty(item.id, item.quantity - 1)}><Minus size={14} /></IconButton>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>{item.quantity}</Typography>
                      <IconButton size="small" onClick={() => updateQty(item.id, item.quantity + 1)}><Plus size={14} /></IconButton>
                    </Stack>
                  </Box>
                  <IconButton size="small" onClick={() => removeFromCart(item.id)}><X size={16} /></IconButton>
                </Box>
              ))}
            </Stack>
          )}
        </Box>
        {cart.length > 0 && (
          <Box>
            <Divider />
            <Stack direction="row" justifyContent="space-between" sx={{ py: 2 }}>
              <Typography variant="h6">Total:</Typography>
              <Typography variant="h6" sx={{ color: 'primary.main' }}>{'\u20A6'}{total.toLocaleString()}</Typography>
            </Stack>
            <Button variant="contained" fullWidth size="large" onClick={checkout}>Proceed to Checkout</Button>
          </Box>
        )}
      </Drawer>

      <Dialog open={!!selectedBook} onClose={() => setSelectedBook(null)} maxWidth="md" fullWidth PaperProps={{ sx: { borderRadius: 4 } }}>
        {selectedBook && (
          <>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <IconButton onClick={() => setSelectedBook(null)}><X /></IconButton>
            </DialogTitle>
            <DialogContent sx={{ pt: 0 }}>
              <Grid container spacing={4}>
                <Grid item xs={12} md={5}>
                  <Box sx={{ borderRadius: 3, overflow: 'hidden' }}>
                    <Box component="img" src={selectedBook.coverImage} alt={selectedBook.title} sx={{ width: '100%', height: 350, objectFit: 'cover' }} />
                  </Box>
                </Grid>
                <Grid item xs={12} md={7}>
                  <Typography variant="h3" sx={{ fontFamily: "'Cormorant Garamond', serif", mb: 1 }}>
                    {selectedBook.title}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ color: 'text.secondary', mb: 2 }}>
                    by {selectedBook.author}
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                    <Rating value={selectedBook.rating} precision={0.1} readOnly />
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>({selectedBook.reviews} reviews)</Typography>
                  </Stack>
                  <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3 }}>
                    {selectedBook.description}
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
                    <Typography variant="h4" sx={{ color: 'primary.main', fontFamily: "'Cormorant Garamond', serif" }}>
                      {'\u20A6'}{selectedBook.price.toLocaleString()}
                    </Typography>
                    {selectedBook.originalPrice && (
                      <Typography variant="h6" sx={{ color: 'text.secondary', textDecoration: 'line-through' }}>
                        {'\u20A6'}{selectedBook.originalPrice.toLocaleString()}
                      </Typography>
                    )}
                  </Stack>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>Available formats:</Typography>
                  <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
                    {selectedBook.format.map((f) => (
                      <Chip key={f} label={f} variant="outlined" />
                    ))}
                  </Stack>
                  <Stack direction="row" spacing={2}>
                    <Button variant="contained" startIcon={<ShoppingCart />}
                      onClick={() => { addToCart(selectedBook); setSelectedBook(null); }}>
                      Add to Cart
                    </Button>
                    <Button variant="outlined" startIcon={<Heart />}>Wishlist</Button>
                    <Button variant="outlined" startIcon={<Share2 />}>Share</Button>
                  </Stack>
                </Grid>
              </Grid>
            </DialogContent>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default BooksSection;
