import { RadarChartComponent } from './RadarChart';
import { RadarChartCustomLabelComponent } from './RadarChartCustom Label';
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
  <RadarChartComponent />,
  <RadarChartRadiusAxisComponent />,
  <RadarChartCustomLabelComponent />,
  <RadarChartDotsComponent />,
  <RadarChartGridCircleComponent />,
  <RadarChartGridCircleFilledComponent />,
  <RadarChartGridCircleNolinesComponent />,
  <RadarChartGridCustomComponent />,
  <RadarChartGridFilledComponent />,
  <RadarChartGridNoneComponent />,
  <RadarChartIconsComponent />,
  <RadarChartLegendComponent />,
  <RadarChartLinesOnlyComponent />,
  <RadarChartMultipleComponent />,
];

export const AllRadarChartsObject = {
  title: 'Radar Charts',
  Components: RadarChartComponents,
  Additional: null,
};
