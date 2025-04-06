import { RadialChartComponent } from './RadialChart';
import { RadialChartGridComponent } from './RadialChartGrid';
import { RadialChartLabelComponent } from './RadialChartLabel';
import { RadialChartShapeComponent } from './RadialChartShape';
import { RadialChartStackedComponent } from './RadialChartStacked';
import { RadialChartTextComponent } from './RadialChartText';

const RadialChartComponents = [
  <RadialChartComponent key='radial-chart' />,
  <RadialChartGridComponent key='radial-chart-grid' />,
  <RadialChartLabelComponent key='radial-chart-label' />,
  <RadialChartShapeComponent key='radial-chart-shape' />,
  <RadialChartStackedComponent key='radial-chart-stacked' />,
  <RadialChartTextComponent key='radial-chart-text' />,
];

export const AllRadialChartsObject = {
  title: 'Radial Charts',
  Components: RadialChartComponents,
  Additional: null,
};
