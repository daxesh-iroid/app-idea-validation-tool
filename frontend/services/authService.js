import api from '../lib/axios';

export const login = async (credentials) => {
  const response = await api.post('/admin/login', credentials);
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
  if (typeof document !== 'undefined') {
    document.cookie = 'token=; path=/; max-age=0';
  }
};

export const getProfile = async () => {
  const response = await api.get('/admin/profile');
  return response.data;
};
