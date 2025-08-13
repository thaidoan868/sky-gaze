import React, { useState, useEffect } from 'react';
import allConstellations from '../../data/constellationsData.json';
import constellationContent from '../../data/constellationContent.json';
import extraInfo from '../../data/constellationExtraInfo.json';
import './Constellations.css';
import Gallery from '../other/Gallery';
import { Button, Modal } from 'react-bootstrap';

const Constellations = () => {
  const [hemisphere, setHemisphere] = useState('north');
  const [activeSeason, setActiveSeason] = useState('Spring');
  const [filteredConstellations, setFilteredConstellations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showZodiacOnly, setShowZodiacOnly] = useState(false);
  const [showAstrologyNotice, setShowAstrologyNotice] = useState(false);
  // State for gallery modal
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const handleShowGallery = () => setShowGalleryModal(true);
  const handleCloseGallery = () => setShowGalleryModal(false);

  useEffect(() => {
    const filterData = () => {
      const seasonKey = `best_season_${hemisphere}`;
      let results = allConstellations;
      results = results.filter(c =>
        c[seasonKey] === activeSeason || c[seasonKey] === 'Circumpolar'
      );
      if (showZodiacOnly) {
        results = results.filter(c => c.isZodiac === true);
      }
      if (searchTerm) {
        results = results.filter(c =>
          c.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      setFilteredConstellations(results);
    };

    filterData();
  }, [hemisphere, activeSeason, showZodiacOnly, searchTerm]);

  const seasons = ["Spring", "Summer", "Autumn", "Winter"];

  const handleHemisphereToggle = () => {
    setHemisphere(hemisphere === 'north' ? 'south' : 'north');
  };

  const handleZodiacToggle = () => {
    setShowZodiacOnly(!showZodiacOnly);
    if (!showZodiacOnly && !showAstrologyNotice) {
      setShowAstrologyNotice(true);
    }
  };

  return (
    <div className="constellations-page page-wrapper">
      <div className="container py-5 content-inner">
        <h1 className="text-center page-title">The Constellations</h1>

        <div className="intro-container">
          <h2 className="intro-title">{constellationContent.title}</h2>
          <p className="intro-text mb-4">{constellationContent.introduction}</p>

          {constellationContent.sections.map((section, index) => (
            <div key={section.id} className="intro-section-item">
              <div className={`intro-section-grid ${index % 2 !== 0 ? 'reverse' : ''}`}>
                <div className="intro-section-text">
                  <h3 className="intro-subtitle">{section.title}</h3>
                  <p className="intro-text">{section.content}</p>
                  {section.points && (
                    <ul className="intro-list">
                      {section.points.map((point, pointIndex) => (
                        Array.isArray(point) ? (
                          <ul key={pointIndex}>
                            {point.map((subPoint, subIndex) => (
                              <li key={subIndex} dangerouslySetInnerHTML={{ __html: subPoint }} />
                            ))}
                          </ul>
                        ) : (
                          <li key={pointIndex} dangerouslySetInnerHTML={{ __html: point }} />
                        )
                      ))}
                    </ul>
                  )}
                </div>
                {section.image && (
                  <div className="intro-section-image">
                    <img src={process.env.PUBLIC_URL + section.image} alt={section.title} />
                  </div>
                )}
              </div>
            </div>
          ))}

          <p className="intro-text mt-4 text-center">{constellationContent.conclusion}</p>
        </div>

        <div className="hemisphere-controls-container">
          <div className="hemisphere-toggle-container">
            <span className={`hemisphere-label ${hemisphere === 'north' ? 'active' : ''}`}>
              Northern Hemisphere
            </span>
            <label className="switch">
              <input
                type="checkbox"
                checked={hemisphere === 'south'}
                onChange={handleHemisphereToggle}
              />
              <span className="slider">
                <span className="circle"></span>
              </span>
            </label>
            <span className={`hemisphere-label ${hemisphere === 'south' ? 'active' : ''}`}>
              Southern Hemisphere
            </span>
          </div>
        </div>

        <div className="display-container">
          <div className="filter-controls">
            <div className="search-bar-container">
              <input
                type="text"
                className="search-bar"
                placeholder="Search constellations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="season-tabs">
              {seasons.map(season => (
                <button
                  key={season}
                  className={`season-tab ${activeSeason === season ? 'active' : ''}`}
                  onClick={() => setActiveSeason(season)}
                >
                  {season}
                </button>
              ))}
            </div>
            <div className="zodiac-toggle-container">
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  checked={showZodiacOnly}
                  onChange={handleZodiacToggle}
                />
                <div className="checkmark"></div>
                <span className="checkbox-label">The Zodiacs</span>
              </label>
            </div>
          </div>

          {showAstrologyNotice && (
            <div className="astrology-notice">
              <strong>Notice:</strong> The Zodiac is a concept from astrology, not a scientific classification from astronomy.
            </div>
          )}

          <div className="constellation-grid">
            {filteredConstellations.length > 0 ? (
              filteredConstellations.map(c => (
                <div key={c.id} className="flip-card-square">
                  <div className="flip-card-inner">
                    <div
                      className="flip-card-front"
                      style={{ backgroundImage: `url(${process.env.PUBLIC_URL + c.image})` }}
                    >
                    </div>
                    <div className="flip-card-back">
                      <h5>{c.name}</h5>
                      <h6>({c.meaning})</h6>
                      <p>{c.description}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-results">
                <p>No constellations found for this selection.</p>
              </div>
            )}
          </div>
          <p className="notice-ai">
            <strong>Notice:</strong> These are images created by AI in an artistic style for easy visualization. They are not 100% accurate and should be used for reference only.
          </p>
        </div>
        <div className="extra-info-container">
          <h3 className="extra-info-title">Further Reading & Fun Facts</h3>
          <div className="feature-card-grid">
            {extraInfo.map(info => (
              <div key={info.id} className="feature-card">
                <div className="feature-card-icon">
                  <i className={`bi ${info.icon}`}></i>
                </div>
                <h4 className="feature-card-title">{info.title}</h4>
                <p className="feature-card-content">{info.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Button onClick={handleShowGallery} className="gallery-toggle-btn">
        <i className="bi bi-images me-2"></i> Gallery
      </Button>

      <Modal
        show={showGalleryModal}
        onHide={handleCloseGallery}
        centered
        fullscreen={true}
        className="gallery-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Celestial Gallery</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Gallery />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Constellations;