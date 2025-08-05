import { NewsCard } from "../Card/Card";
import "./News.css";

export default function News() {
  const articles = [
    {
      title: "NASA Discovers Interstellar Comet 3I/ATLAS",
      image:
        "https://student-cms.prd.timeshighereducation.com/sites/default/files/styles/default/public/istock-664670026.jpg?itok=Q0zHmkJH",
      date: "July 1, 2025",
      description:
        "NASA's ATLAS survey in Chile detected the third confirmed interstellar comet entering our solar system.",
      link: "https://science.nasa.gov/blogs/planetary-defense/2025/07/02/nasa-discovers-interstellar-comet-moving-through-solar-system/",
    },
    {
      title: "ERIS Spots Spiral Disc Around Young Star",
      date: "July 31, 2025",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlCJqeu4mCIIxRJiWsn8-y56CBsLN0RPvtc2i9BH6q_ePzaz8OXa5-6cb421o5jQnNfuk&usqp=CAU",
      description:
        "VLT’s ERIS instrument captured a spiral disc around HD 135344B—possible planet formation in action.",
      link: "https://www.space.com/astronomy/eris-spots-spiral-disc-around-young-star-space-photo-of-the-day-for-july-31-2025",
    },
    {
      title: "What’s Up: July 2025 Skywatching Tips from NASA",
      date: "July 2025",
      image:
        "https://static01.nyt.com/images/2024/12/23/multimedia/live-blog-exp-20250101-astronomy-space-calendar-2025-header-gqcm/live-blog-exp-20250101-astronomy-space-calendar-2025-header-gqcm-articleLarge.jpg?quality=75&auto=webp&disable=upscale",
      description:
        "Skywatching guide: Mars, Mercury, Jupiter, Venus viewings plus constellation Aquila visibility.",
      link: "https://science.nasa.gov/solar-system/skywatching/whats-up-july-2025-skywatching-tips-from-nasa/",
    },
    {
      title: "The Southern Delta Aquariid Meteor Shower Peaks",
      date: "July 31, 2025",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOfnuM-L6TxmCj9z_oEuoIFk35YYGIPm_eZFGbIw6blLQJUwQ88S4BTH1aLi_fsTFCc6E&usqp=CAU",
      description:
        "The Southern Delta Aquariids meteor shower reaches its peak in the pre‑dawn sky.",
      link: "https://www.astronomy.com/observing/the-sky-today-thursday-july-31-2025/",
    },
    {
      title: "August 2025: What’s in the Sky This Month? (Northern Hemisphere)",
      date: "August 1, 2025",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpnQhFrnL1utiBVuy8hNEi9Jkou-mSSDlYIQ&s",
      description:
        "Planetary conjunctions (Saturn–Neptune, Venus–Jupiter), Titan transits, Perseids meteor shower details.",
      link: "https://www.astronomy.com/observing/sky-this-month-august-2025/",
    },
    {
      title: "Uranus Passes Under Pleiades This August",
      date: "July 31, 2025",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwpcZB92A11YcWKdhcNQhh2bs3slnL6uidvA&s",
      description:
        "Observe Uranus drifting beneath the Pleiades cluster throughout August in the morning sky.",
      link: "https://www.skyatnightmagazine.com/news/uranus-august-2025",
    },
    {
      title: "Vera Rubin Observatory Nears Full Operations",
      date: "Late July 2025",
      image:
        "https://nsf-gov-resources.nsf.gov/styles/hero_small/s3/2023-04/Andromeda_galaxy_h.jpg.webp?VersionId=1jJ3N_Ix2nIguRWAof8ppMEpu3Bzvx7Q&itok=WSHuusB5",
      description:
        "Rubin Observatory’s LSST survey begins full operations, delivering deep-sky images and asteroid discoveries.",
      link: "https://www.livescience.com/space/space-exploration/vera-c-rubin-observatory-the-groundbreaking-mission-to-make-a-10-year-time-lapse-movie-of-the-universe",
    },
    {
      title: "Mysterious Impact on Saturn Observed by Amateur Astronomer",
      date: "July 5, 2025",
      image:
        "https://imageio.forbes.com/blogs-images/startswithabang/files/2017/01/Alone_in_Space_-_Astronomers_Find_New_Kind_of_Planet-1200x900.jpg?height=533&width=711&fit=bounds",
      description:
        "A possible object impact left a glow on Saturn, potentially the first-ever recorded collision.",
      link: "https://www.timesofindia.indiatimes.com/science/mysterious-object-may-have-crashed-into-saturn-astronomers-still-searching-for-clues/articleshow/122332618.cms",
    },
    {
      title: "China May Be Building Largest Ground-Based Telescope",
      date: "July 2025",
      image: "https://www.universetoday.com/article_images/jovian-planets.jpg",
      description:
        "Clues suggest China is planning a new telescope larger than existing facilities, raising scientific and geopolitical interest.",
      link: "https://www.wsj.com/world/china/a-cosmic-mystery-is-china-building-the-worlds-biggest-telescope-d436cdef",
    },
    {
      title: "New Female Astronomer Royal Appointed in UK",
      date: "July 30, 2025",
      image:
        "https://www.innovationnewsnetwork.com/wp-content/uploads/2025/01/shutterstock_2460172753.jpg",
      description:
        "Planetary scientist Michele Dougherty becomes the UK’s first female Astronomer Royal.",
      link: "https://www.theguardian.com/science/2025/jul/30/planetary-scientist-michele-dougherty-first-female-astronomer-royal",
    },
  ];

  return (
    <div className="news">
      <div className="wallpaper">
        <img
          src="https://www.nasa.gov/wp-content/uploads/2025/05/54492396655-c6ba83df1d-o-1.jpg?w=1536"
          alt=""
        />
      </div>
      <h1 className="fs-1">NEWS</h1>
      <div className="News fs-1 d-flex flex-column align-items-center text-white m-4">
        {articles.map((article, index) => (
          <NewsCard key={index} {...article} />
        ))}
      </div>
    </div>
  );
}
