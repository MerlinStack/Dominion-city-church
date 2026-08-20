import React, { useState } from 'react';
import { Box, Container, Typography, Button, Stack, TextField } from '@mui/material';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { CreditCard, Building2, Smartphone, Bitcoin, Lock } from 'lucide-react';
import { toast } from 'react-toastify';

const Give = () => {
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({ cardNumber: '', expiry: '', cvv: '', cardName: '', email: '' });

  const amountPresets = [5000, 10000, 20000, 50000, 100000];

  const handleCardPayment = (e) => {
    e.preventDefault();
    if (!amount) { toast.error('Please enter an amount'); return; }
    toast.success(`Processing payment of \u20A6${parseInt(amount).toLocaleString()}...`);
  };

  const handleCopyDetails = () => {
    navigator.clipboard.writeText('Dominion City Church\nFirst Bank of Nigeria\nAccount: 2023456789\nSort Code: 011');
    toast.success('Bank details copied to clipboard!');
  };

  return (
    <>
      <Helmet>
        <title>Give | Seeds of Dominion</title>
        <meta name="description" content="Support the vision of Dominion City through tithes, offerings, and special projects." />
      </Helmet>
      <Box sx={{ pt: '80px' }}>
        <Box sx={{ py: { xs: 8, md: 12 }, textAlign: 'center', background: (theme) =>
          theme.palette.mode === 'dark' ? 'linear-gradient(135deg, #000000, #1E3A8A)' : 'linear-gradient(135deg, #F8FAFC, #E8F0FE)',
        }}>
          <Container maxWidth="md">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Typography variant="h1" sx={{ fontSize: { xs: '2.5rem', md: '4rem' }, mb: 2 }}>Seeds of Dominion</Typography>
              <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 300 }}>Partner with us to raise leaders and impact generations</Typography>
            </motion.div>
          </Container>
        </Box>

        <Box sx={{ py: { xs: 6, md: 10 } }}>
          <Container maxWidth="md">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Typography variant="h5" sx={{ mb: 2, textAlign: 'center', fontFamily: "'Cormorant Garamond', serif" }}>Select Amount</Typography>
              <Stack direction="row" justifyContent="center" spacing={1} sx={{ mb: 3, flexWrap: 'wrap', gap: 1 }}>
                {amountPresets.map((preset) => (
                  <Button key={preset} variant={amount === preset.toString() ? 'contained' : 'outlined'}
                    onClick={() => setAmount(preset.toString())}>
                    {'\u20A6'}{preset.toLocaleString()}
                  </Button>
                ))}
              </Stack>
              <TextField fullWidth type="number" placeholder="Custom Amount" value={amount}
                onChange={(e) => setAmount(e.target.value)} sx={{ mb: 4, '& .MuiOutlinedInput-root': { borderRadius: 4 } }} />

              <Typography variant="h5" sx={{ mb: 2, textAlign: 'center', fontFamily: "'Cormorant Garamond', serif" }}>Payment Method</Typography>
              <Stack direction="row" justifyContent="center" spacing={1} sx={{ mb: 4, flexWrap: 'wrap', gap: 1 }}>
                {[
                  { value: 'card', label: 'Card Payment', icon: <CreditCard size={16} /> },
                  { value: 'bank', label: 'Bank Transfer', icon: <Building2 size={16} /> },
                  { value: 'ussd', label: 'USSD', icon: <Smartphone size={16} /> },
                  { value: 'crypto', label: 'Crypto', icon: <Bitcoin size={16} /> },
                ].map((method) => (
                  <Button key={method.value} variant={paymentMethod === method.value ? 'contained' : 'outlined'}
                    startIcon={method.icon} onClick={() => setPaymentMethod(method.value)}>
                    {method.label}
                  </Button>
                ))}
              </Stack>

              {paymentMethod === 'card' && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                  <Box component="form" onSubmit={handleCardPayment} sx={{ maxWidth: 500, mx: 'auto' }}>
                    <Stack spacing={2}>
                      <TextField fullWidth label="Card Number" name="cardNumber" placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber} onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })} required />
                      <Stack direction="row" spacing={2}>
                        <TextField fullWidth label="Expiry Date" name="expiry" placeholder="MM/YY"
                          value={formData.expiry} onChange={(e) => setFormData({ ...formData, expiry: e.target.value })} required />
                        <TextField fullWidth label="CVV" name="cvv" placeholder="123"
                          value={formData.cvv} onChange={(e) => setFormData({ ...formData, cvv: e.target.value })} required />
                      </Stack>
                      <TextField fullWidth label="Cardholder Name" name="cardName" placeholder="John Doe"
                        value={formData.cardName} onChange={(e) => setFormData({ ...formData, cardName: e.target.value })} required />
                      <TextField fullWidth label="Email (for receipt)" type="email" name="email" placeholder="you@example.com"
                        value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                      <Button type="submit" variant="contained" size="large" startIcon={<Lock size={16} />} fullWidth>
                        Pay {'\u20A6'}{amount ? parseInt(amount).toLocaleString() : '0'}
                      </Button>
                    </Stack>
                  </Box>
                </motion.div>
              )}

              {paymentMethod === 'bank' && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                  <Box sx={{ maxWidth: 500, mx: 'auto', p: 4, borderRadius: 3, border: '2px solid', borderColor: 'primary.main', bgcolor: 'background.paper' }}>
                    <Typography variant="h5" sx={{ color: 'primary.main', fontFamily: "'Cormorant Garamond', serif", mb: 3, textAlign: 'center' }}>Bank Transfer Details</Typography>
                    <Stack spacing={2}>
                      {[
                        { label: 'Bank:', value: 'First Bank of Nigeria' },
                        { label: 'Account Name:', value: 'Dominion City Church' },
                        { label: 'Account Number:', value: '2023456789' },
                        { label: 'Sort Code:', value: '011' },
                      ].map((item) => (
                        <Box key={item.label} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography variant="body2">{item.label}</Typography>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>{item.value}</Typography>
                        </Box>
                      ))}
                    </Stack>
                    <Button variant="outlined" fullWidth sx={{ mt: 3 }} onClick={handleCopyDetails}>Copy Details</Button>
                  </Box>
                </motion.div>
              )}

              {paymentMethod === 'ussd' && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center' }}>
                  <Typography variant="h5" sx={{ fontFamily: "'Cormorant Garamond', serif", mb: 2 }}>USSD Payment</Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>Dial the following code on your phone:</Typography>
                  <Box sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 3, border: '1px solid', borderColor: 'primary.main', display: 'inline-block', fontFamily: 'monospace', fontSize: '1.25rem', fontWeight: 700, color: 'primary.main', mb: 2 }}>
                    *894*2023456789*{amount || 'AMOUNT'}#
                  </Box>
                  <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>Follow the prompts to complete your payment</Typography>
                </motion.div>
              )}

              {paymentMethod === 'crypto' && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                  <Box sx={{ maxWidth: 600, mx: 'auto' }}>
                    <Typography variant="h5" sx={{ fontFamily: "'Cormorant Garamond', serif", mb: 3, textAlign: 'center' }}>Crypto Donations</Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center', mb: 3 }}>Send cryptocurrency to the following addresses:</Typography>
                    <Stack spacing={2}>
                      {[
                        { label: 'Bitcoin (BTC):', value: 'bc1qxrqat06ul4y7f974ywy7m467rfzh6as87x0wlh' },
                        { label: 'Ethereum (ETH):', value: '0x742922b5a8b13326181f26e8d8f900b47597b0a0' },
                        { label: 'USDT (TRC20):', value: 'TSw3kk2GCyUUsGnvR2ZHSNoEaWkhfkGE1J' },
                      ].map((item) => (
                        <Box key={item.label} sx={{ p: 2, borderRadius: 2, bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider' }}>
                          <Typography variant="caption" sx={{ fontWeight: 600, display: 'block', mb: 0.5 }}>{item.label}</Typography>
                          <Typography variant="caption" sx={{ fontFamily: 'monospace', color: 'primary.main', wordBreak: 'break-all' }}>{item.value}</Typography>
                        </Box>
                      ))}
                    </Stack>
                  </Box>
                </motion.div>
              )}
            </motion.div>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default Give;
