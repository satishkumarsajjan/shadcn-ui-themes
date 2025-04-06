import { PieChartComponent } from './PieChart';
import { PieChartCustomLabelComponent } from './PieChartCustomLabel';
import { PieChartDonutComponent } from './PieChartDonut';
import { PieChartDonutActiveComponent } from './PieChartDonutActive';
import { PieChartDonutwithTextComponent } from './PieChartDonutwithText';
import { PieChartInteractiveComponent } from './PieChartInteractive';
import { PieChartLabelComponent } from './PieChartLabel';
import { PieChartLabelListComponent } from './PieChartLabelList';
import { PieChartLegendComponent } from './PieChartLegend';
import { PieChartSeparatorNoneComponent } from './PieChartSeparatorNone';
import { PieChartStackedComponent } from './PieChartStacked';

const PieChartComponents = [
  <PieChartComponent key='pie-chart' />,
  <PieChartCustomLabelComponent key='pie-chart-custom-label' />,
  <PieChartDonutComponent key='pie-chart-donut' />,
  <PieChartDonutActiveComponent key='pie-chart-donut-active' />,
  <PieChartDonutwithTextComponent key='pie-chart-donut-with-text' />,
  <PieChartLabelComponent key='pie-chart-label' />,
  <PieChartLabelListComponent key='pie-chart-label-list' />,
  <PieChartLegendComponent key='pie-chart-legend' />,
  <PieChartSeparatorNoneComponent key='pie-chart-separator-none' />,
  <PieChartStackedComponent key='pie-chart-stacked' />,
];

export const AllPieChartsObject = {
  title: 'Pie Charts',
  Components: PieChartComponents,
  Additional: <PieChartInteractiveComponent key='pie-chart-interactive' />,
};
