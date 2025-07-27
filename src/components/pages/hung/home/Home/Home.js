import React, { useState, useEffect, useRef } from 'react';
import homeBg from './images/home-bg.jpg';
import styles from './Home.module.css';

const Home = () => {
  const [tickerText, setTickerText] = useState('');
  const videoModalRef = useRef(null);
  const bsVideoModal = useRef(null);

  // This was the older, problematic way of handling the modal
  const openVideoModal = () => {
    if (videoModalRef.current) {
      // This line caused the error because window.bootstrap might not be ready
      const modal = new window.bootstrap.Modal(videoModalRef.current);
      bsVideoModal.current = modal;
      modal.show();
    }
  };

  useEffect(() => {
    const modalElement = videoModalRef.current;
    if (!modalElement) return;

    const youtubePlayer = modalElement.querySelector('#youtube-player');
    
    const handleModalShow = () => {
        if (youtubePlayer) {
            youtubePlayer.src = "https://www.youtube.com/embed/PLcE3AI9wwE?autoplay=1&rel=0&loop=1&playlist=PLcE3AI9wwE";
        }
    };

    const handleModalHide = () => {
        if (youtubePlayer) {
            youtubePlayer.src = "";
        }
    };

    modalElement.addEventListener('shown.bs.modal', handleModalShow);
    modalElement.addEventListener('hidden.bs.modal', handleModalHide);

    return () => {
      modalElement.removeEventListener('shown.bs.modal', handleModalShow);
      modalElement.removeEventListener('hidden.bs.modal', handleModalHide);
    };
  }, []);

  useEffect(() => {
    const getZodiacSign = (day, month) => {
        month = month + 1;
        if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Aries";
        if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Taurus";
        if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Gemini";
        if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Cancer";
        if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leo";
        if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Virgo";
        if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Libra";
        if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "Scorpio";
        if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "Sagittarius";
        if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "Capricorn";
        if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Aquarius";
        if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return "Pisces";
    };

    const updateTicker = () => {
        const now = new Date();
        const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        const dateString = now.toLocaleDateString('en-US', dateOptions);
        const day = now.getDate();
        const month = now.getMonth();
        const zodiacSign = getZodiacSign(day, month);
        setTickerText(`${dateString} | ${zodiacSign}`);
    };

    updateTicker();
    const intervalId = setInterval(updateTicker, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <section 
        id="home" 
        className={styles.contentSection}
        style={{ backgroundImage: `url(${homeBg})` }}
      >
        <div className="glass-effect p-4 p-md-5 rounded-3 text-center">
          <h1 className="display-4 font-orbitron text-white">Explore the Cosmos</h1>
          <p className="lead text-white-50">
            An interactive journey through the wonders of our universe.
          </p>
          <button 
            onClick={openVideoModal} 
            className={`btn btn-primary btn-lg mt-4 ${styles.startBtn}`}
          >
            Start Exploring
          </button>
        </div>
      </section>

      <div className="modal fade" id="videoModal" tabIndex="-1" aria-hidden="true" ref={videoModalRef}>
        <div className="modal-dialog modal-xl modal-dialog-centered">
          <div className="modal-content bg-transparent border-0">
            <div className="modal-header border-0">
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body p-0">
              <div className="ratio ratio-16x9">
                <iframe id="youtube-player" src="" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className={`${styles.footer} glass-effect`}>
        <div className="text-white-50 small font-orbitron">{tickerText}</div>
      </footer>
    </>
  );
};

export default Home;
