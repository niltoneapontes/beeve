import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { useTheme } from 'styled-components/native';

export default function TabLayout() {
  const theme = useTheme()

  return (
        <Tabs
        screenOptions={{
          tabBarActiveTintColor: theme.primary,
          headerShown: false,
          tabBarStyle: {
            height: 64,
            backgroundColor: theme.backgroundColor
          },
          tabBarShowLabel: false,
        }}>
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name="home" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: 'Pesquisar',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name="search" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Perfil',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name='user' color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Configurações',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name='settings' color={color} />
            ),
          }}
        />
      </Tabs>
  );
}
