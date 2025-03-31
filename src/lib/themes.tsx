export interface customThemeType {
  mode: string;
  icon: string;
  label: string;
  description: string;
}
export const customThemes: customThemeType[] = [
  {
    mode: 'light',
    icon: '🌞',
    label: 'Light Mode',
    description: 'Clean, bright interface for daytime use.',
  },
  {
    mode: 'nautical-sunset',
    icon: '🌦️',
    label: 'Nautical Sunset',
    description: 'Moody, When it is raining outside.',
  },
  {
    mode: 'hasiru',
    icon: '🌳',
    label: 'Hasiru',
    description: 'Green, For Mother Nature.',
  },
  {
    mode: 'dark',
    icon: '🌑',
    label: 'Dark',
    description: 'Please!!!, Take care of your eyes.',
  },
];
