import React, { useState, useEffect, useRef } from 'react';
import { Modal, Card } from 'react-bootstrap';
import cometsData from '../../data/cometsData.json';
import './Comets.css';

const Comets = () => {
  const pageRef = useRef(null);
  const [activeTab, setActiveTab] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedComet, setSelectedComet] = useState(null);

  const handleShowModal = (comet) => {
    setSelectedComet(comet);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedComet(null);
  };

  const handleTabClick = (tabId) => {
    setActiveTab(prevTab => (prevTab === tabId ? null : tabId));
  };

  const renderSection = (section) => (
    <div key={section.id} className={`comet-theory-section section-${section.id}`}>
      <div className="theory-text">
        <h3 className="comet-section-title">{section.title}</h3>
        <p className="comet-section-content">{section.content}</p>
        {section.points && (
          <ul className="comet-section-points">
            {Array.isArray(section.points) ? (
              section.points.map((point, index) => (
                <li key={index} dangerouslySetInnerHTML={{ __html: point }} />
              ))
            ) : null}
          </ul>
        )}
        {section.funFact && (
          <div className="fun-fact-box">
            <h5>{section.funFact.title}</h5>
            <p>{section.funFact.text}</p>
          </div>
        )}
      </div>
      {section.image && (
        <div className="comet-section-image-container">
          <img src={process.env.PUBLIC_URL + section.image} alt={section.title} className="comet-section-image" />
        </div>
      )}
    </div>
  );

  return (
    <>
      <div ref={pageRef} className="comets-page page-wrapper">
        <div className="container py-5 content-inner">
          <h1 className="text-center page-title">{cometsData.theory.title}</h1>

          <div className="comet-theory-container">
          {cometsData.theory.sections.map((section) => (renderSection(section)
  ))}
          </div>

          <div className="comet-classification-container">
            <h2 className="text-center classification-title">{cometsData.classifications.title}</h2>

            <div className="video-container">
              <iframe
                src="https://www.youtube.com/embed/VV30nKCNjAQ"
                title="Comets - A Celestial Story"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>

            <div className="classification-tabs">
              {cometsData.classifications.types.map(type => (
                <button
                  key={type.id}
                  className={`classification-tab ${activeTab === type.id ? 'active' : ''}`}
                  onClick={() => handleTabClick(type.id)}
                >
                  {type.name}
                </button>
              ))}
            </div>

            {activeTab && (
              <div className="classification-content">
                {cometsData.classifications.types.map(type => (
                  activeTab === type.id && (
                    <div key={type.id} className="classification-pane">
                      <p className="classification-description">{type.description}</p>
                      <div className="comet-examples-grid">
                        {type.examples.map(example => (
                          <div key={example.name} className="comet-card" onClick={() => handleShowModal(example)}>
                            <img src={process.env.PUBLIC_URL + example.image} alt={example.name} className="comet-card-image" />
                            <div className="comet-card-body">
                              <h5 className="comet-card-name">{example.name}</h5>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={handleCloseModal} centered size="lg" className="comet-modal">
        {selectedComet && (
          <>
            <Modal.Header closeButton className="modal-header-custom">
              <Modal.Title className="modal-title-custom">{selectedComet.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body-custom">
              <img src={process.env.PUBLIC_URL + selectedComet.image} alt={selectedComet.name} className="modal-image" />
              <p className="modal-info">{selectedComet.info}</p>
            </Modal.Body>
          </>
        )}
      </Modal>
    </>
  );
};

export default Comets;