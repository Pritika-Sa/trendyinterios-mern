// API Configuration
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Remove trailing /api if present and add it back consistently
export const getApiUrl = (endpoint) => {
    const baseUrl = API_BASE_URL.replace('/api', '');
    return `${baseUrl}/api${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
};
