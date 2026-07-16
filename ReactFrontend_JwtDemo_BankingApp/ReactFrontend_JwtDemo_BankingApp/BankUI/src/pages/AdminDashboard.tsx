import type { FC } from 'react';
import { useEffect, useState } from 'react';
import DataService from '../services/DataService';

const AdminDashboard: FC = () => {
  const [info, setInfo] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAdmin = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await DataService.getAdminInfo();
        setInfo(res);
      } catch (e: any) {
        setError(e?.message || 'Failed to fetch admin info');
      } finally {
        setLoading(false);
      }
    };

    fetchAdmin();
  }, []);

  return (
    <div style={{ maxWidth: 900, margin: '2rem auto', padding: '2rem' }}>
      <h1>Admin Dashboard</h1>
      {loading && <p>Loading admin info...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {info && (
        <div>
          <p><strong>Username:</strong> {info.username}</p>
          <p><strong>Role:</strong> {info.role || info.roles}</p>
          <p>{info.message}</p>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
