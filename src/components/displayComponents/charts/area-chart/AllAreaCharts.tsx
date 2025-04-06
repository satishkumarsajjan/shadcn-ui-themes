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
  <AreaChartComponent key='area-chart' />,
  <AreaChartAxesComponent key='area-chart-axes' />,
  <AreaChartGradientComponent key='area-chart-gradient' />,
  <AreaChartIconsComponent key='area-chart-icons' />,
  <AreaChartLegendComponent key='area-chart-legend' />,
  <AreaChartLinearComponent key='area-chart-linear' />,
  <AreaChartStackedComponent key='area-chart-stacked' />,
  <AreaChartStackedExpandedComponent key='area-chart-stacked-expanded' />,
  <AreaChartStepComponent key='area-chart-step' />,
];

export const AllAreaChartsObject = {
  title: 'Area Charts',
  Components: AreaChartComponents,
  Additional: <AreaChartInteractiveComponent />,
};
