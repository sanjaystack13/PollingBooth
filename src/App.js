import React from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './LoginPage';
import ForgotPassword from './ForgotPassword';
import VerifyOtpPassword from './VerifyOtpPassword';
import HomePage from './HomePage';
import Signup from './Signup';
import Addpoll from './Addpoll';
import Navbar from './Navbar';
import TrendingPolls from './TrendingPolls';
import Topnavbar from './Topnavbar';
import { Card, Col, Row } from 'react-bootstrap';
import './App.css'; 
import ProfilePage from './ProfilePage';

const Project = () => {
  const location = useLocation();
  const isPage = location.pathname === "/" || location.pathname === "/Signup" || location.pathname === "/ForgotPassword" || location.pathname === "/VerifyOtpPassword";

  return (
    <div style={{ height: '100vh' }}>
      <Row style={{height:'10vh'}}>
        <Col xs={12} style={{ borderRight: '1px solid black'}}>
          {!isPage && <Topnavbar className="topnavbar-fixed" />}
        </Col>
      </Row>
      <Row style={{ height: '90vh' }}>
        {!isPage ? (
          <>
            <Col lg={3} style={{ background: 'lightblue' }}>
              <Navbar />
            </Col>
            <Col style={{ background: "white" }} lg={6}>
              <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/ForgotPassword" element={<ForgotPassword />} />
                <Route path="/VerifyOtpPassword" element={<VerifyOtpPassword />} />
                <Route path="/HomePage" element={<HomePage />} />
                <Route path="/Signup" element={<Signup />} />
                <Route path="/Addpoll" element={<Addpoll />} />
                <Route path="/ProfilePage" element={<ProfilePage />} />
              </Routes>
            </Col>
            <Col style={{ width: 'auto', background: "lightblue" }} lg={3}>
              <TrendingPolls />
            </Col>
          </>
        ) : (
          <Col style={{height:'100%'}}>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/Signup" element={<Signup />} />
              
              <Route path="/ForgotPassword" element={<ForgotPassword />} />
                <Route path="/VerifyOtpPassword" element={<VerifyOtpPassword />} />
            </Routes>
            </Col>
        )}
      </Row>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Project />
    </BrowserRouter>
  );
}

export default App;