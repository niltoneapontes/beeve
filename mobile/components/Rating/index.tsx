import React from 'react'
import { Container } from './styles'
import { TextProps } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

interface ITitle extends TextProps {
    rating: number;
    setRating: React.Dispatch<React.SetStateAction<number>>;
}

function Rating({ rating, setRating, ...props }: ITitle) {
  const theme = useTheme()
  const numbers: number[] = Array.from({ length: 5 }, (_, i) => i + 1);

  return (
    <Container>
      {numbers.map((number) => {
         if(number <= rating) {
          return <MaterialIcons key={number.toString()} name='star' size={52} color={theme.secondary} onPress={() => {
            setRating(number)
          }}/>
        } else {
          return <MaterialIcons key={number.toString()} name='star-border' size={52} color={theme.secondary}  onPress={() => {
            setRating(number)
          }}/>
        }
      }
      )}
    </Container>
  )
}

export default Rating