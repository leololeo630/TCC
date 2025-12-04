import axios from "axios";

const api = axios.create({ 
    baseURL: 'http://localhost:8000/api/',
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken');
    //console.log('Token no interceptor: ', token);
    //const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzY0NzExODM3LCJpYXQiOjE3NjQ3MDQ2MzcsImp0aSI6ImQ3MTg0NWE2YjkxOTRmNzg5NDYxYWFiM2IxMmVhMGZlIiwidXNlcl9pZCI6MywidXNlcm5hbWUiOiJsZW9sb2xlbyIsInJvbGUiOiJ1c2VyIn0.xmNYllYgdRf7rN8II8jcC4n7WQFtltHu1F0GVgbBSQA"
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;