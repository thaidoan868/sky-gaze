// src/App.js
import "./App.css";
import NavBar from "./components/common/NavBar/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/pages/hung/home/Home/Home";
import Planets from "./components/pages/hung/planets/Planets/Planets";
import AstronomyTopics from "./components/pages/hung/astronomy_topics/AstronomyTopics/AstronomyTopics";
import TopicDetail from "./components/pages/hung/astronomy_topics/TopicDetail/TopicDetail";
import StarGazing from "./components/pages/loi/star_gazing/StarGazing/StarGazing";
import Observatories from "./components/pages/loi/observatories/Observatories/Observatories";
import News from "./components/pages/thai/news/News/News";
import AboutUs from "./components/pages/thai/about_us/AboutUs/AboutUs";
import { Footer } from "./components/common/Footer/Footer";
import { NotFound } from "./components/pages/thai/not_found/NotFound/NotFound";
import ScrollToTop from "./components/common/ScrollToTop/ScrollToToop";
import "bootstrap-icons/font/bootstrap-icons.css";
import Constellations from "./components/pages/loi/constellations/Constellations/Constellations";
import Comets from "./components/pages/loi/comets/Comets/Comets";
import { useEffect } from "react";
import { ScrollToTopButton } from "./components/common/ScrollToTopButton/ScrollToTopButton";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/planets" element={<Planets />} />
          <Route path="/astronomy_topics" element={<AstronomyTopics />} />
          <Route path="/astronomy-topics/:topicId" element={<TopicDetail />} />
          <Route path="/star_gazing" element={<StarGazing />} />
          <Route path="/constellations" element={<Constellations />} />
          <Route path="/comets" element={<Comets />} />
          <Route path="/observatories" element={<Observatories />} />
          <Route path="/news" element={<News />} />
          <Route path="/about_us" element={<AboutUs />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ScrollToTopButton />
        <Footer />
      </Router>
    </div>
  );
}
export default App;