import { useEffect, useState } from 'react';
import './Home.css';
import Header from '../../components/header/Header';
import MovieContainer from '../../components/movieContainer/MovieContainer';

function Home() {
  const [movies, setMovies] = useState([]);

  async function getRatedMovies() {
    const url = `https://api.themoviedb.org/3/discover/movie?language=pt-BR&include_adult=false&include_video=false&page=1&sort_by=popularity.desc`;

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: "Bearer " + import.meta.env.VITE_TOKEN_TMDB,
      }
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
    }
  }

  useEffect(() => {
    getRatedMovies();
  }, []);

  return (
    <>
      <Header />
      <MovieContainer movies={movies} />
    </>
  );
}

export default Home;
