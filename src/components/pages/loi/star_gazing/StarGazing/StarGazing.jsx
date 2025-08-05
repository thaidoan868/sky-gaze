import React, { useState, useEffect, useRef } from 'react';
import { Modal, Card, Row, Col, Button } from 'react-bootstrap';
import starGazingData from '../../data/starGazing.json';
import './StarGazing.css';
import pageBackground from '../background/stargazing-bg.jpg';
import WhatToExpect from '../other/WhatToExpect';
import MapView from '../../common/MapView';

const StarGazing = () => {
  const primaryColor = '#67e8f9';
  const orbitronFont = 'Orbitron, sans-serif';
  const pageRef = useRef(null);

  const [showTipsModal, setShowTipsModal] = useState(false);
  const handleShowTipsModal = () => setShowTipsModal(true);
  const handleCloseTipsModal = () => setShowTipsModal(false);

  useEffect(() => {
    if (!pageRef.current) return;
    const element = pageRef.current;
    const imageUrl = pageBackground;
    element.style.backgroundImage = `url(${imageUrl})`;
    element.style.backgroundSize = 'cover';
    element.style.backgroundAttachment = 'fixed';
    element.style.backgroundPosition = 'center';
  }, []);

  return (
    <div ref={pageRef} className="star-gazing-container page-wrapper">
      <div className="container py-5">
        <h1 className="text-center mb-5" style={{ fontFamily: orbitronFont, color: primaryColor }}>
          Stargazing Guide
        </h1>

        <div className="title-container my-5">
          <h2 className="section-title" style={{ fontFamily: orbitronFont, color: primaryColor }}>
            <span className="title-highlight">When</span> is Best to Stargaze
          </h2>
        </div>
        <section className="mb-5">
          <Row>
            {starGazingData.whenBest?.sections?.map((section) => (
              <Col md={6} key={section.heading} className="mb-4">
                <Card className="h-100 bg-dark text-white border-0 shadow-lg" style={{ borderRadius: '15px' }}>
                  <Card.Body>
                    <h3 className="card-title" style={{ fontFamily: orbitronFont, color: primaryColor }}>
                      {section.heading}
                    </h3>
                    <p className="card-text" style={{ fontSize: '1.1rem' }}>{section.content}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        <div className="title-container my-5">
          <h2 className="section-title" style={{ fontFamily: orbitronFont, color: primaryColor }}>
            <span className="title-highlight">Where</span> is Best to Stargaze
          </h2>
          <Button
            variant="outline-info"
            onClick={handleShowTipsModal}
            className="rounded-circle p-0 tips-icon-btn"
            style={{ width: '40px', height: '40px' }}>
            <i className="bi bi-lightbulb-fill fs-5"></i>
          </Button>
        </div>
        <section className="mb-5">
          <Modal show={showTipsModal} onHide={handleCloseTipsModal} centered size="lg">
          </Modal>
          <Row className="g-4 justify-content-center">
            {starGazingData.whereBest?.locations?.map((location, index) => (
              <Col lg={10} xl={9} key={location.name} className="mb-4">
                <Card className="h-100 bg-dark text-white border-info shadow-lg flex-md-row stargazing-location-card">
                  <Col md={5} className={`p-0 ${index % 2 !== 0 && 'order-md-1'}`}>
                    <Card.Img src={process.env.PUBLIC_URL + location.image} alt={location.name} className="object-fit-cover" />
                  </Col>
                  <Col md={7} className="p-4 d-flex flex-column">
                    <Card.Body>
                      <Card.Title style={{ fontFamily: orbitronFont, color: primaryColor }}>{location.name}</Card.Title>
                      <Card.Text>{location.description}</Card.Text>
                    </Card.Body>
                    {location.latitude && location.longitude && (
                      <div className="mt-auto map-container">
                        <MapView
                          latitude={location.latitude}
                          longitude={location.longitude}
                          name={location.name}
                        />
                      </div>
                    )}
                  </Col>
                </Card>
              </Col>
            ))}
          </Row>
        </section>
        <div className="info-container my-5">
          <div className="title-container">
            <h2 className="section-title" style={{ fontFamily: orbitronFont, color: primaryColor }}>
              <span className="title-highlight">What</span> to Expect When Stargazing
            </h2>
          </div>
          <WhatToExpect data={starGazingData.whatToExpect} />
        </div>

      </div>
    </div>
  );
};

export default StarGazing;