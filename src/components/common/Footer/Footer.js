import { Link } from "react-router-dom";

export function Footer() {
  return (
    <div className="">
      <footer
        className="text-center text-lg-start text-white p-1"
        style={{ backgroundColor: "#1c2331" }}
      >
        {/* Section: Links */}
        <section>
          <div className="container text-center text-md-start mt-5">
            <div className="row mt-3">
              {/* About us */}
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold">About Us</h6>
                <hr
                  className="mb-4 mt-0 d-inline-block mx-auto"
                  style={{
                    width: "60px",
                    backgroundColor: "#7c4dff",
                    height: "2px",
                  }}
                />
                <p>
                  We are a team of passionate developers who love to explore the
                  wonders of astronomy. Our mission is to create innovative,
                  user-friendly tools that make the universe more accessible and
                  inspiring for everyone.
                </p>
              </div>

              {/* Astronomy Topics */}
              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold">Astronomy Topics</h6>
                <hr
                  className="mb-4 mt-0 d-inline-block mx-auto"
                  style={{
                    width: "120px",
                    backgroundColor: "#7c4dff",
                    height: "2px",
                  }}
                />
                <p>
                  <Link to="/planets" className="text-white">
                    Planets
                  </Link>
                </p>
                <p>
                  <Link to="/astronomy_topics" className="text-white">
                    Galaxies
                  </Link>
                </p>
                <p>
                  <Link to="/constellations_comets" className="text-white">
                    Commets
                  </Link>
                </p>
                <p>
                  <Link to="/constellations_comets" className="text-white">
                    Constellations
                  </Link>
                </p>
              </div>

              {/* Useful Links */}
              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold">Explore the Universe</h6>
                <hr
                  className="mb-4 mt-0 d-inline-block mx-auto"
                  style={{
                    width: "100px",
                    backgroundColor: "#7c4dff",
                    height: "2px",
                  }}
                />
                <p>
                  <Link to="/observatories" className="text-white">
                    Observatories
                  </Link>
                </p>
                <p>
                  <Link to="/star_gazing" className="text-white">
                    Star Gazing
                  </Link>
                </p>
                <p>
                  <Link to="/news" className="text-white">
                    News
                  </Link>
                </p>
              </div>

              {/* Contact */}
              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold">Contact</h6>
                <hr
                  className="mb-4 mt-0 d-inline-block mx-auto"
                  style={{
                    width: "60px",
                    backgroundColor: "#7c4dff",
                    height: "2px",
                  }}
                />
                <p>
                  <i className="fas fa-home me-3">
                    Email: aptech.fpt@fe.edu.vn
                  </i>
                </p>
                <p>
                  <i className="fas fa-envelope me-3">
                    21Bis Hau Giang, Tan Son Nhat, Ho Chi Minh City, Viet Nam.
                  </i>
                </p>
                <p>
                  <i className="fas fa-phone me-3">Hotline: 0931 313 329</i>
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* Section: Links */}

        {/* Copyright */}
        <div
          className="text-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          <p>© 2025 The Cosmic Discoveries. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
