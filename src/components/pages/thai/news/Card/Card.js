import "./Card.css";

export const NewsCard = ({ image, title, date, description, link }) => {
  return (
    <div className="card flex-row gap-4 rounded-2 border p-3 m-4">
      <div>
        <img src={image} alt="" />
      </div>
      <div className="text-start">
        <h3> {title} </h3>
        <p> {date} </p>
        <p> {description}</p>
      </div>
    </div>
  );
};
