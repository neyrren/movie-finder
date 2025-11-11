import axios from 'axios'


const tmdb = axios.create({ baseURL: 'https://api.themoviedb.org/3' })


export const fetchTrending = (page = 1) =>
tmdb.get('/trending/movie/week', { params: { api_key: import.meta.env.VITE_TMDB_API_KEY, page } }).then(r => r.data)


export const searchMovies = (query, page = 1) =>
tmdb.get('/search/movie', { params: { api_key: import.meta.env.VITE_TMDB_API_KEY, query, page } }).then(r => r.data)


export const fetchMovieDetails = (id) =>
tmdb.get(`/movie/${id}`, { params: { api_key: import.meta.env.VITE_TMDB_API_KEY, append_to_response: 'credits' } }).then(r => r.data)