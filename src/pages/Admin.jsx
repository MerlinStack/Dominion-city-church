import React, { useState } from 'react';
import { Box, Container, Typography, Button, Stack, TextField, Tabs, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Check, LogOut } from 'lucide-react';
import { useAdminStore } from '../stores/useAdminStore';

const TabPanel = ({ children, value, index }) => (
  <div role="tabpanel" hidden={value !== index}>
    {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
  </div>
);

const Admin = () => {
  const { isAuthenticated, login, logout, events, addEvent, updateEvent, deleteEvent, testimonies, approveTestimony, deleteTestimony, prayerRequests, deletePrayerRequest } = useAdminStore();
  const [tab, setTab] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [loginCreds, setLoginCreds] = useState({ username: '', password: '' });
  const [formData, setFormData] = useState({ title: '', date: '', time: '', location: '', description: '', category: '' });

  const handleLogin = (e) => {
    e.preventDefault();
    login(loginCreds.username, loginCreds.password);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (editingItem) {
      updateEvent(editingItem.id, formData);
    } else {
      addEvent(formData);
    }
    setShowForm(false);
    setEditingItem(null);
    setFormData({ title: '', date: '', time: '', location: '', description: '', category: '' });
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title || '',
      date: item.date || '',
      time: item.time || '',
      location: item.location || '',
      description: item.description || '',
      category: item.category || '',
    });
    setShowForm(true);
  };

  if (!isAuthenticated) {
    return (
      <Box sx={{ pt: '80px', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: (theme) =>
        theme.palette.mode === 'dark' ? 'linear-gradient(135deg, #000000, #1E3A8A)' : 'linear-gradient(135deg, #F8FAFC, #E8F0FE)',
      }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <Box component="form" onSubmit={handleLogin} sx={{ p: 5, borderRadius: 4, bgcolor: 'background.paper', maxWidth: 400, mx: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
            <Typography variant="h4" sx={{ textAlign: 'center', mb: 3, fontFamily: "'Cormorant Garamond', serif" }}>Admin Login</Typography>
            <Stack spacing={2}>
              <TextField fullWidth label="Username" value={loginCreds.username}
                onChange={(e) => setLoginCreds({ ...loginCreds, username: e.target.value })} required />
              <TextField fullWidth label="Password" type="password" value={loginCreds.password}
                onChange={(e) => setLoginCreds({ ...loginCreds, password: e.target.value })} required />
              <Button type="submit" variant="contained" size="large" fullWidth>Login</Button>
            </Stack>
          </Box>
        </motion.div>
      </Box>
    );
  }

  return (
    <Box sx={{ pt: '80px', minHeight: '100vh' }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
          <Typography variant="h3" sx={{ fontFamily: "'Cormorant Garamond', serif" }}>Admin Dashboard</Typography>
          <Button variant="outlined" startIcon={<LogOut size={16} />} onClick={logout}>Logout</Button>
        </Stack>

        <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 2, '& .MuiTab-root': { fontWeight: 600 } }}>
          <Tab label="Events" />
          <Tab label="Testimonies" />
          <Tab label="Prayer Requests" />
        </Tabs>

        <TabPanel value={tab} index={0}>
          <Button variant="contained" startIcon={<Plus size={16} />} onClick={() => { setShowForm(true); setEditingItem(null); }} sx={{ mb: 2 }}>
            Add Event
          </Button>
          <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600, color: 'primary.main' }}>Title</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: 'primary.main' }}>Date</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: 'primary.main' }}>Location</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: 'primary.main' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {events.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell>{event.title}</TableCell>
                    <TableCell>{event.date}</TableCell>
                    <TableCell>{event.location}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEdit(event)}><Edit size={16} /></IconButton>
                      <IconButton onClick={() => deleteEvent(event.id)}><Trash2 size={16} /></IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        <TabPanel value={tab} index={1}>
          <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600, color: 'primary.main' }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: 'primary.main' }}>Title</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: 'primary.main' }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: 'primary.main' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {testimonies.map((t) => (
                  <TableRow key={t.id}>
                    <TableCell>{t.name}</TableCell>
                    <TableCell>{t.title}</TableCell>
                    <TableCell>{t.approved ? 'Approved' : 'Pending'}</TableCell>
                    <TableCell>
                      {!t.approved && <IconButton onClick={() => approveTestimony(t.id)}><Check size={16} /></IconButton>}
                      <IconButton onClick={() => deleteTestimony(t.id)}><Trash2 size={16} /></IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        <TabPanel value={tab} index={2}>
          <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600, color: 'primary.main' }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: 'primary.main' }}>Prayer Request</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: 'primary.main' }}>Private</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: 'primary.main' }}>Date</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: 'primary.main' }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {prayerRequests.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell>{p.name}</TableCell>
                    <TableCell>{p.prayer.substring(0, 50)}...</TableCell>
                    <TableCell>{p.isPrivate ? 'Yes' : 'No'}</TableCell>
                    <TableCell>{new Date(p.date).toLocaleDateString()}</TableCell>
                    <TableCell><IconButton onClick={() => deletePrayerRequest(p.id)}><Trash2 size={16} /></IconButton></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        <Dialog open={showForm} onClose={() => setShowForm(false)} maxWidth="sm" fullWidth
          PaperProps={{ sx: { borderRadius: 4, p: 1 } }}>
          <DialogTitle sx={{ fontFamily: "'Cormorant Garamond', serif" }}>
            {editingItem ? 'Edit Event' : 'Add New Event'}
          </DialogTitle>
          <Box component="form" onSubmit={handleFormSubmit}>
            <DialogContent>
              <Stack spacing={2}>
                <TextField fullWidth label="Event Title" value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
                <TextField fullWidth label="Date" type="date" value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })} InputLabelProps={{ shrink: true }} required />
                <TextField fullWidth label="Time" type="time" value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })} InputLabelProps={{ shrink: true }} required />
                <TextField fullWidth label="Location" value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })} required />
                <TextField fullWidth label="Description" multiline rows={3} value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })} required />
                <TextField fullWidth label="Category" value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })} />
              </Stack>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 3 }}>
              <Button onClick={() => setShowForm(false)}>Cancel</Button>
              <Button type="submit" variant="contained">{editingItem ? 'Update' : 'Add'} Event</Button>
            </DialogActions>
          </Box>
        </Dialog>
      </Container>
    </Box>
  );
};

export default Admin;
