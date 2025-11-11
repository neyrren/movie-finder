import React, { useState, useEffect } from 'react'
import { Card, Image, Text, Badge, Group, Button, Modal, Rating, Stack, Grid, Avatar, Tabs } from '@mantine/core'
import { fetchMovieDetails } from '../api/tmdb'


const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500'


export default function MovieCard({ movie }) {
const [opened, setOpened] = useState(false)
const [details, setDetails] = useState(null)
const [loading, setLoading] = useState(false)
const poster = movie.poster_path ? `${IMAGE_BASE}${movie.poster_path}` : null


const loadDetails = async () => {
if (details) return
setLoading(true)
try {
const data = await fetchMovieDetails(movie.id)
setDetails(data)
} catch (err) { console.error(err) }
setLoading(false)
}


return (
<>
<Card shadow="md" padding="lg" radius="md" withBorder style={{ transition: 'all 0.3s ease', cursor: 'pointer' }} 
  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
>
{poster && <Card.Section><Image src={poster} height={280} alt={movie.title} /></Card.Section>}


<Group justify="space-between" mt="md" mb="xs">
<div style={{ flex: 1 }}>
<Text weight={600} size="sm" lineClamp={2}>{movie.title}</Text>
<Badge size="sm" variant="light" mt="xs">{movie.release_date?.slice(0,4)}</Badge>
</div>
</Group>


<Group justify="space-between" mb="md">
<Group gap="xs">
<Rating value={(movie.vote_average || 0) / 2} readOnly fractions={2} size="sm" />
<Text size="sm" weight={500}>{(movie.vote_average || 0).toFixed(1)}/10</Text>
</Group>
</Group>


<Text size="xs" lineClamp={2} c="dimmed">{movie.overview || 'No description available'}</Text>


<Button 
fullWidth 
mt="md" 
onClick={() => {
loadDetails()
setOpened(true)
}}
variant="gradient"
gradient={{ from: 'blue', to: 'cyan' }}
>
View Details
</Button>
</Card>


<Modal opened={opened} onClose={() => setOpened(false)} title={movie.title} size="lg" scrollAreaComponent={undefined}>
<Stack gap="md">
<Group grow align="flex-start">
{poster && <Image src={poster} height={350} alt={movie.title} radius="md" />}
<div>
<Text weight={700} size="lg">{movie.title}</Text>
<Text size="sm" c="dimmed">{movie.release_date}</Text>
<Group mt="md" gap="xs">
<Rating value={(movie.vote_average || 0) / 2} readOnly fractions={2} />
<Text size="sm" weight={500}>{(movie.vote_average || 0).toFixed(1)}/10</Text>
</Group>
{details && (
<div mt="md">
{details.genres && details.genres.length > 0 && (
<Group mt="md" gap="xs">
{details.genres.map(g => <Badge key={g.id} variant="light">{g.name}</Badge>)}
</Group>
)}
{details.runtime && <Text size="sm" mt="md">⏱️ {details.runtime} minutes</Text>}
</div>
)}
</div>
</Group>

{details && (
<Tabs defaultValue="overview">
<Tabs.List>
<Tabs.Tab value="overview">Overview</Tabs.Tab>
<Tabs.Tab value="cast">Cast & Crew</Tabs.Tab>
</Tabs.List>
<Tabs.Panel value="overview" pt="md">
<Text size="sm">{movie.overview || 'No description available'}</Text>
</Tabs.Panel>
<Tabs.Panel value="cast" pt="md">
{details.credits?.cast && details.credits.cast.length > 0 ? (
<Grid>
{details.credits.cast.slice(0, 6).map(actor => (
<Grid.Col span={{ base: 6, sm: 4 }} key={actor.id}>
<Group gap="sm">
<Avatar 
src={actor.profile_path ? `${IMAGE_BASE}${actor.profile_path}` : null}
size="lg"
name={actor.name}
color="initials"
/>
<div style={{ flex: 1 }}>
<Text size="sm" weight={500} lineClamp={1}>{actor.name}</Text>
<Text size="xs" c="dimmed" lineClamp={1}>{actor.character}</Text>
</div>
</Group>
</Grid.Col>
))}
</Grid>
) : (
<Text c="dimmed" size="sm">No cast information available</Text>
)}
</Tabs.Panel>
</Tabs>
)}
</Stack>
</Modal>
</>
)
}