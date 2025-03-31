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
  <LineChartComponent />,
  <LineChartCustomDotsComponent />,
  <LineChartCustomLabelComponent />,
  <LineChartDotsComponent />,
  <LineChartDotsColorsComponent />,
  <LineChartLabelComponent />,
  <LineChartLinearComponent />,
  <LineChartMultipleComponent />,
  <LineChartStepComponent />,
];

export const AllLineChartsObject = {
  title: 'Line Charts',
  Components: LineChartComponents,
  Additional: <LineChartInteractiveComponent />,
};
