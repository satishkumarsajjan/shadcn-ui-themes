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
  <PieChartComponent />,
  <PieChartCustomLabelComponent />,
  <PieChartDonutComponent />,
  <PieChartDonutActiveComponent />,
  <PieChartDonutwithTextComponent />,
  <PieChartLabelComponent />,
  <PieChartLabelListComponent />,
  <PieChartLegendComponent />,
  <PieChartSeparatorNoneComponent />,
  <PieChartStackedComponent />,
];

export const AllPieChartsObject = {
  title: 'Pie Charts',
  Components: PieChartComponents,
  Additional: <PieChartInteractiveComponent />,
};
