import { AreaChartComponent } from './AreaChart';
import { AreaChartAxesComponent } from './AreaChartAxes';
import { AreaChartGradientComponent } from './AreaChartGradient';
import { AreaChartIconsComponent } from './AreaChartIcons';
import { AreaChartInteractiveComponent } from './AreaChartInteractive';
import { AreaChartLegendComponent } from './AreaChartLegend';
import { AreaChartLinearComponent } from './AreaChartLinear';
import { AreaChartStackedComponent } from './AreaChartStacked';
import { AreaChartStackedExpandedComponent } from './AreaChartStackedExpanded';
import { AreaChartStepComponent } from './AreaChartStep';

const AreaChartComponents = [
  <AreaChartComponent />,
  <AreaChartAxesComponent />,
  <AreaChartGradientComponent />,
  <AreaChartIconsComponent />,
  <AreaChartLegendComponent />,
  <AreaChartLinearComponent />,
  <AreaChartStackedComponent />,
  <AreaChartStackedExpandedComponent />,
  <AreaChartStepComponent />,
];

export const AllAreaChartsObject = {
  title: 'Area Charts',
  Components: AreaChartComponents,
  Additional: <AreaChartInteractiveComponent />,
};
