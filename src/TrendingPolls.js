import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import './Trendingpoll.css';
import { useNavigate } from 'react-router-dom';

const TrendingPolls = () => {
  const navigate = useNavigate();
  const [trendingpolls, setTrendingpolls] = useState([]);
  
  useEffect(() => {
    const trend = async () => {
      try {
        const response = await axios.get('http://localhost:5000/polls/top3');
        const final = response.data;
        if (final) {
          setTrendingpolls(final);
        }
      } catch (error) {
        console.error('Error fetching polls:', error);
      }
    };
    trend();
  }, []);

  const handleCardClick = (poll) => {
    navigate('/HomePage',{state: {poll}})
    console.log("dwecvfcb b")
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Container
      fluid
      className="trendingpolls"
      style={{ height: '100vh', position: 'fixed', width: 'auto', top: '0', paddingTop: '80px', background: 'lightblue' }}
    >
      <div className="LaptopTrending">
        <Card>
          <h1>TRENDING POLLSS</h1>
        </Card>
        <br />
        {trendingpolls?.map((polls, index) => (
          <Card
            className="boxtre"
            key={index}
            onClick={() => handleCardClick(polls)} 
          >
            <b style={{color:'black'}}>{polls.question}</b>
            <i style={{color:'green'}} className="bi bi-person">{polls.totalVotes} Voters</i>
            <i style={{color:'red'}} className="bi bi-heart">{polls.totalLikes} Likes</i>
          </Card>
        ))}
      </div>
      <div className="MobileTrending">
        <Offcanvas show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title></Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <h1>TRENDING POLLS</h1>
            <br />
            {trendingpolls?.map((polls, index) => (
              <Card
                className="cardtrendingpolls"
                key={index}
                onClick={() => handleCardClick(polls)}
              >
                <b>{polls.question}</b>
                <i className="bi bi-person">{polls.totalVotes} Voters</i>
                <i className="bi bi-heart">{polls.totalLikes} Likes</i>
              </Card>
            ))}
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </Container>
  );
};

export default TrendingPolls;
