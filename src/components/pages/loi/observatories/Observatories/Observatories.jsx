import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'react-bootstrap';
import observatoriesData from '../../data/observatories.json';
import './Observatories.css';
import pageBackground from './background/starfield-bg.jpg';

const Observatories = () => {
  const primaryColor = '#67e8f9';
  const orbitronFont = 'Orbitron, sans-serif';

  const [activeId, setActiveId] = useState(observatoriesData[0]?.id || '');
  const contentRefs = useRef({});

  useEffect(() => {
    const imageUrl = pageBackground;
    
    const originalBackground = document.body.style.backgroundImage;
    const originalBackgroundColor = document.body.style.backgroundColor;

    document.body.style.backgroundImage = `url(${imageUrl})`;
    document.body.style.backgroundAttachment = 'fixed';
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundColor = 'transparent'; 
    
    return () => {
      document.body.style.backgroundImage = originalBackground || 'none';
      document.body.style.backgroundColor = originalBackgroundColor || '';
    };
  }, []);

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

  const mapsApiKey = 'AIzaSyB9YyC32U0aoUibPZzJpN8BVBq8tnPhLb4';

  return (
    <div className="observatories-page-exhibition">
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

              {/* YÊU CẦU 3: BỐ CỤC 3 CỘT MỚI */}
              <div className="card-details-grid">
                {/* Cột 1: Key Features */}
                <div className="detail-column">
                  <h5>Key Features</h5>
                  <ul>
                    {obs.key_features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>

                {/* Cột 2: Bản đồ */}
                <div className="detail-column">
                  <h5>Location</h5>
                  <div className="map-container">
                    <iframe
                      title={`map-${obs.name}`}
                      width="100%"
                      height="100%"
                      loading="lazy"
                      src={`https://www.google.com/maps/embed/v1/place?key=${mapsApiKey}&q=${obs.latitude},${obs.longitude}&zoom=10`}
                    ></iframe>
                  </div>
                </div>

                {/* Cột 3: Thông tin thêm */}
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
  );
};

export default Observatories;
