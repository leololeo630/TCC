import axios from "axios";

const api = axios.create({ 
    baseURL: 'http://localhost:8000/api/',
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    //const token = localStorage.getItem('token');
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzY0NjYwNTQ3LCJpYXQiOjE3NjQ2NTMzNDcsImp0aSI6ImY0ZTRkNzdhOWNkNzQ5ODhhOTA5YWFmZmJiNjA0NjFlIiwidXNlcl9pZCI6MywidXNlcm5hbWUiOiJsZW9sb2xlbyIsInJvbGUiOiJ1c2VyIn0.quEVVu4twZfcWywoYuoio5DZCJ1XweImWBEShQAk6T8"
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;