// src/api/omdbApi.ts
import axios from 'axios';

// Set up the base URL and API key from environment variables
const apiKey = import.meta.env.VITE_OMDB_API_KEY;

const baseURL = import.meta.env.VITE_BASE_URL;

const omdbApi = axios.create({
  baseURL,
  params: {
    apikey: apiKey,
  },
});

export { omdbApi };
