import api from '../lib/axios';

export const submitValidation = async (data) => {
  const response = await api.post('/validations', data);
  return response.data;
};

export const getValidation = async (id) => {
  const response = await api.get(`/validations/${id}`);
  return response.data;
};
