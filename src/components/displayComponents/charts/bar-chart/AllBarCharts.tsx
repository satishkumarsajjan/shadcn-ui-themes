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
  <BarChartComponent key='bar-chart' />,
  <BarChartActiveComponent key='bar-chart-active' />,
  <BarChartCustomLabelComponent key='bar-chart-custom-label' />,
  <BarChartHorizontalComponent key='bar-chart-horizontal' />,
  <BarChartLabelComponent key='bar-chart-label' />,
  <BarChartMixedComponent key='bar-chart-mixed' />,
  <BarChartNegativeComponent key='bar-chart-negative' />,
  <BarChartStackedLegendComponent key='bar-chart-stacked-legend' />,
];

export const AllBarCharsObject = {
  title: 'Bar Charts',
  Components: BarChartComponents,
  Additional: <BarChartInteractiveComponent key='bar-chart-interactive' />,
};
