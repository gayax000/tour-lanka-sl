const API_BASE_URL = 
  window.location.hostname === 'localhost'
    ? 'http://localhost:5000'
    : 'https://tour-lanka-sl-production.up.railway.app'; 

export default API_BASE_URL;