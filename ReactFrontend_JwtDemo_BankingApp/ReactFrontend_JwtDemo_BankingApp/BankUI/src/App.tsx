import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Services from './pages/Services'
import Results from './pages/Results'
import Login from './pages/Login'
import CustomerDashboard from './pages/CustomerDashboard'
import AdminDashboard from './pages/AdminDashboard'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import Toast from './components/Toast/Toast'

type Account = {
  id: string
  name: string
  balance: string
  available: string
}

type Transaction = {
  id: string
  date: string
  description: string
  category: string
  amount: string
  type: 'credit' | 'debit'
}

const accounts: Account[] = [
  { id: 'checking', name: 'Checking Account', balance: '$12,340.50', available: '$12,140.50' },
  { id: 'savings', name: 'Savings Account', balance: '$28,720.10', available: '$28,720.10' },
  { id: 'credit', name: 'Credit Card', balance: '$3,480.20', available: '$6,520.80' },
]

const transactions: Transaction[] = [
  { id: '1', date: 'Jul 14', description: 'Grocery Market', category: 'Food & Drink', amount: '-$84.50', type: 'debit' },
  { id: '2', date: 'Jul 13', description: 'Salary Deposit', category: 'Income', amount: '+$4,500.00', type: 'credit' },
  { id: '3', date: 'Jul 12', description: 'Electricity Bill', category: 'Utilities', amount: '-$124.70', type: 'debit' },
  { id: '4', date: 'Jul 11', description: 'Coffee Shop', category: 'Food & Drink', amount: '-$12.25', type: 'debit' },
]

function App() {
  const [selectedAccountId, setSelectedAccountId] = useState('checking')
  const selectedAccount = accounts.find((account) => account.id === selectedAccountId) ?? accounts[0]

  return (
    <Router>
      <Header />
      <Toast />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/results" element={<Results />} />
        <Route path="/login" element={<Login />} />
        <Route path="/customer-dashboard" element={<ProtectedRoute><CustomerDashboard /></ProtectedRoute>} />
        <Route path="/admin-dashboard" element={<ProtectedRoute requireAdmin><AdminDashboard /></ProtectedRoute>} />
        <Route path="/dashboard" element={
          <main className="bank-app">
            <header className="bank-header">
              <div className="brand">
                <span className="brand-mark">BankUI</span>
                <div>
                  <h1>My Bank Dashboard</h1>
                  <p>Review balances, transfer funds, and track spending.</p>
                </div>
              </div>
              <div className="profile">
                <span>Hi, Customer</span>
                <button className="profile-button">Sign Out</button>
              </div>
            </header>

            <section className="account-summary">
              <div className="account-panel">
                <p className="section-label">Current account</p>
                <h2>{selectedAccount.name}</h2>
                <div className="account-balance">
                  <div>
                    <span>Balance</span>
                    <strong>{selectedAccount.balance}</strong>
                  </div>
                  <div>
                    <span>Available</span>
                    <strong>{selectedAccount.available}</strong>
                  </div>
                </div>
              </div>

              <div className="account-selector">
                {accounts.map((account) => (
                  <button
                    key={account.id}
                    className={account.id === selectedAccountId ? 'account-button active' : 'account-button'}
                    onClick={() => setSelectedAccountId(account.id)}
                  >
                    <span>{account.name}</span>
                    <strong>{account.balance}</strong>
                  </button>
                ))}
              </div>
            </section>

            <section className="actions-section">
              <div className="action-card">
                <h3>Transfer Money</h3>
                <p>Send funds to another account or pay a bill instantly.</p>
                <button className="primary-button">Start Transfer</button>
              </div>
              <div className="action-card">
                <h3>Pay a Bill</h3>
                <p>Schedule or pay your utilities, rent, and more.</p>
                <button className="primary-button">Pay Now</button>
              </div>
              <div className="action-card">
                <h3>Download Statement</h3>
                <p>Download your monthly account statement as PDF.</p>
                <button className="primary-button">Download</button>
              </div>
            </section>

            <section className="transactions-section">
              <div className="section-header">
                <div>
                  <p className="section-label">Recent activity</p>
                  <h2>Latest transactions</h2>
                </div>
                <button className="secondary-button">View all</button>
              </div>

              <div className="transactions-table">
                <div className="table-row header-row">
                  <span>Date</span>
                  <span>Description</span>
                  <span>Category</span>
                  <span>Amount</span>
                </div>
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="table-row">
                    <span>{transaction.date}</span>
                    <span>{transaction.description}</span>
                    <span>{transaction.category}</span>
                    <span className={transaction.type === 'credit' ? 'credit' : 'debit'}>{transaction.amount}</span>
                  </div>
                ))}
              </div>
            </section>
          </main>
        } />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
