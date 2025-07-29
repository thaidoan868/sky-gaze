import { NewsCard } from "../Card/Card";
import "./News.css";

export default function News() {
  const articles = [
    {
      image:
        "https://lehuy240797.github.io/group6/assets/images/LD/image01.webp",
      title: "Webb Telescope Finds Massive Early Galaxies",
      date: "September 06, 2024",
      description:
        "Webb Telescope data are still turning up more massive galaxies in the early universe than astronomers expect.",
      link: "/article/webb-telescope-galaxies",
    },
    {
      image:
        "https://lehuy240797.github.io/group6/assets/images/LD/image01.webp",
      title: "Solved: The Case of the Universe's 'Extra' Light",
      date: "September 05, 2024",
      description:
        "Astronomers may have finally solved the mystery of how dark space really is.",
      link: "/article/universe-extra-light",
    },
  ];
  return (
    <div
      className="News fs-1 d-flex flex-column justify-content-center align-items-center text-white"
      style={{ height: "700px" }}
    >
      {articles.map((article, index) => (
        <NewsCard key={index} {...article} />
      ))}
    </div>
  );
}
