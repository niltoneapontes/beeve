import { useColorScheme } from '@/hooks/useColorScheme';
import React, { useState } from 'react'
import { Searchbar } from 'react-native-paper'
import { useTheme } from 'styled-components/native';

export default function BeeveSearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const theme = useTheme();
  const colorScheme = useColorScheme()

  return (
    <Searchbar 
        placeholder='Digite o nome da bebida'
        value={searchQuery}
        onChangeText={setSearchQuery}
        theme={{ colors: { primary:  theme.primary } }}
        cursorColor={colorScheme === 'dark' ? theme.white : theme.primary}
        iconColor={colorScheme === 'dark' ? theme.white : theme.primary}
        rippleColor={colorScheme === 'dark' ? theme.white : theme.primary}
        inputStyle={{ color: colorScheme === 'dark' ? theme.white : theme.black}}
        placeholderTextColor={theme.gray}
        style={{
            width: "100%",
            backgroundColor: theme.backgroundColor,
            borderColor: theme.gray,
            borderWidth: 1,
            marginTop: 8
        }}
    />
  )
}
