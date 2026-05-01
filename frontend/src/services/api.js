import axios from 'axios';

const API = axios.create({ baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api' });

// Interceptor untuk menyertakan token di setiap request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Admin endpoints
export const adminAPI = {
  getStats: () => API.get('/admin/stats'),
  getUsers: () => API.get('/admin/users'),
  updateUser: (id, data) => API.put(`/admin/users/${id}`, data),
  deleteUser: (id) => API.delete(`/admin/users/${id}`),
  getTalents: () => API.get('/admin/talents'),
  createTalent: (data) => API.post('/admin/talents', data),
  updateTalent: (id, data) => API.put(`/admin/talents/${id}`, data),
  deleteTalent: (id) => API.delete(`/admin/talents/${id}`),
  getQuestions: () => API.get('/admin/questions'),
  createQuestion: (data) => API.post('/admin/questions', data),
  updateQuestion: (id, data) => API.put(`/admin/questions/${id}`, data),
  deleteQuestion: (id) => API.delete(`/admin/questions/${id}`),
  checkMLStatus: () => API.get('/admin/ml-status')
};

export default API;