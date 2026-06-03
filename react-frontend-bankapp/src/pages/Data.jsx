import { useEffect, useState } from 'react'
import DataService from '../api/DataService'
import Customer from '../models/Customer'
import './Data.css'

export default function Data() {
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    DataService.getCustomers()
      .then((res) => {
        if (!mounted) return
        // expect an array of customer objects
        const list = Array.isArray(res) ? res.map((c) => Customer.from(c)) : []
        setCustomers(list)
      })
      .catch((err) => {
        if (!mounted) return
        setError(err.message || 'Failed to load customers')
      })
      .finally(() => {
        if (!mounted) return
        setLoading(false)
      })

    return () => {
      mounted = false
    }
  }, [])

  return (
    <div className="customers">
      {loading && <p>Loading customers...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {!loading && !error && customers.length === 0 && <p>No customers found.</p>}

      {!loading && !error && customers.map((c) => (
        <div key={c.id} className="customer-row">
          <div className="customer-avatar">{(c.name || '?').charAt(0).toUpperCase()}</div>
          <div>
            <p className="customer-name">{c.name}</p>
          </div>
          <div className="customer-id">{c.id}</div>
        </div>
      ))}
    </div>
  )
}
