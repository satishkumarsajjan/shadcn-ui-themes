import ThemePreviewCard from '../ThemePreviewCard';
import './style.css';

const theme = {
  classname: 'ocean',
  title: 'Ocean',
  colors: [
    '#fafeff',
    '#00c6ff',
    '#edf5f8',
    '#00c6ff',
    '#152e36',
    '#00c6ff',
    '#041115',
    '#00c6ff',
  ],
};
const Ocean = () => {
  return (
    <ThemePreviewCard
      classname={theme.classname}
      colors={theme.colors}
      title={theme.title}
    />
  );
};

export default Ocean;
