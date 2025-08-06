import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { astroTopics } from "../../data/astroTopicsData.js";
import voidTheoryBg from "./images/void-theory-bg.jpg";
import styles from "./AstronomyTopics.module.css";
import { Link } from "react-router-dom";

const AstronomyTopics = () => {
  return (
    <>
      <section
        id="void-theory"
        className={styles.contentSection}
        style={{ backgroundImage: `url(${voidTheoryBg})` }}
      >
        <div className="container-lg text-center">
          <h2 className="display-3 font-orbitron text-white">Void Theories</h2>
          <p className="lead text-white-50 mb-5">
            Explore theories about the structure of the cosmos.
          </p>
          <div className="d-flex flex-column align-items-center gap-4">
            {astroTopics.map((topic) => (
              <Link
                key={topic.id}
                to={`/astronomy-topics/${topic.id}`}
                className={`card glass-effect text-white text-start ${styles.articleCard}`}
                style={{ textDecoration: "none" }}
              >
                <img
                  src={topic.thumbnail}
                  className={styles.articlemage}
                  alt={topic.title}
                  style={{ width: '100%', display: 'block' }}
                />
                <div className="card-body p-4">
                  <h4 className="card-title">{topic.title}</h4>
                  <p className="card-text text-white-50 small">
                    {topic.description || "Click to learn more about this fascinating astronomical topic."}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default AstronomyTopics;