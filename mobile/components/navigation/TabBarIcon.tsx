// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/

import FeatherIcons from '@expo/vector-icons/Feather';
import { type IconProps } from '@expo/vector-icons/build/createIconSet';
import { type ComponentProps } from 'react';
import { Platform } from 'react-native';

export function TabBarIcon({ style, ...rest }: IconProps<ComponentProps<typeof FeatherIcons>['name']>) {
  return <FeatherIcons size={32} style={[{ marginBottom: Platform.OS === 'ios' ? -24 : 0 }, style]} {...rest} />;
}
