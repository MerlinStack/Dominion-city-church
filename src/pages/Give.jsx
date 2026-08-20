import React, { useState } from 'react';
import { Box, Container, Typography, Button, Stack, TextField } from '@mui/material';
import { motion, useReducedMotion } from 'framer-motion';
import Seo from '../components/common/Seo';
import { CreditCard, Building2, Smartphone, Lock, Copy, CheckCircle2 } from 'lucide-react';
import { toast } from 'react-toastify';
import PaystackPop from '@paystack/inline-js';

const PAYSTACK_KEY = process.env.REACT_APP_PAYSTACK_PUBLIC_KEY;

const bankDetails = {
  bank: 'First Bank of Nigeria',
  accountName: 'Dominion City Church',
  accountNumber: '2023456789',
  sortCode: '011',
};

const Give = () => {
  const [amount, setAmount] = useState('');
  const [email, setEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [paying, setPaying] = useState(false);
  const [lastReference, setLastReference] = useState('');
  const reduceMotion = useReducedMotion();

  const amountPresets = [5000, 10000, 20000, 50000, 100000];

  const handleCardPayment = (e) => {
    e.preventDefault();
    const value = parseInt(amount, 10);
    if (!value || value <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      toast.error('Please enter your email so your receipt can be sent');
      return;
    }
    if (!PAYSTACK_KEY) {
      toast.error('Online giving is not configured yet — please use bank transfer or USSD');
      return;
    }

    setPaying(true);
    const paystack = new PaystackPop();
    paystack.newTransaction({
      key: PAYSTACK_KEY,
      email,
      amount: value * 100,
      currency: 'NGN',
      metadata: { purpose: 'Giving' },
      onSuccess: (transaction) => {
        setPaying(false);
        setLastReference(transaction.reference);
        toast.success(`Your gift of \u20A6${value.toLocaleString()} was received. Reference: ${transaction.reference}`);
      },
      onCancel: () => {
        setPaying(false);
        toast.info('Payment was cancelled — no charge was made.');
      },
      onError: () => {
        setPaying(false);
        toast.error('Something went wrong with the payment. Please try again.');
      },
    });
  };

  const handleCopyDetails = () => {
    navigator.clipboard.writeText(
      `${bankDetails.accountName}\n${bankDetails.bank}\nAccount: ${bankDetails.accountNumber}\nSort Code: ${bankDetails.sortCode}`
    );
    toast.success('Bank details copied to clipboard!');
  };

  const fade = (delay) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay },
  });

  return (
    <>
      <Seo
        path="/give"
        title="Give | Dominion City"
        description="Support the vision of Dominion City through secure online giving, bank transfer, or USSD."
      />
      <Box sx={{ pt: '80px' }}>
        <Box sx={{ py: { xs: 8, md: 12 }, textAlign: 'center' }}>
          <Container maxWidth="md">
            <motion.div {...fade(0)}>
              <Typography
                variant="overline"
                sx={{ color: 'primary.main', display: 'block', mb: 1 }}
              >
                Partner with us
              </Typography>
              <Typography variant="h1" sx={{ fontSize: { xs: '2.6rem', md: '4rem' }, mb: 2 }}>
                Seeds of Dominion
              </Typography>
              <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 400, maxWidth: 520, mx: 'auto' }}>
                Your giving helps us raise leaders, care for our community, and
                impact generations with the gospel.
              </Typography>
            </motion.div>
          </Container>
        </Box>

        <Box sx={{ py: { xs: 4, md: 8 }, pb: { xs: 10, md: 12 } }}>
          <Container maxWidth="md">
            <motion.div {...fade(0.15)}>
              <Stack direction="row" justifyContent="center" spacing={1} sx={{ mb: 5, flexWrap: 'wrap', gap: 1 }}>
                {[
                  { value: 'card', label: 'Card payment', icon: <CreditCard size={16} /> },
                  { value: 'bank', label: 'Bank transfer', icon: <Building2 size={16} /> },
                  { value: 'ussd', label: 'USSD', icon: <Smartphone size={16} /> },
                ].map((method) => (
                  <Button
                    key={method.value}
                    variant={paymentMethod === method.value ? 'contained' : 'outlined'}
                    startIcon={method.icon}
                    onClick={() => setPaymentMethod(method.value)}
                    sx={{ px: 3 }}
                  >
                    {method.label}
                  </Button>
                ))}
              </Stack>
            </motion.div>

            {paymentMethod === 'card' && (
              <motion.div {...fade(0.25)}>
                <Box component="form" onSubmit={handleCardPayment} sx={{ maxWidth: 500, mx: 'auto' }}>
                  <Typography variant="h5" sx={{ fontFamily: "'Cormorant Garamond', serif", mb: 3, textAlign: 'center' }}>
                    Give securely online
                  </Typography>
                  <Stack direction="row" justifyContent="center" spacing={1} sx={{ mb: 3, flexWrap: 'wrap', gap: 1 }}>
                    {amountPresets.map((preset) => (
                      <Button
                        key={preset}
                        variant={amount === preset.toString() ? 'contained' : 'outlined'}
                        onClick={() => setAmount(preset.toString())}
                        sx={{ px: 2.5 }}
                      >
                        {'\u20A6'}{preset.toLocaleString()}
                      </Button>
                    ))}
                  </Stack>
                  <TextField
                    fullWidth
                    type="number"
                    label="Custom amount (NGN)"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    sx={{ mb: 3 }}
                    inputProps={{ min: 1 }}
                  />
                  <TextField
                    fullWidth
                    type="email"
                    label="Email (for your receipt)"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{ mb: 3 }}
                  />
                  {lastReference && (
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                        p: 2,
                        mb: 3,
                        borderRadius: 2,
                        bgcolor: 'action.selected',
                        color: 'primary.main',
                      }}
                    >
                      <CheckCircle2 size={18} />
                      <Typography variant="body2">
                        Thank you! Your gift was received. Reference: {lastReference}
                      </Typography>
                    </Box>
                  )}
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    startIcon={paying ? null : <Lock size={16} />}
                    fullWidth
                    disabled={paying}
                  >
                    {paying ? 'Opening secure payment…' : `Give ${amount ? '\u20A6' + parseInt(amount).toLocaleString() : 'now'} securely`}
                  </Button>
                  <Typography variant="caption" sx={{ display: 'block', textAlign: 'center', mt: 2, color: 'text.secondary' }}>
                    Payments are processed securely by Paystack. You will receive a
                    confirmation from Paystack on completion.
                  </Typography>
                </Box>
              </motion.div>
            )}

            {paymentMethod === 'bank' && (
              <motion.div {...fade(0.25)}>
                <Box
                  sx={{
                    maxWidth: 500,
                    mx: 'auto',
                    p: 4,
                    borderRadius: 3,
                    border: '1px solid',
                    borderColor: 'divider',
                    bgcolor: 'background.paper',
                  }}
                >
                  <Typography variant="h5" sx={{ fontFamily: "'Cormorant Garamond', serif", mb: 3, textAlign: 'center' }}>
                    Bank transfer details
                  </Typography>
                  <Stack spacing={2}>
                    {[
                      { label: 'Bank', value: bankDetails.bank },
                      { label: 'Account name', value: bankDetails.accountName },
                      { label: 'Account number', value: bankDetails.accountNumber },
                      { label: 'Sort code', value: bankDetails.sortCode },
                    ].map((item) => (
                      <Box key={item.label} sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>{item.label}</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600, textAlign: 'right' }}>{item.value}</Typography>
                      </Box>
                    ))}
                  </Stack>
                  <Button variant="outlined" fullWidth sx={{ mt: 3 }} startIcon={<Copy size={15} />} onClick={handleCopyDetails}>
                    Copy details
                  </Button>
                  <Typography variant="caption" sx={{ display: 'block', textAlign: 'center', mt: 2, color: 'text.secondary' }}>
                    Please email a copy of your transfer receipt to info@dominioncity.org.
                  </Typography>
                </Box>
              </motion.div>
            )}

            {paymentMethod === 'ussd' && (
              <motion.div {...fade(0.25)} style={{ textAlign: 'center' }}>
                <Typography variant="h5" sx={{ fontFamily: "'Cormorant Garamond', serif", mb: 2 }}>
                  Give by USSD
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                  Dial the following code on your phone:
                </Typography>
                <Box
                  sx={{
                    p: 3,
                    bgcolor: 'background.paper',
                    borderRadius: 3,
                    border: '1px solid',
                    borderColor: 'divider',
                    display: 'inline-block',
                    fontFamily: 'monospace',
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: 'primary.main',
                    mb: 2,
                  }}
                >
                  *894*{bankDetails.accountNumber}*{amount || 'AMOUNT'}#
                </Box>
                <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
                  Follow the prompts to complete your payment. You will receive a
                  confirmation SMS from your bank.
                </Typography>
              </motion.div>
            )}
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default Give;