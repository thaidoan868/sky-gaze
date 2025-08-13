import { useState, useEffect } from "react";

export function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);
  const [isNearFooter, setIsNearFooter] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      const viewportHeight = window.innerHeight;
      const footer = document.querySelector("footer");

      if (footer) {
        const footerTop = footer.getBoundingClientRect().top + window.scrollY;
        // Hide button if within 100px above footer
        setIsNearFooter(scrollPos + viewportHeight >= footerTop - 100);
      }

      setVisible(scrollPos > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Inline style with media query fallback
  const buttonStyle = {
    position: "fixed",
    bottom: "100px",
    right: window.innerWidth <= 700 ? "10px" : "100px", // change for mobile
    color: "white",
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    background: "rgba(65, 98, 187, 0)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid blue",
    borderColor: "rgba(79, 109, 194, 0.57)",
    zIndex: 1000,
  };

  return (
    visible &&
    !isNearFooter && (
      <button
        onClick={scrollToTop}
        className="rounded-circle shadow"
        style={buttonStyle}
      >
        <i className="bi bi-arrow-up fs-5"></i>
      </button>
    )
  );
}
