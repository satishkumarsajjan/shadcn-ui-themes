import ThemePreviewCard from '../ThemePreviewCard';
import './style.css';

const theme = {
  classname: 'sunset-glow',
  title: 'Sunset Glow',
  colors: [
    '#f97316',
    '#7c2d12',
    '#fff7ed',
    '#c2410c',
    '#ffa344',
    '#ffe0bf',
    '#552008',
    '#fb923c',
  ],
};
const SunsetGlow = () => {
  return (
    <ThemePreviewCard
      classname={theme.classname}
      colors={theme.colors}
      title={theme.title}
    />
  );
};

export default SunsetGlow;
