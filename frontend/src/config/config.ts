export const BASE_URL =
  window.location.protocol === 'file:' // Electron or static build
    ? 'http://localhost:5050' // Your local backend API [for development purposes only]. Change to actual production URL in production.
    : import.meta.env.VITE_API_BASE_URL || 'http://localhost:5050';
