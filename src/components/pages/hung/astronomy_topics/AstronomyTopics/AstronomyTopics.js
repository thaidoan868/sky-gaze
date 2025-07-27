import React, { useState, useEffect, useRef } from 'react';
import { astroTopics } from '../../data/astroTopicsData.js'; 
import voidTheoryBg from './images/void-theory-bg.jpg'; 
import styles from './AstronomyTopics.module.css';

const AstronomyTopics = () => {
  const [modalContent, setModalContent] = useState(null);
  const modalRef = useRef(null);
  const bsModal = useRef(null);

  // This effect is now only for cleaning up the modal when the component is removed
  useEffect(() => {
    return () => {
      if (bsModal.current) {
        bsModal.current.dispose();
      }
    };
  }, []);

  const openModal = (topic) => {
    setModalContent(topic);
    // FIX: Initialize the modal just before showing it.
    // This ensures window.bootstrap is available.
    if (modalRef.current) {
      const modal = new window.bootstrap.Modal(modalRef.current);
      bsModal.current = modal;
      modal.show();
    }
  };

  return (
    <>
      <section id="void-theory" className={styles.contentSection} style={{ backgroundImage: `url(${voidTheoryBg})` }}>
        <div className="container text-center">
          <h2 className="display-3 font-orbitron text-white">Void Theory</h2>
          <p className="lead text-white-50 mb-5">
            Explore theories about the structure of the cosmos.
          </p>
          <div className="row g-4">
            {astroTopics.map((topic) => (
              <div key={topic.id} className="col-lg-4 col-md-6">
                 <div onClick={() => openModal(topic)} className={`card glass-effect text-white h-100 ${styles.articleCard}`} style={{cursor: 'pointer'}}>
                    <img src={topic.thumbnail} className="card-img-top" alt={topic.title} style={{height: '200px', objectFit: 'cover'}}/>
                    <div className="card-body">
                        <h4 className="card-title">{topic.title}</h4>
                    </div>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="modal fade" id="topicModal" tabIndex="-1" aria-hidden="true" ref={modalRef}>
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content glass-effect text-white">
            <div className="modal-header border-0">
              <h1 className="modal-title fs-5 font-orbitron">{modalContent?.title}</h1>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <img src={modalContent?.thumbnail} alt={modalContent?.title} className="img-fluid rounded-3 mb-3" />
                <p>{modalContent?.content}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AstronomyTopics;
