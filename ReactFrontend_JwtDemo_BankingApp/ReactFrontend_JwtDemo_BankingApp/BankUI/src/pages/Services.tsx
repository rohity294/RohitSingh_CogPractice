import type { FC } from 'react';

const Services: FC = () => (
  <div className="page-container">
    <h1>Services</h1>
    <div className="services-list">
      <div className="service-card">
        <h2>Transfer Money</h2>
        <p>Send funds to another account or pay a bill instantly.</p>
      </div>
      <div className="service-card">
        <h2>Pay a Bill</h2>
        <p>Schedule or pay your utilities, rent, and more.</p>
      </div>
      <div className="service-card">
        <h2>Download Statement</h2>
        <p>Download your monthly account statement as PDF.</p>
      </div>
      <div className="service-card">
        <h2>Account Management</h2>
        <p>Manage multiple accounts with ease and security.</p>
      </div>
    </div>
  </div>
);

export default Services;
