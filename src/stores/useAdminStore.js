import { create } from 'zustand';
import { toast } from 'react-toastify';

const loadFromStorage = (key, fallback) => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
};

export const useAdminStore = create((set, get) => ({
  isAuthenticated: loadFromStorage('admin_logged_in', false) === true,
  events: loadFromStorage('admin_events', []),
  testimonies: loadFromStorage('admin_testimonies', []),
  prayerRequests: loadFromStorage('admin_prayers', []),
  sermons: loadFromStorage('admin_sermons', []),

  login: (username, password) => {
    if (username === 'admin' && password === 'dominion2024') {
      set({ isAuthenticated: true });
      localStorage.setItem('admin_logged_in', 'true');
      toast.success('Welcome to Admin Dashboard');
      return true;
    }
    toast.error('Invalid credentials');
    return false;
  },

  logout: () => {
    set({ isAuthenticated: false });
    localStorage.removeItem('admin_logged_in');
    toast.success('Logged out successfully');
  },

  addEvent: (event) => {
    const newEvent = { ...event, id: Date.now() };
    const updated = [newEvent, ...get().events];
    set({ events: updated });
    localStorage.setItem('admin_events', JSON.stringify(updated));
    toast.success('Event added successfully');
  },

  updateEvent: (id, updatedEvent) => {
    const updated = get().events.map((event) =>
      event.id === id ? { ...event, ...updatedEvent } : event
    );
    set({ events: updated });
    localStorage.setItem('admin_events', JSON.stringify(updated));
    toast.success('Event updated');
  },

  deleteEvent: (id) => {
    const updated = get().events.filter((event) => event.id !== id);
    set({ events: updated });
    localStorage.setItem('admin_events', JSON.stringify(updated));
    toast.success('Event deleted');
  },

  approveTestimony: (id) => {
    const updated = get().testimonies.map((t) =>
      t.id === id ? { ...t, approved: true } : t
    );
    set({ testimonies: updated });
    localStorage.setItem('admin_testimonies', JSON.stringify(updated));
    toast.success('Testimony approved');
  },

  deleteTestimony: (id) => {
    const updated = get().testimonies.filter((t) => t.id !== id);
    set({ testimonies: updated });
    localStorage.setItem('admin_testimonies', JSON.stringify(updated));
    toast.success('Testimony deleted');
  },

  deletePrayerRequest: (id) => {
    const updated = get().prayerRequests.filter((p) => p.id !== id);
    set({ prayerRequests: updated });
    localStorage.setItem('admin_prayers', JSON.stringify(updated));
    toast.success('Prayer request removed');
  },

  addSermon: (sermon) => {
    const newSermon = { ...sermon, id: Date.now(), views: 0, downloads: 0 };
    const updated = [newSermon, ...get().sermons];
    set({ sermons: updated });
    localStorage.setItem('admin_sermons', JSON.stringify(updated));
    toast.success('Sermon added');
  },

  loadFromStorage: () => {
    set({
      isAuthenticated: loadFromStorage('admin_logged_in', false) === true,
      events: loadFromStorage('admin_events', []),
      testimonies: loadFromStorage('admin_testimonies', []),
      prayerRequests: loadFromStorage('admin_prayers', []),
      sermons: loadFromStorage('admin_sermons', []),
    });
  },
}));
