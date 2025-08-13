import React, { useState, useEffect } from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import ScrollToTop, {
  ScrollToTopButton,
} from "../ScrollToTopButton/ScrollToTopButton";

const Navbar = () => {
  const [visitorCount, setVisitorCount] = useState();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation().pathname;
  const navLinks = [
    { href: "/astronomy_topics", label: "Void Theories " },
    { href: "/constellations", label: "Constellations" },
    { href: "/comets", label: "Comets" },
    { href: "/star_gazing", label: "Star Gazing" },
    { href: "/observatories", label: "Observatories" },
    { href: "/news", label: "News" },
    { href: "/about_us", label: "Contact" },
  ];

  useEffect(() => {
    const count = localStorage.getItem("visitorCount");
    const updatedCount = count ? parseInt(count) + 1 : 1;
    localStorage.setItem("visitorCount", updatedCount);
    setVisitorCount(updatedCount);
  }, []);

  const toggleMobileMenu = () => setMobileOpen(!mobileOpen);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-effect">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Link
            to="/"
            className="text-2xl text-white d-flex gap-2 align-items-center"
            style={{ textDecoration: "none" }}
          >
            <img src="/galaxy.png" style={{ width: "50px" }} />
            <a>Sky Gaze</a>
          </Link>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => {
            const selectedLink =
              location === link.href ? "nav-selected-link" : "";
            return (
              <Link
                key={link.href}
                to={link.href}
                className={"nav-link " + selectedLink}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
        <div className="flex items-center space-x-4">
          <div className="visitcount text-sm text-gray-400 font-orbitron">
            Visited: {visitorCount}
          </div>
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </nav>
      {mobileOpen && (
        <div className="md:hidden bg-gray-800">
          {navLinks.map((link) => {
            const selectedLink =
              location === link.href ? "nav-selected-link" : "";
            return (
              <Link
                key={link.href}
                to={link.href}
                className={
                  "block py-2 px-4 text-sm hover:bg-gray-700 nav-link " +
                  selectedLink
                }
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
};

export default Navbar;
