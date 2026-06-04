import { useState } from 'react'
import heroImg from './assets/hero.png'
import './App.css'
import Header from './components/Header'
import Data from './pages/Data'

function App() {
  const [page, setPage] = useState('Home')

  return (
    <div className="app">
      <Header activePage={page} onNavigate={setPage} />

      {page === 'Data' ? (
        <Data />
      ) : (
        <>
          <main className="hero">
            <div className="hero-content">
              <h2>Banking made really simple</h2>
              <p>Secure accounts, instant transfers, and smart savings tools.</p>
              <div className="cta">
                <button className="primary">Get Started</button>
                <button className="secondary">Learn More</button>
              </div>
            </div>
            <div className="hero-image">
              <img src={heroImg} alt="Customers using banking app" />
            </div>
          </main>

          <section className="features">
            <div className="feature-card">
              <h3>Easy Transfers</h3>
              <p>Move money instantly with low fees and great security.</p>
            </div>
            <div className="feature-card">
              <h3>Smart Savings</h3>
              <p>Automated rules and insights to grow your balance.</p>
            </div>
            <div className="feature-card">
              <h3>24/7 Support</h3>
              <p>Chat and phone support whenever you need help.</p>
            </div>
          </section>

          <footer className="footer">
            <p>© {new Date().getFullYear()} Acme Bank. All rights reserved.</p>
          </footer>
        </>
      )}
    </div>
  )
}

export default App
