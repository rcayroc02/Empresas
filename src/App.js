import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Log_in from './Home';
import Page2 from './Page2';

function App() {
  return (
    <Router>
      <div style={styles.container}>
        <nav style={styles.navbar}>
          <Link to="/" style={styles.link}>Log In</Link>
          <Link to="/page2" style={styles.link}>Sign In</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Log_in />} />
          <Route path="/page2" element={<Page2 />} />
        </Routes>
      </div>
    </Router>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    padding: '20px'
  },
  navbar: {
    marginBottom: '20px'
  },
  link: {
    marginRight: '10px',
    fontSize: '18px',
    color: '#007bff',
    textDecoration: 'none'
  }
};

export default App;
