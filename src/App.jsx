import React, { useState } from 'react';
import { AppShell, Group, Title, Container, Button, Badge } from '@mantine/core';
import { useMantineColorScheme } from '@mantine/core';
import Home from './pages/Home';
import Welcome from './pages/Welcome';

export default function App() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const [showHome, setShowHome] = useState(false);
  const toggleColorScheme = () => setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');

  if (!showHome) {
    return <Welcome onExplore={() => setShowHome(true)} />;
  }

  return (
    <AppShell
      padding="md"
      header={{
        height: 80,
      }}
    >
      <AppShell.Header p="md" style={{ 
        background: colorScheme === 'dark' ? 'linear-gradient(135deg, #1a1b1e 0%, #2d2e32 100%)' : 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        borderBottom: `1px solid ${colorScheme === 'dark' ? '#3d3e42' : '#e9ecef'}`
      }}>
        <Group justify="space-between" style={{ height: '100%' }}>
          <div>
            <Group gap="xs">
              <div style={{ fontSize: 32 }}>🎬</div>
              <div>
                <Title order={2} style={{ marginBottom: 0, fontSize: 22, fontWeight: 700 }}>Britney's Movie Finder</Title>
                <Badge variant="gradient" gradient={{ from: 'blue', to: 'cyan' }} size="sm">Discover Movies</Badge>
              </div>
            </Group>
          </div>
          <Group gap="md">
            <Button
              onClick={() => setShowHome(false)}
              variant="gradient"
              gradient={{ from: 'blue', to: 'cyan' }}
              size="md"
              style={{ fontWeight: 600 }}
            >
              ← Back to Home
            </Button>
            <Button
              onClick={toggleColorScheme}
              variant={colorScheme === 'dark' ? 'light' : 'filled'}
              color={colorScheme === 'dark' ? 'yellow' : 'gray'}
              size="md"
              style={{ fontWeight: 600 }}
            >
              {colorScheme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
            </Button>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Main>
        <Container size="xl" py="xl">
          <Home />
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}
