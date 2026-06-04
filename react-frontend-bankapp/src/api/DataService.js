// Simple HTTP service for talking to a Spring Boot backend.
// Configure the backend base URL with Vite env var `VITE_API_BASE`.

// Default to local Spring Boot backend when VITE_API_BASE is not provided.


let BASE_URL = "";
let isBackendLocal = false;
let isBackendRemote = true;

if(isBackendLocal){
    BASE_URL = (import.meta.env && import.meta.env.VITE_API_BASE) || 'http://localhost:8080';
}
if(isBackendRemote){
    BASE_URL = (import.meta.env && import.meta.env.VITE_API_BASE) || 'http://springbootrestapibackend-with-db.onrender.com:8080';
}


async function request(path, opts = {}) {
  const url = `${BASE_URL}${path}`
  const res = await fetch(url, opts)
  if (!res.ok) {
    const body = await res.text().catch(() => '')
    const err = new Error(`HTTP ${res.status} ${res.statusText}: ${body}`)
    err.status = res.status
    throw err
  }
  // try to parse json, fallback to text
  const ct = res.headers.get('content-type') || ''
  if (ct.includes('application/json')) return res.json()
  return res.text()
}

const DataService = {
  // GET /api/customers
  getCustomers() {
    return request('/api/customers')
  },

  // POST /api/customers (example)
  createData(payload) {
    return request('/api/customers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
  },
}

export default DataService
