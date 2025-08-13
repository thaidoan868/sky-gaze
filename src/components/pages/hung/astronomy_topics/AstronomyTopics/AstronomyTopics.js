import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { astroTopics } from "../../data/astroTopicsData.js";
import styles from "./AstronomyTopics.module.css";
import { Link } from "react-router-dom";

const AstronomyTopics = () => {
  return (
    <>
      <section
        id="void-theory"
        className={styles.contentSection}
        style={{ backgroundImage: `url(/images/topics/void-theory-bg.jpg)` }}
      >
        <div className="container text-center">
          <h2 className="display-3 font-orbitron text-white">Void Theories</h2>
          <p className="lead text-white-50 mb-5">
            Explore theories about the structure of the cosmos.
          </p>
          <div className="row g-4">
            {astroTopics.map((topic) => (
              <div key={topic.id} className="col-lg-4 col-md-6">
                <Link
                  to={`/astronomy-topics/${topic.id}`}
                  className={`pt-4 card glass-effect text-white h-100 ${styles.articleCard}`}
                  style={{ cursor: "pointer", textDecoration: "none" }}
                >
                  <div className="d-flex justify-content-center">
                    <img
                      src={topic.thumbnail}
                      className="card-img-top"
                      alt={topic.title}
                      style={{
                        height: "200px",
                        objectFit: "cover",
                        width: "100%",
                      }}
                    />
                  </div>
                  <div className="card-body">
                    <h4 className="card-title">{topic.title}</h4>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default AstronomyTopics;
