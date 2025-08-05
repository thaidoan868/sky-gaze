import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import homeBg from "./images/home-bg.jpg";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";

const Home = () => {
  const [tickerText, setTickerText] = useState("");

  useEffect(() => {
    const getZodiacSign = (day, month) => {
      month = month + 1;
      if ((month === 3 && day >= 21) || (month === 4 && day <= 19))
        return "Aries";
      if ((month === 4 && day >= 20) || (month === 5 && day <= 20))
        return "Taurus";
      if ((month === 5 && day >= 21) || (month === 6 && day <= 20))
        return "Gemini";
      if ((month === 6 && day >= 21) || (month === 7 && day <= 22))
        return "Cancer";
      if ((month === 7 && day >= 23) || (month === 8 && day <= 22))
        return "Leo";
      if ((month === 8 && day >= 23) || (month === 9 && day <= 22))
        return "Virgo";
      if ((month === 9 && day >= 23) || (month === 10 && day <= 22))
        return "Libra";
      if ((month === 10 && day >= 23) || (month === 11 && day <= 21))
        return "Scorpio";
      if ((month === 11 && day >= 22) || (month === 12 && day <= 21))
        return "Sagittarius";
      if ((month === 12 && day >= 22) || (month === 1 && day <= 19))
        return "Capricorn";
      if ((month === 1 && day >= 20) || (month === 2 && day <= 18))
        return "Aquarius";
      if ((month === 2 && day >= 19) || (month === 3 && day <= 20))
        return "Pisces";
    };

    const updateTicker = () => {
      const now = new Date();
      const dateOptions = { year: "numeric", month: "long", day: "numeric" };
      const dateString = now.toLocaleDateString("en-US", dateOptions);
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
          <h1 className="display-4 font-orbitron text-white">
            Explore the Cosmos
          </h1>
          <p className="lead text-white-50">
            An interactive journey through the wonders of our universe.
          </p>
          <Link
            to="/planets"
            className={`btn btn-primary btn-lg mt-4 ${styles.startBtn}`}
          >
            Start Exploring
          </Link>
        </div>
      </section>

      <footer className={`${styles.footer} glass-effect`}>
        <div className="text-white-50 small font-orbitron">{tickerText}</div>
      </footer>
    </>
  );
};

export default Home;
