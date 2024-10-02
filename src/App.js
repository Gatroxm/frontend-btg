import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Transactions from './components/Transactions';
import Funds from './components/Funds';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Header />
      <Container fluid>
        <Row>
          <Col sm={3}>
            <Sidebar />
          </Col>
          <Col sm={9}>
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/funds" element={<Funds />} />
              <Route path="/" element={<Dashboard />} /> {/* Redirige a Dashboard por defecto */}
            </Routes>
          </Col>
        </Row>
      </Container>
    </Router>
  );
}

export default App;
