import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Log_in from './Home';
import Page2 from './Page2';
import Service from './Service';  // Importa el nuevo componente

function App() {
  return (
    <Router>
      <div style={styles.container}>
        <nav style={styles.navbar}>
          <Link to="/" style={styles.link}>Log In</Link>
          <Link to="/page2" style={styles.link}>Sign In</Link>
          <Link to="/service" style={styles.link}>Service</Link>  {/* Añade el nuevo enlace */}
        </nav>
        <Routes>
          <Route path="/" element={<Log_in />} />
          <Route path="/page2" element={<Page2 />} />
          <Route path="/service" element={<Service />} />  {/* Añade la nueva ruta */}
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
