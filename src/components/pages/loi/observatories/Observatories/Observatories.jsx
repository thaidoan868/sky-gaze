import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'react-bootstrap';
import observatoriesData from '../../data/observatories.json';
import './Observatories.css';
import MapView from '../../common/MapView';

const Observatories = () => {
  const primaryColor = '#67e8f9';
  const orbitronFont = 'Orbitron, sans-serif';
  
  const [activeId, setActiveId] = useState(observatoriesData[0]?.id || '');
  const contentRefs = useRef({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -60% 0px' }
    );

    const refs = Object.values(contentRefs.current);
    refs.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => {
      refs.forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  const handleNavClick = (id) => {
    contentRefs.current[id]?.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
  };

  return (
    <div className="observatories-page-exhibition page-wrapper">
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
      <div className="main-content">
        <div className="observatories-banner">
          <h1 className="text-center page-title">
            Great Observatories of the World
          </h1>
        </div>

        <div className="exhibition-layout">
          <nav className="exhibition-nav">
            <ul>
              {observatoriesData.map(obs => (
                <li key={obs.id}>
                  <a
                    href={`#${obs.id}`}
                    className={activeId === obs.id ? 'active' : ''}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(obs.id);
                    }}
                  >
                    {obs.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <main className="exhibition-content">
            {observatoriesData.map(obs => (
              <section
                key={obs.id}
                id={obs.id}
                ref={el => contentRefs.current[obs.id] = el}
                className="obs-content-card"
              >
                <h2 style={{ fontFamily: orbitronFont, color: primaryColor }}>{obs.name}</h2>
                <p className="text-white-50 mb-3">
                  <i className="bi bi-geo-alt-fill me-2"></i>{obs.location}
                </p>
                <img src={process.env.PUBLIC_URL + obs.image} alt={obs.name} />
                <p>{obs.description}</p>
                <Button variant="outline-info" href={obs.website} target="_blank" className="mb-4">
                  Visit Website <i className="bi bi-box-arrow-up-right ms-2"></i>
                </Button>

                <div className="card-details-grid">
                  <div className="detail-column">
                    <h5>Key Features</h5>
                    <ul>
                      {obs.key_features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="detail-column">
                    <h5>Location</h5>
                    <div className="map-container">
                      <MapView
                        latitude={obs.latitude}
                        longitude={obs.longitude}
                        name={obs.name}
                      />
                    </div>
                  </div>
                  <div className="detail-column">
                    <h5>Additional Info</h5>
                    {Object.entries(obs.additional_info).map(([key, value]) => (
                      <p key={key}>
                        <strong>{key}:</strong> {value}
                      </p>
                    ))}
                  </div>
                </div>
              </section>
            ))}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Observatories;
