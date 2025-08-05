import React, { useState, useEffect, useRef } from 'react';
import { Modal } from 'react-bootstrap';
import cometsData from '../../data/cometsData.json';
import './Comets.css';
import pageBackground from '../background/comets-bg.jpg';

const Comets = () => {
  const pageRef = useRef(null);
  const [activeTab, setActiveTab] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedComet, setSelectedComet] = useState(null);

  useEffect(() => {
    if (!pageRef.current) return;
    const element = pageRef.current;
    const imageUrl = pageBackground;
    element.style.backgroundImage = `url(${imageUrl})`;
  }, []);

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
    <div key={section.id} className="comet-theory-section">
      <h3 className="comet-section-title">{section.title}</h3>
      <div className={section.image ? "theory-content-grid" : "text-only-section"}>
        <div className="theory-text">
          <p className="comet-section-content">{section.content}</p>
          {section.points && (
            <ul className="comet-section-points">
              {section.points.map((point, index) => (
                <li key={index} dangerouslySetInnerHTML={{ __html: point }} />
              ))}
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
    </div>
  );

  return (
    <>
      <div ref={pageRef} className="comets-page page-wrapper">
        <div className="container py-5 content-inner">
          <div className="comet-icon icon-1">☄</div>
          <div className="comet-icon icon-2">☄</div>
          <div className="comet-icon icon-3">☄</div>
          <h1 className="text-center page-title">{cometsData.theory.title}</h1>
          <div className="comet-theory-container">
            {cometsData.theory.sections.map((section, index) => (
              <React.Fragment key={section.id}>
                {renderSection(section)}
                {index < cometsData.theory.sections.length - 1 && <hr className="section-divider" />}
              </React.Fragment>
            ))}
          </div>

          <div className="comet-classification-container">
            <h2 className="text-center classification-title">{cometsData.classifications.title}</h2>
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
                        {type.examples.map((example) => (
                          <div 
                            key={example.name} 
                            className="comet-card-artistic" 
                            onClick={() => handleShowModal(example)}
                            style={{'--bg-image': `url(${process.env.PUBLIC_URL + example.image})`}}
                          >
                            <div className="comet-card-artistic-content">
                              <h3>{example.name}</h3>
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
                <img src={process.env.PUBLIC_URL + selectedComet.image} alt={selectedComet.name} className="modal-image"/>
                <p className="modal-info">{selectedComet.info}</p>
            </Modal.Body>
          </>
        )}
      </Modal>
    </>
  );
};

export default Comets;