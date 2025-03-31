import ThemePreviewCard from '../ThemePreviewCard';
import './style.css';

const theme = {
  classname: 'lavender',
  title: 'Lavender',
  colors: [
    '#a855f7',
    '#6b21a8',
    '#f3e8ff',
    '#7e22ce',
    '#c084fc',
    '#e9d5ff',
    '#581c87',
    '#d8b4fe',
  ],
};
const Lavender = () => {
  return (
    <ThemePreviewCard
      classname={theme.classname}
      colors={theme.colors}
      title={theme.title}
    />
  );
};

export default Lavender;
