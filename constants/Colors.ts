/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    primaryBlue: "#044B8B",
    hearthRed: "#F2513A",
    primaryYeallow: '#FBF304', 
    neutralGray: "#F5F5F5",
    cardBg: '#F5F5F5',
  },
  dark: {
    text: '#ECEDEE',
    background: '#151515',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    primaryBlue: "#044B8B",
    hearthRed: "#F2513A",
    primaryYeallow: '#FBF304',
    neutralGray: "#F5F5F5",
    cardBg: '#2e2e2e',
  },
};
