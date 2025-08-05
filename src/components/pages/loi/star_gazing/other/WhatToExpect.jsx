import React, { useState, useEffect, useRef } from 'react';
import { Modal } from 'react-bootstrap';
import './WhatToExpect.css';

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
    <>
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
        <Modal show={showModal} onHide={handleCloseModal} centered size="lg" className="tips-modal">
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
    </>
  );
};

export default WhatToExpect;