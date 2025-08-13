import React, { useState, useMemo } from 'react';
import './Gallery.css';
import constellationsData from '../../data/constellationsData.json';
import cometsData from '../../data/cometsData.json';
import auroraData from '../../data/auroraData.json'; 

const Gallery = () => {
  const [filter, setFilter] = useState('all');

  const allImages = useMemo(() => {
    const constellationImages = constellationsData.map(item => ({
      id: `constellation-${item.id}`,
      src: item.image,
      caption: item.name,
      alt: `The ${item.name} constellation, known as ${item.meaning}`,
      category: 'constellation'
    }));

    const cometImages = [];
    const seenComets = new Set();
    cometsData.classifications.types.forEach(type => {
      type.examples.forEach(item => {
        if (!seenComets.has(item.name)) {
          cometImages.push({
            id: `comet-${item.name.replace(/\s+/g, '-')}`,
            src: item.image,
            caption: item.name,
            alt: item.info,
            category: 'comet'
          });
          seenComets.add(item.name);
        }
      });
    });
    
    const auroraImages = auroraData.map(item => ({
      ...item,
      category: 'aurora'
    }));

    return [...constellationImages, ...cometImages, ...auroraImages].sort(() => 0.5 - Math.random());
  }, []);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const filteredImages = filter === 'all'
    ? allImages
    : allImages.filter(image => image.category === filter);

  return (
    <div className="gallery-container">
      <h3 className="gallery-title">Celestial Gallery</h3>
      
      <div className="gallery-filters">
        <button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => handleFilterChange('all')}>All ({allImages.length})</button>
        <button className={`filter-btn ${filter === 'constellation' ? 'active' : ''}`} onClick={() => handleFilterChange('constellation')}>Constellations</button>
        <button className={`filter-btn ${filter === 'comet' ? 'active' : ''}`} onClick={() => handleFilterChange('comet')}>Comets</button>
        <button className={`filter-btn ${filter === 'aurora' ? 'active' : ''}`} onClick={() => handleFilterChange('aurora')}>Aurora</button>
      </div>

      <div className="gallery-grid">
        {filteredImages.map((image) => (
          <figure key={image.id} className="gallery-item">
            <img src={process.env.PUBLIC_URL + image.src} alt={image.alt} loading="lazy" />
            <figcaption>{image.caption}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
};

export default Gallery;