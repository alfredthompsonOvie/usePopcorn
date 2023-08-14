import { useEffect, useState } from "react";
import NavBAr from "./components/NavBAr";
import Logo from "./components/Logo";
import Search from "./components/Search";
import NumResults from "./components/NumResults";

import Movies from "./components/Movies";
import Box from "./components/Box";
import MoviesList from "./components/MoviesList";

import WatchedListBox from "./components/WatchedListBox";
import MovieSummary from "./components/MovieSummary";
import WatchedList from "./components/WatchedList";

import Loading from "./components/Loading";
import Error from "./components/Error";

const tempMovieData = [
	{
		imdbID: "tt1375666",
		Title: "Inception",
		Year: "2010",
		Poster:
			"https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
	},
	{
		imdbID: "tt0133093",
		Title: "The Matrix",
		Year: "1999",
		Poster:
			"https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
	},
	{
		imdbID: "tt6751668",
		Title: "Parasite",
		Year: "2019",
		Poster:
			"https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
	},
];

const tempWatchedData = [
	{
		imdbID: "tt1375666",
		Title: "Inception",
		Year: "2010",
		Poster:
			"https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
		runtime: 148,
		imdbRating: 8.8,
		userRating: 10,
	},
	{
		imdbID: "tt0088763",
		Title: "Back to the Future",
		Year: "1985",
		Poster:
			"https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
		runtime: 116,
		imdbRating: 8.5,
		userRating: 9,
	},
];

export const average = (arr) =>
	arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);


export default function App() {
	const [movies, setMovies] = useState([]);
	const [watched, setWatched] = useState(tempWatchedData);
	const [query, setQuery] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	

	// const url = `https://www.omdbapi.com/?apikey=68eb1d77&s=${query}`
	const KEY = '68eb1d77';
	useEffect(function () { 
		async function getMovies() {
			if (!query) return;
			
			try {
				setIsLoading(true)
				const res = await fetch(`https://www.omdbapi.com/?apikey=${KEY}&s=${query}`);
				if (!res.ok) {
					console.log('shit its your network')
					throw new Error('something went wrong!')
				}
			
				const data = await res.json();

				if (data.Response === "False") {
					console.log("false")
					throw new Error("⛔🛑Movie not Found!")
				}

				console.log(data.Response);
				setMovies(data.Search);
				
				
			}catch (e) {
				console.log(e)
				// console.log(e.message)
				setError(e.message);
				// setError(e.message);
			} finally {
				setIsLoading(false)
			}
		}

		getMovies();

	}, [query])



	return (
		<>
			<NavBAr>
				<Logo />
				<Search query={query} setQuery={setQuery} />
				<NumResults movies={movies} />
			</NavBAr>

			<Movies>
				<Box>
					{isLoading && <Loading />}
					{error && <Error message={error}/>}
					{!isLoading && !error && <MoviesList movies={movies} />}
				
				</Box>
				<Box>
					<WatchedListBox>
						<MovieSummary watched={watched} average={average}/>
						<WatchedList watched={watched} />
					</WatchedListBox>
				</Box>
			</Movies>
		</>
	);
}