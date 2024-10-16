// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/

import FeatherIcons from '@expo/vector-icons/Feather';
import { type IconProps } from '@expo/vector-icons/build/createIconSet';
import { type ComponentProps } from 'react';

export function TabBarIcon({ style, ...rest }: IconProps<ComponentProps<typeof FeatherIcons>['name']>) {
  return <FeatherIcons size={32} style={[{ marginBottom: -24 }, style]} {...rest} />;
}
