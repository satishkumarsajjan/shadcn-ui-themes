import { BarChartComponent } from './BarChart';
import { BarChartActiveComponent } from './BarChartActive';
import { BarChartCustomLabelComponent } from './BarChartCustomLabel';
import { BarChartHorizontalComponent } from './BarChartHorizontal';
import { BarChartInteractiveComponent } from './BarChartInteractive';
import { BarChartLabelComponent } from './BarChartLabel';
import { BarChartMixedComponent } from './BarChartMixed';
import { BarChartNegativeComponent } from './BarChartNegative';
import { BarChartStackedLegendComponent } from './BarChartStackedLegend';

const BarChartComponents = [
  <BarChartComponent />,
  <BarChartActiveComponent />,
  <BarChartCustomLabelComponent />,
  <BarChartHorizontalComponent />,
  <BarChartLabelComponent />,
  <BarChartMixedComponent />,
  <BarChartNegativeComponent />,
  <BarChartStackedLegendComponent />,
];

export const AllBarCharsObject = {
  title: 'Bar Charts',
  Components: BarChartComponents,
  Additional: <BarChartInteractiveComponent />,
};
