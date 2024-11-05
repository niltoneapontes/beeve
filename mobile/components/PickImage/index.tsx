import { Feather } from '@expo/vector-icons';
import { IconProps } from '@expo/vector-icons/build/createIconSet';
import React, { ComponentProps } from 'react'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { useTheme } from 'styled-components/native'

interface IPickImage extends TouchableOpacityProps {
    onPickImage: () => void;
    iconName?: ComponentProps<typeof Feather>['name'];
}

function PickImage({onPickImage, iconName, ...props}: IPickImage) {
    const theme = useTheme()
  return (
    <TouchableOpacity style={{
        backgroundColor: theme.colors.primary,
        marginTop: -32,
        alignSelf: 'flex-end',
        marginRight: 0,
        padding: 12,
        borderRadius: 28
      }} {...props} onPress={() => {
        onPickImage()
      }}>
        <Feather name={iconName || 'upload'} size={24} color={theme.colors.card} />
      </TouchableOpacity>
  )
}

export default PickImage