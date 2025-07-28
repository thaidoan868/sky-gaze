import logo from "./logo.svg";
import "./App.css";
import NavBar from "./components/common/NavBar/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/pages/hung/home/Home/Home";
import Planets from "./components/pages/hung/planets/Planets/Planets";
import AstronomyTopics from "./components/pages/hung/astronomy_topics/AstronomyTopics/AstronomyTopics";
import StarGazing from "./components/pages/loi/star_gazing/StarGazing/StarGazing";
import ConstellationsComets from "./components/pages/loi/constellations_comets/ConstellationsComets/ConstellationsComets";
import Observatories from "./components/pages/loi/observatories/Observatories/Observatories";
import News from "./components/pages/thai/news/News/News";
import AboutUs from "./components/pages/thai/about_us/AboutUs/AboutUs";
import { Footer } from "./components/common/Footer/Footer";
import { NotFound } from "./components/pages/thai/not_found/NotFound/NotFound";
import ScrollToTop from "./components/common/ScrollToTop/ScrollToToop";

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
          <Route path="/star_gazing" element={<StarGazing />} />
          <Route
            path="/constellations_comets"
            element={<ConstellationsComets />}
          />
          <Route path="/observatories" element={<Observatories />} />
          <Route path="/news" element={<News />} />
          <Route path="/about_us" element={<AboutUs />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
