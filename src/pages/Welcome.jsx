import React from 'react'
import { Container, Title, Text, Button, Stack, Group, Box } from '@mantine/core'
import '../Welcome.css'

export default function Welcome({ onExplore }) {
  return (
    <Box className="welcome-container">
      {/* Animated Background */}
      <div className="animated-background">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
        <div className="gradient-orb orb-4"></div>
      </div>

      <Container size="xl" py={80} style={{ position: 'relative', zIndex: 2 }}>
        <Stack gap="xl" align="center">
          {/* Animated Title */}
          <div className="welcome-content">
            <div className="emoji-animation">🎬</div>
            <Title order={1} className="welcome-title" align="center">
              Welcome to
            </Title>
            <Title order={2} className="britney-title" align="center">
              Britney's Movie Finder
            </Title>
          </div>

          {/* Subtitle */}
          <Text align="center" size="xl" className="subtitle-animation" style={{ maxWidth: 600 }}>
            Discover trending movies, explore ratings, themes, cast, and dive into your favorite stories! ✨
          </Text>

          {/* Features List */}
          <Group grow mt={40} style={{ maxWidth: 700, width: '100%' }}>
            <Box className="feature-box-animation feature-box-1" p="lg">
              <div style={{ fontSize: 40 }}>🎥</div>
              <Text weight={600} mt="xs" className="feature-text">Trending Movies</Text>
              <Text size="sm" className="feature-subtext">See what's hot now</Text>
            </Box>
            <Box className="feature-box-animation feature-box-2" p="lg">
              <div style={{ fontSize: 40 }}>⭐</div>
              <Text weight={600} mt="xs" className="feature-text">Ratings & Reviews</Text>
              <Text size="sm" className="feature-subtext">Real scores & themes</Text>
            </Box>
            <Box className="feature-box-animation feature-box-3" p="lg">
              <div style={{ fontSize: 40 }}>🎭</div>
              <Text weight={600} mt="xs" className="feature-text">Cast & Crew</Text>
              <Text size="sm" className="feature-subtext">Meet the stars</Text>
            </Box>
          </Group>

          {/* Explore Button */}
          <button
            onClick={onExplore}
            className="explore-button-animation native-explore-button"
            aria-label="Start Exploring"
            type="button"
          >
            <span style={{ marginRight: 8 }}>🚀</span>
            <span style={{ fontWeight: 800, color: 'white' }}>Start Exploring</span>
          </button>
        </Stack>
      </Container>
    </Box>
  )
}
