import type { FC } from 'react';
import { Link } from 'react-router-dom';

const Home: FC = () => {
  return (
    <main className="page-container" style={{ maxWidth: 960, margin: '2rem auto', padding: '0 1rem' }}>
      <section style={{ display: 'grid', gap: '2rem', alignItems: 'center', gridTemplateColumns: '1.2fr 0.8fr' }}>
        <div>
          <p style={{ color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '1rem' }}>
            Modern banking for every customer
          </p>
          <h1 style={{ color: 'var(--text)', fontSize: '3rem', lineHeight: 1.05, marginBottom: '1rem' }}>
            Better checking, smarter saving, and fast account access.
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '2rem' }}>
            BankUI brings everything you need for secure online banking into one easy-to-use interface. Sign in to manage your accounts, transfer funds, and monitor spending with confidence.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/login" className="primary-button" style={{ padding: '0.9rem 1.5rem' }}>
              Sign in
            </Link>
          </div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.95)', borderRadius: 24, padding: '2rem', boxShadow: '0 24px 60px rgba(0,0,0,0.08)' }}>
          <h2 style={{ marginBottom: '1rem', color: 'var(--text)' }}>Banking built around you</h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-muted)', lineHeight: 1.8 }}>
            <li style={{ marginBottom: '0.75rem' }}>• Real-time account overview for checking, savings, and credit</li>
            <li style={{ marginBottom: '0.75rem' }}>• Secure login and responsive account dashboards</li>
            <li style={{ marginBottom: '0.75rem' }}>• Quick access to recent activity and customer data</li>
            <li style={{ marginBottom: '0.75rem' }}>• Admin tools for secure system management</li>
          </ul>
        </div>
      </section>
    </main>
  );
};

export default Home;
