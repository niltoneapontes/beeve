import 'styled-components/native'
import { DarkTheme } from "@/constants/Colors";

declare module 'styled-components' {
    type ThemeType = typeof DarkTheme
    export interface DefaultTheme extends ThemeType {}
}