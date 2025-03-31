import { RadialChartComponent } from './RadialChart';
import { RadialChartGridComponent } from './RadialChartGrid';
import { RadialChartLabelComponent } from './RadialChartLabel';
import { RadialChartShapeComponent } from './RadialChartShape';
import { RadialChartStackedComponent } from './RadialChartStacked';
import { RadialChartTextComponent } from './RadialChartText';

const RadialChartComponents = [
  <RadialChartComponent />,
  <RadialChartGridComponent />,
  <RadialChartLabelComponent />,
  <RadialChartShapeComponent />,
  <RadialChartStackedComponent />,
  <RadialChartTextComponent />,
];

export const AllRadialChartsObject = {
  title: 'Radial Charts',
  Components: RadialChartComponents,
  Additional: null,
};
