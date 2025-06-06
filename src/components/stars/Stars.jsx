import "./Stars.css";
import { FaStar, FaRegStar } from "react-icons/fa";

function MovieStars({ voteAverage }) {
  const rating = Math.round(voteAverage / 2);
  const fullStars = rating;
  const emptyStars = 5 - fullStars;

  return (
    <div className="rating">
      {[...Array(fullStars)].map((_, i) => (
        <FaStar key={`full-${i}`} color="gold" />
      ))}
      {[...Array(emptyStars)].map((_, i) => (
        <FaRegStar key={`empty-${i}`} color="gray" />
      ))}
      <span>({voteAverage?.toFixed(1) || "0.0"})</span>
    </div>
  );
}

export default MovieStars;
