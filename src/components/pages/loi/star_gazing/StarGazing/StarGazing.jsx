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
        <h1 className="text-center page-title">
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
            <Modal.Header closeButton className="bg-dark border-bottom-0">
              <Modal.Title style={{ fontFamily: orbitronFont, color: primaryColor }}>Tips & Gear</Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-dark text-white">
              <Row>
                <Col md={6}>
                  <h5 style={{ fontFamily: orbitronFont }}>Essential Tips</h5>
                  {starGazingData.whereBest?.tips?.map((tip) => (
                    <div key={tip.heading} className="tip-item mb-3">
                      {tip.image && (
                        <img src={process.env.PUBLIC_URL + tip.image} alt={tip.heading} className="tip-item-image" />
                      )}
                      <div className="tip-item-content">
                        <h6 className="tip-item-title" style={{ fontFamily: orbitronFont, color: primaryColor }}>{tip.heading}</h6>
                        <p>{tip.content}</p>
                      </div>
                    </div>
                  ))}
                </Col>
                <Col md={6}>
                  <h5 style={{ fontFamily: orbitronFont }}>Recommended Gear</h5>
                  {starGazingData.whereBest?.gear?.map((item) => (
                    <div key={item.name} className="d-flex align-items-start mb-4">
                      <i className={`${item.icon} fs-2 me-3`} style={{ color: primaryColor, minWidth: '30px' }}></i>
                      <div>
                        <h6 className="mb-1" style={{ fontFamily: orbitronFont }}>{item.name}</h6>
                        <p className="mb-0 text-white-50">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </Col>
              </Row>
            </Modal.Body>
          </Modal>
          <Row className="g-4 justify-content-center">
            {starGazingData.whereBest?.locations?.map((location, index) => (
              // THAY THẾ TOÀN BỘ KHỐI <Col> BẰNG ĐOẠN MÃ DƯỚI ĐÂY
              <Col lg={10} xl={9} key={location.name} className="mb-4">
                <Card className="h-100 bg-dark text-white border-info shadow-lg stargazing-location-card">
                  <Row className="g-0">
                    <Col md={5} className={index % 2 !== 0 ? 'order-md-2' : ''}>
                      <div className="location-image-container">
                        <Card.Img src={process.env.PUBLIC_URL + location.image} alt={location.name} className="location-image" />
                      </div>
                    </Col>
                    <Col md={7} className="d-flex flex-column">
                      <Card.Body className="d-flex flex-column p-4">
                        <Card.Title style={{ fontFamily: orbitronFont, color: primaryColor }}>{location.name}</Card.Title>
                        <Card.Text>{location.description}</Card.Text>
                        {location.latitude && location.longitude && (
                          <div className="mt-auto map-container">
                            <MapView
                              latitude={location.latitude}
                              longitude={location.longitude}
                              name={location.name}
                            />
                          </div>
                        )}
                      </Card.Body>
                    </Col>
                  </Row>
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