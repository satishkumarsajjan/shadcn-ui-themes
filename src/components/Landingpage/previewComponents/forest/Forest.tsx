import ThemePreviewCard from '../ThemePreviewCard';
import './style.css';

const theme = {
  classname: 'forest',
  title: 'Forest',
  colors: [
    '#059669',
    '#064e3b',
    '#ecfdf5',
    '#10b981',
    '#34d399',
    '#d1fae5',
    '#065f46',
    '#6ee7b7',
  ],
};
const Forest = () => {
  return (
    <ThemePreviewCard
      classname={theme.classname}
      colors={theme.colors}
      title={theme.title}
    />
  );
};

export default Forest;
