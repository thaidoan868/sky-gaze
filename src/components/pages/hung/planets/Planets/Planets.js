import React, { useState, useEffect } from "react";
import { planets } from "../../data/planetsData.js";
import solarSystemBg from "./images/solar-system-bg.jpg";
import styles from "./Planets.module.css";

const Planets = () => {
  const [selectedPlanet, setSelectedPlanet] = useState(planets[0] || {});
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (selectedPlanet.images && selectedPlanet.images.length > 0) {
      setCurrentImageIndex(0);
    }
  }, [selectedPlanet]);

  const handlePlanetSelection = (planet) => setSelectedPlanet(planet);
  const nextImage = () =>
    setCurrentImageIndex((prev) => (prev + 1) % selectedPlanet.images.length);
  const prevImage = () =>
    setCurrentImageIndex(
      (prev) =>
        (prev - 1 + selectedPlanet.images.length) % selectedPlanet.images.length
    );

  if (!Array.isArray(planets) || planets.length === 0) {
    return <div>Error: No planet data available</div>;
  }

  return (
    <section
      id="solar-system"
      className={styles.planetsContentSection}
      style={{ backgroundImage: `url(${solarSystemBg})` }}>
      <div className={styles.sectionHeader}>
        <h2 className="display-3 font-orbitron text-white">
          Solar System Explorer
        </h2>
        <p className="lead text-white-50 mb-5">
          Select a planet below to learn more about its unique characteristics.
        </p>
      </div>
      <div className={styles.planetsListContainer}>
        {planets.map((planet) => (
          <button
            key={planet.id}
            onClick={() => handlePlanetSelection(planet)}
            className={`${styles.planetCard} ${selectedPlanet.id === planet.id ? styles.active : ""}`}
          >
            <img
              src={process.env.PUBLIC_URL + planet.images[0]}
              alt={planet.name}
              className="rounded-circle mb-2 object-cover"
              onError={(e) => { e.target.src = '/fallback-planet-icon.jpg'; }}
              loading="lazy"
            />
            <span>{planet.name}</span>
          </button>
        ))}
      </div>
      <div className={styles.detailsContainer}>
        <div className={styles.detailsRow}>
          <div className={styles.detailsCol}>
            <div className={styles.infoWrapper}>
              <div className={styles.imageGalleryContainer}>
                <button
                  onClick={prevImage}
                  className={styles.navButtonLeft}
                  aria-label="Previous image"
                >
                  ‹
                </button>
                <img
                  src={
                    process.env.PUBLIC_URL +
                    selectedPlanet.images[currentImageIndex]
                  }
                  alt={`View of ${selectedPlanet.name}`}
                  className={styles.planetImage}
                  onError={(e) => (e.target.src = "/fallback-image.jpg")}
                  loading="lazy"
                />
                <button
                  onClick={nextImage}
                  className={styles.navButtonRight}
                  aria-label="Next image"
                >
                  ›
                </button>
              </div>
              <div className={`${styles.articleCard}`}>
                <div className={styles.cardBody}>
                  <h3 className="card-title font-orbitron">
                    {selectedPlanet.name}
                  </h3>
                  <ul className="list-unstyled mb-3">
                    <li>
                      <strong>Discovery:</strong> {selectedPlanet.discovery}
                    </li>
                    <li>
                      <strong>Atmosphere:</strong> {selectedPlanet.atmosphere}
                    </li>
                  </ul>
                  <div className={styles.descriptionContainer}>
                    <p className={styles.descriptionText}>
                      {selectedPlanet.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.detailsCol}>
            <div className={styles.videoContainer}>
              {selectedPlanet.youtubeId ? (
                <iframe
                  src={`https://www.youtube.com/embed/${selectedPlanet.youtubeId}`}
                  title={`${selectedPlanet.name} Video`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <div>No video available for this planet</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Planets;
