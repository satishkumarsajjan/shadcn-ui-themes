import ThemePreviewCard from '../ThemePreviewCard';
import './style.css';

const theme = {
  classname: 'pastel',
  title: 'Pastel',
  colors: [
    '#4D5198',
    '#81B7D2',
    '#DAF2DC',
    '#FFCCE7',
    '#FFFCF8',
    '#F5A0C7',
    '#A9E1D4',
  ],
};
const Pastel = () => {
  return (
    <ThemePreviewCard
      classname={theme.classname}
      colors={theme.colors}
      title={theme.title}
    />
  );
};

export default Pastel;
