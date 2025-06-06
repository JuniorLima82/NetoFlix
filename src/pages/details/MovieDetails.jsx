import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MovieStars from "../../components/stars/stars";
import "./MovieDetails.css";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [trailerKey, setTrailerKey] = useState("");
  const [showTrailer, setShowTrailer] = useState(true);

  const IMG_BASE = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    async function fetchMovie() {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_TOKEN_TMDB}`,
        },
      };

      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?language=pt-BR`,
          options
        );
        if (!res.ok) throw new Error("Erro ao buscar dados do filme");
        const data = await res.json();
        setMovie(data);

        const trailerRes = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/videos?language=pt-BR`,
          options
        );
        const trailerData = await trailerRes.json();
        const trailer = trailerData.results?.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );
        setTrailerKey(trailer ? trailer.key : "");
      } catch (error) {
        console.error("Erro ao buscar dados do filme:", error);
      }
    }

    fetchMovie();
  }, [id]);

  if (!movie.title) return null;

  return (
    <div
      className="movie-details"
      style={{
        backgroundImage: movie.backdrop_path
          ? `url(${IMG_BASE}${movie.backdrop_path})`
          : "none",
      }}
    >
      <div className="overlay">
        <div className="content">
          <div className="poster">
            <img src={`${IMG_BASE}${movie.poster_path}`} alt={movie.title} />
          </div>

          <div className="info">
            <h1>{movie.title}</h1>

            {/* Gêneros */}
            {movie.genres && (
              <p>
                <strong>Gêneros: </strong>
                {movie.genres.map((g) => g.name).join(", ")}
              </p>
            )}

            <p>{movie.overview}</p>

            <p>
              <strong>Data de lançamento: </strong>
              {movie.release_date}
            </p>

            {/* Estrelas */}
            <MovieStars voteAverage={movie.vote_average} />

            {/* Trailer */}
            {trailerKey && showTrailer && (
              <div className="trailer">
                <iframe
                  width="560"
                  height="315"
                  src={`https://www.youtube.com/embed/${trailerKey}`}
                  title="Trailer do Filme"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}

            {/* Botão para fechar/abrir trailer, opcional */}
            {trailerKey && (
              <button onClick={() => setShowTrailer((prev) => !prev)}>
                {showTrailer ? "Fechar Trailer" : "Assistir Trailer"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
