import React, { useEffect, useState } from 'react'
import { Group, TextInput, Center, Loader, SimpleGrid, Pagination, Stack, Title, Text } from '@mantine/core'
import MovieCard from '../components/MovieCard'
import { fetchTrending, searchMovies } from '../api/tmdb'


export default function Home() {
const [movies, setMovies] = useState([])
const [loading, setLoading] = useState(false)
const [query, setQuery] = useState('')
const [page, setPage] = useState(1)
const [totalPages, setTotalPages] = useState(1)
const [isSearching, setIsSearching] = useState(false)


useEffect(() => { loadTrending(page) }, [page])


async function loadTrending(p = 1) {
setLoading(true)
setIsSearching(false)
try {
const data = await fetchTrending(p)
setMovies(data.results)
setTotalPages(data.total_pages > 500 ? 500 : data.total_pages)
} catch (err) { console.error(err) }
setLoading(false)
}


async function handleSearch(value) {
setQuery(value)
setPage(1)
if (!value.trim()) return loadTrending(1)
setIsSearching(true)
setLoading(true)
try {
const data = await searchMovies(value, 1)
setMovies(data.results)
setTotalPages(data.total_pages > 500 ? 500 : data.total_pages)
} catch (err) { console.error(err) }
setLoading(false)
}


async function handlePageChange(newPage) {
setPage(newPage)
setLoading(true)
try {
const data = isSearching ? await searchMovies(query, newPage) : await fetchTrending(newPage)
setMovies(data.results)
setTotalPages(data.total_pages > 500 ? 500 : data.total_pages)
} catch (err) { console.error(err) }
setLoading(false)
}


return (
<Stack gap="lg">
<div>
<Title order={2} mb="xs">{isSearching ? '🔍 Search Results' : '🔥 Trending Movies'}</Title>
<Text size="sm" c="dimmed">{isSearching ? `Showing results for "${query}"` : 'Discover the hottest movies this week'}</Text>
</div>

<TextInput
placeholder="Search movies by title..."
value={query}
onChange={(e) => handleSearch(e.currentTarget.value)}
size="md"
radius="md"
icon="🔍"
clearable
onClear={() => loadTrending(1)}
/>


{loading ? (
<Center style={{ minHeight: 400 }}>
<Loader size="lg" />
</Center>
) : movies.length > 0 ? (
<>
<SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="lg">
{movies.map(m => <MovieCard key={m.id} movie={m} />)}
</SimpleGrid>


{totalPages > 1 && (
<Center mt="xl">
<Pagination 
page={page} 
onChange={handlePageChange} 
total={Math.min(totalPages, 500)}
size="lg"
/>
</Center>
)}
</>
) : (
<Center style={{ minHeight: 300 }}>
<Stack gap="sm" align="center">
<Text size="lg" c="dimmed">😢 No movies found</Text>
<Text size="sm" c="dimmed">Try searching for a different movie or explore trending films</Text>
</Stack>
</Center>
)}
</Stack>
)
}