import React from 'react'
import { Container } from './styles'
import { TouchableOpacityProps } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

interface IButton extends TouchableOpacityProps {
    iconName: any;
    type: 'primary' | 'secondary'
    onPress: () => void
}

function FloatingButton({ iconName, type, onPress, ...props }: IButton) {
  const theme = useTheme()
  
  return (
    <Container type={type} onPress={onPress} {...props}>
      <Feather name={iconName} size={32} color={theme.white}/>
    </Container>
  )
}

export default FloatingButton