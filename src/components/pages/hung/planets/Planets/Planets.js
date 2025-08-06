import React, { useState, useEffect } from 'react';
import { planets } from '../../data/planetsData.js';
import solarSystemBg from './images/solar-system-bg.jpg';
import styles from './Planets.module.css';

const Planets = () => {
  const [selectedPlanet, setSelectedPlanet] = useState(planets[2]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [selectedPlanet]);

  const handlePlanetSelection = (planet) => setSelectedPlanet(planet);
  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % selectedPlanet.images.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + selectedPlanet.images.length) % selectedPlanet.images.length);

  return (
    <section id="solar-system" className={styles.contentSection} style={{ backgroundImage: `url(${solarSystemBg})` }}>
      <div className="container text-center">
        <h2 className="display-3 font-orbitron text-white">Solar System Explorer</h2>
        <p className="lead text-white-50 mb-5">
          Select a planet below to learn more about its unique characteristics.
        </p>
        <div className="d-flex justify-content-center flex-wrap gap-3 mb-5">
          {planets.map((planet) => (
            <button key={planet.id} onClick={() => handlePlanetSelection(planet)} className={`p-3 rounded-3 glass-effect text-white ${styles.planetCard} ${selectedPlanet.id === planet.id ? styles.active : ''}`}>
              <img src={planet.images[0]} alt={planet.name} style={{ width: '60px', height: '60px', position: 'relative', zIndex: 20 }} className="rounded-circle mb-2 object-cover" />
              <span>{planet.name}</span>
            </button>
          ))}
        </div>
        <div className="row g-4 align-items-stretch">

          <div className="col-lg-6">
            <div className="d-flex flex-column h-100">
              <div className={styles['image-gallery-container']}>
                <button onClick={prevImage} className="btn btn-dark position-absolute top-50 start-0 translate-middle-y z-1 ms-3">‹</button>
                <img src={selectedPlanet.images[currentImageIndex]} alt={`View of ${selectedPlanet.name}`} className="img-fluid rounded-2" style={{ maxHeight: '50vh', objectFit: 'cover', width: '100%' }} />
                <button onClick={nextImage} className="btn btn-dark position-absolute top-50 end-0 translate-middle-y z-1 me-3">›</button>
              </div>
              <div className={`card bg-transparent glass-effect text-white h-100 ${styles.articleCard}`}>
                <div className="card-body text-start d-flex flex-column">
                  <h3 className="card-title font-orbitron">{selectedPlanet.name}</h3>
                  <ul className="list-unstyled mb-3">
                    <li><strong>Discovery:</strong> {selectedPlanet.discovery}</li>
                    <li><strong>Atmosphere:</strong> {selectedPlanet.atmosphere}</li>
                  </ul>
                  <div style={{ height: '150px', overflowY: 'auto' }}>
                    <p style={{ fontSize: '1.1rem', lineHeight: 1.6 }}>{selectedPlanet.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className={`${styles.videoContainer} glass-effect`}>
              <iframe
                src={`https://www.youtube.com/embed/${selectedPlanet.youtubeId}`}
                title={`${selectedPlanet.name} Video`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Planets;