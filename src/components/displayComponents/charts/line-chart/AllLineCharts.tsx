import { LineChartComponent } from './LineChart';
import { LineChartCustomDotsComponent } from './LineChartCustomDots';
import { LineChartCustomLabelComponent } from './LineChartCustomLabel';
import { LineChartDotsComponent } from './LineChartDots';
import { LineChartDotsColorsComponent } from './LineChartDotsColors';
import { LineChartInteractiveComponent } from './LineChartInteractive';
import { LineChartLabelComponent } from './LineChartLabel';
import { LineChartLinearComponent } from './LineChartLinear';
import { LineChartMultipleComponent } from './LineChartMultiple';
import { LineChartStepComponent } from './LineChartStep';

const LineChartComponents = [
  <LineChartComponent key='line-chart' />,
  <LineChartCustomDotsComponent key='line-chart-custom-dots' />,
  <LineChartCustomLabelComponent key='line-chart-custom-label' />,
  <LineChartDotsComponent key='line-chart-dots' />,
  <LineChartDotsColorsComponent key='line-chart-dots-colors' />,
  <LineChartLabelComponent key='line-chart-label' />,
  <LineChartLinearComponent key='line-chart-linear' />,
  <LineChartMultipleComponent key='line-chart-multiple' />,
  <LineChartStepComponent key='line-chart-step' />,
];

export const AllLineChartsObject = {
  title: 'Line Charts',
  Components: LineChartComponents,
  Additional: <LineChartInteractiveComponent key='line-chart-interactive' />,
};
