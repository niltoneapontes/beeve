import React, { useRef, useState } from "react";
import { Container, CardTitle, CardText, CardImage, Rating } from "./styles";
import {
  Dimensions,
  ImageSourcePropType,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { DarkTheme } from "@/constants/Colors";
import SampleImage from "@/assets/images/sample.png";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { useTheme } from "styled-components/native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

interface IButton {
  image: string;
  title: string;
  subtitle: string;
  rate: number;
  onPress: () => void;
  onDelete: () => void;
}

const THRESHOLD = -100;

function Card({ image, title, subtitle, rate, onPress, onDelete }: IButton) {
  const stars = [];
  const theme = useTheme();

  for (let i = 0; i < 5; i++) {
    if (i < rate) {
      stars.push(
        <MaterialIcons
          key={Math.random().toString()}
          name="star"
          color={DarkTheme.secondary}
          size={24}
        ></MaterialIcons>
      );
    } else {
      stars.push(
        <MaterialIcons
          key={Math.random().toString()}
          name="star-border"
          color={DarkTheme.secondary}
          size={24}
        ></MaterialIcons>
      );
    }
  }

  const offset = useSharedValue<number>(0);

  const pan = Gesture.Pan()
    .onBegin(() => {})
    .onChange((event) => {
      if (event.translationX < THRESHOLD) {
        offset.value = THRESHOLD
      } else if (event.translationX < 0) {
        offset.value = event.translationX;
      }
    })
    .onEnd(() => {
      if(offset.value !== THRESHOLD) {
        offset.value = withSpring(0);
      }
    });

  const animatedStyles = useAnimatedStyle(() => ({
    opacity: 1,
    transform: [{ translateX: offset.value }],
    borderRadius: 8,
    backgroundColor: theme.grey,
  }));

  return (
    <GestureHandlerRootView>
      <View style={{
            flexDirection: 'row',
            position: "absolute",
            right: 0,
            top: 0,
            height: 96,
            alignItems: "center",
            justifyContent: 'center'
          }}>
      <TouchableOpacity onPress={() => onDelete()}>
        <Feather
          name="trash-2"
          size={40}
          color={theme.danger}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {
        offset.value = withSpring(0);
      }}>
        <Feather
          name="x"
          size={40} 
          color={theme.grey}
          style={{
            marginLeft: 8
          }}
        />
      </TouchableOpacity>
      </View>
      <GestureDetector gesture={pan}>
        <Animated.View style={animatedStyles}>
          <Container onPress={onPress} activeOpacity={1}>
            {image && image.length > 0 ? (
              <CardImage source={{ uri: image }} resizeMode="cover"></CardImage>
            ) : (
              <CardImage source={SampleImage} resizeMode="cover"></CardImage>
            )}
            <View>
              <CardTitle style={{ fontSize: 16 }}>{title}</CardTitle>
              <CardText style={{ fontSize: 16 }}>Tipo: {subtitle}</CardText>
            </View>
            <Rating>{stars}</Rating>
          </Container>
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}

export default Card;
