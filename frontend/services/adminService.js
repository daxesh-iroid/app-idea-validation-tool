import api from '../lib/axios';

// Dashboard
export const getDashboardStats = async () => {
  const response = await api.get('/admin/dashboard');
  return response.data;
};

// Leads
export const getLeads = async ({ page = 1, limit = 15, score, status, readiness } = {}) => {
  const params = new URLSearchParams();
  params.set('page', page);
  params.set('limit', limit);
  if (score) params.set('score', score);
  if (status) params.set('status', status);
  if (readiness) params.set('readiness', readiness);
  const response = await api.get(`/admin/leads?${params.toString()}`);
  return response.data;
};

export const getLead = async (id) => {
  const response = await api.get(`/admin/leads/${id}`);
  return response.data;
};

export const updateLead = async (id, data) => {
  const response = await api.put(`/admin/leads/${id}`, data);
  return response.data;
};

// Score Weights
export const getWeights = async () => {
  const response = await api.get('/admin/settings/weights');
  return response.data;
};

export const updateWeights = async (type, data) => {
  const response = await api.put(`/admin/settings/weights/${type}`, data);
  return response.data;
};

// Email Templates
export const getTemplates = async () => {
  const response = await api.get('/admin/settings/templates');
  return response.data;
};

export const updateTemplate = async (id, data) => {
  const response = await api.put(`/admin/settings/templates/${id}`, data);
  return response.data;
};
