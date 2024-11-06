import React from 'react'
import { Container, CardTitle, CardText, CardImage, Rating } from './styles'
import { ImageSourcePropType, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { DarkTheme } from '@/constants/Colors';
import SampleImage from '@/assets/images/sample.png'

interface IButton {
    image: string;
    title: string;
    subtitle: string;
    rate: number;
    onPress: () => void;
}

function Card({ image, title, subtitle, rate, onPress }: IButton) {
  const stars = []

  for(let i = 0; i < 5; i++) {
    if(i < rate) {
      stars.push(
        <MaterialIcons key={Math.random().toString()} name='star' color={DarkTheme.secondary} size={24}></MaterialIcons>
      )
    } else {
      stars.push(
        <MaterialIcons key={Math.random().toString()} name='star-border' color={DarkTheme.secondary} size={24}></MaterialIcons>
      )
    }
  }

  return (
    <Container onPress={onPress} activeOpacity={1}>
      {image && image.length > 0 ? (
        <CardImage source={{uri: image}} resizeMode='cover'></CardImage>
      ): (
        <CardImage source={SampleImage} resizeMode='cover'></CardImage>
      )}
      <View>
        <CardTitle style={{ fontSize: 16 }}>{title}</CardTitle>
        <CardText style={{ fontSize: 16 }}>Tipo: {subtitle}</CardText>
      </View>
      <Rating>
        {stars}
      </Rating>
    </Container>
  )
}

export default Card