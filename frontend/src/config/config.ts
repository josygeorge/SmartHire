// src/config/config.ts

export const BASE_URL =
  window.location.protocol === 'file:' // Electron or local static build
    ? 'http://localhost:5050'
    : import.meta.env.VITE_API_BASE_URL!;
