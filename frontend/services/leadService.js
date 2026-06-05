import api from '../lib/axios';

export const createLead = async (data) => {
  const response = await api.post('/leads', data);
  return response.data;
};
