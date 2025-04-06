import { RadarChartComponent } from './RadarChart';
import { RadarChartCustomLabelComponent } from './RadarChartCustomLabel';
import { RadarChartDotsComponent } from './RadarChartDots';
import { RadarChartGridCircleComponent } from './RadarChartGridCircle';
import { RadarChartGridCircleFilledComponent } from './RadarChartGridCircleFilled';
import { RadarChartGridCircleNolinesComponent } from './RadarChartGridCircleNolines';
import { RadarChartGridCustomComponent } from './RadarChartGridCustom';
import { RadarChartGridFilledComponent } from './RadarChartGridFilled';
import { RadarChartGridNoneComponent } from './RadarChartGridNone';
import { RadarChartIconsComponent } from './RadarChartIcons';
import { RadarChartLegendComponent } from './RadarChartLegend';
import { RadarChartLinesOnlyComponent } from './RadarChartLinesOnly';
import { RadarChartMultipleComponent } from './RadarChartMultiple';
import { RadarChartRadiusAxisComponent } from './RadarChartRadiusAxis';

const RadarChartComponents = [
  <RadarChartComponent key='radar-chart' />,
  <RadarChartRadiusAxisComponent key='radar-chart-radius-axis' />,
  <RadarChartCustomLabelComponent key='radar-chart-custom-label' />,
  <RadarChartDotsComponent key='radar-chart-dots' />,
  <RadarChartGridCircleComponent key='radar-chart-grid-circle' />,
  <RadarChartGridCircleFilledComponent key='radar-chart-grid-circle-filled' />,
  <RadarChartGridCircleNolinesComponent key='radar-chart-grid-circle-nolines' />,
  <RadarChartGridCustomComponent key='radar-chart-grid-custom' />,
  <RadarChartGridFilledComponent key='radar-chart-grid-filled' />,
  <RadarChartGridNoneComponent key='radar-chart-grid-none' />,
  <RadarChartIconsComponent key='radar-chart-icons' />,
  <RadarChartLegendComponent key='radar-chart-legend' />,
  <RadarChartLinesOnlyComponent key='radar-chart-lines-only' />,
  <RadarChartMultipleComponent key='radar-chart-multiple' />,
];

export const AllRadarChartsObject = {
  title: 'Radar Charts',
  Components: RadarChartComponents,
  Additional: null,
};
