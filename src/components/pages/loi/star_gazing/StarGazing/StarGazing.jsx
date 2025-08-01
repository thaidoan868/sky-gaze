import React, { useState, useEffect, useRef } from 'react';
import { Modal, Card, Row, Col, Button } from 'react-bootstrap';
import starGazingData from '../../data/starGazing.json';
import './StarGazing.css';

const WhatToExpect = ({ data }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const scrollerRef = useRef(null);

  const duplicatedItems = data.items ? [...data.items, ...data.items] : [];

  useEffect(() => {
    if (scrollerRef.current) {
      scrollerRef.current.setAttribute('data-animated', true);
    }
  }, []);

  const handleShowModal = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

  return (
    <section className="my-5">
      <h2 className="text-center mb-4" style={{ fontFamily: 'Orbitron, sans-serif', color: '#67e8f9' }}>
        {data.title}
      </h2>
      <div className="scroller" ref={scrollerRef}>
        <div className="scroller__inner">
          {duplicatedItems.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="scroller-card"
              onClick={() => handleShowModal(item)}
            >
              <h3>{item.title}</h3>
            </div>
          ))}
        </div>
      </div>
      {selectedItem && (
        <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
          <Modal.Header closeButton className="bg-dark border-bottom-0">
            <Modal.Title style={{ fontFamily: 'Orbitron, sans-serif', color: '#67e8f9' }}>
              {selectedItem.title}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="bg-dark text-white">
            {selectedItem.image && (
              <img
                src={process.env.PUBLIC_URL + selectedItem.image}
                alt={selectedItem.title}
                className="img-fluid rounded mb-3"
                style={{ maxHeight: '400px', width: '100%', objectFit: 'cover' }}
              />
            )}
            <p style={{ fontSize: '1.1rem' }}>{selectedItem.description}</p>
            
                        {selectedItem.subItems && (
              <div className="mt-4">
                {selectedItem.subItems.map(planet => (
                  <div key={planet.name} className="d-flex align-items-center mb-3">
                    <img 
                      src={process.env.PUBLIC_URL + planet.image} 
                      alt={planet.name}
                      style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover', marginRight: '15px' }}
                    />
                    <div>
                      <strong style={{ color: '#67e8f9', fontFamily: 'Orbitron, sans-serif' }}>{planet.name}</strong>
                      <p className="mb-0">{planet.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Modal.Body>
        </Modal>
      )}
    </section>
  );
};

const StarGazing = () => {
  const primaryColor = '#67e8f9';
  const orbitronFont = 'Orbitron, sans-serif';

  const [showTipsModal, setShowTipsModal] = useState(false);
  const handleShowTipsModal = () => setShowTipsModal(true);
  const handleCloseTipsModal = () => setShowTipsModal(false);

  const mapsApiKey = 'AIzaSyB9YyC32U0aoUibPZzJpN8BVBq8tnPhLb4';

  return (
    <div>
      <div className="sky-gazing-wallpaper">
        <img
          src="https://images.unsplash.com/photo-1538370965046-79c0d6907d47?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXN0cm9ub215JTIwd2FsbHBhcGVyfGVufDB8fDB8fHww"
          alt=""
        />
      </div>
    <div className="star-gazing-container container py-5">
      <h1 className="text-center mb-5" style={{ fontFamily: orbitronFont, color: primaryColor }}>
        Stargazing Guide
      </h1>

      {/* Phần When is Best */}
      <section className="my-5">
        <h2 className="text-center mb-4" style={{ fontFamily: orbitronFont, color: primaryColor }}>
          {starGazingData.whenBest?.title}
        </h2>
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

      {/* Phần Where is Best to Stargaze */}
      <section className="my-5">
        <div className="d-flex justify-content-center align-items-center mb-4">
          <h2 className="text-center me-3" style={{ fontFamily: orbitronFont, color: primaryColor }}>
            {starGazingData.whereBest?.title}
          </h2>
          <Button variant="outline-info" onClick={handleShowTipsModal} className="rounded-circle p-0" style={{ width: '40px', height: '40px' }}>
            <i className="bi bi-lightbulb-fill fs-5"></i>
          </Button>
        </div>
        {/* MODAL HIỂN THỊ*/}
        <Modal show={showTipsModal} onHide={handleCloseTipsModal} centered size="lg">
          <Modal.Header closeButton className="bg-dark border-bottom-0">
            <Modal.Title style={{ fontFamily: orbitronFont, color: primaryColor }}>Tips & Gear</Modal.Title>
          </Modal.Header>
          <Modal.Body className="bg-dark text-white">
            <Row>
              {/* Cột cho Tips */}
              <Col md={6}>
                <h5 style={{fontFamily: orbitronFont}}>Essential Tips</h5>
                {starGazingData.whereBest?.tips?.map((tip) => (
                  <Card key={tip.heading} className="bg-secondary text-white border-0 shadow-sm mb-3">
                    {tip.image && <Card.Img variant="top" src={process.env.PUBLIC_URL + tip.image} alt={tip.heading} style={{ height: '150px', objectFit: 'cover' }} />}
                    <Card.Body>
                      <Card.Title style={{ fontFamily: orbitronFont, color: primaryColor, fontSize: '1.1rem' }}>{tip.heading}</Card.Title>
                      <Card.Text>{tip.content}</Card.Text>
                    </Card.Body>
                  </Card>
                ))}
              </Col>
              {/* Cột cho Gear */}
              <Col md={6}>
                <h5 style={{fontFamily: orbitronFont}}>Recommended Gear</h5>
                {starGazingData.whereBest?.gear?.map((item) => (
                  <div key={item.name} className="d-flex align-items-start mb-4">
                    <i className={`${item.icon} fs-2 me-3`} style={{color: primaryColor, minWidth: '30px'}}></i>
                    <div>
                      <h6 className="mb-1" style={{fontFamily: orbitronFont}}>{item.name}</h6>
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
            <Col lg={10} xl={9} key={location.name} className="mb-4">
              <Card className="h-100 bg-dark text-white border-info shadow-lg flex-md-row stargazing-location-card">
                <Col md={5} className={`p-0 ${index % 2 !== 0 && 'order-md-1'}`}>
                  <Card.Img src={process.env.PUBLIC_URL + location.image} alt={location.name} className="object-fit-cover"/>
                </Col>
                <Col md={7} className="p-4 d-flex flex-column">
                  <Card.Body>
                    <Card.Title style={{ fontFamily: orbitronFont, color: primaryColor }}>{location.name}</Card.Title>
                    <Card.Text>{location.description}</Card.Text>
                  </Card.Body>
                  {location.latitude && location.longitude && mapsApiKey && (
                    <div className="mt-auto map-container">
                      <iframe title={`map-${location.name}`} width="100%" height="100%" loading="lazy" src={`https://www.google.com/maps/embed/v1/place?key=${mapsApiKey}&q=${location.latitude},${location.longitude}&zoom=7`}></iframe>
                    </div>
                  )}
                </Col>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      <WhatToExpect data={starGazingData.whatToExpect} />
    </div>
    </div>
  );
};

export default StarGazing;
