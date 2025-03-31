import { TooltipAdvancedComponent } from './TooltipAdvanced';
import { TooltipCustomlabelComponent } from './TooltipCustomlabel';
import { TooltipDefaultComponent } from './TooltipDefault';
import { TooltipFormatterComponent } from './TooltipFormatter';
import { TooltipIconsComponent } from './TooltipIcons';
import { TooltipLabelFormatterComponent } from './TooltipLabelFormatter';
import { TooltipLineIndicatorComponent } from './TooltipLineIndicator';
import { TooltipNoIndicatorComponent } from './TooltipNoIndicator';
import { TooltipNoLabelComponent } from './TooltipNoLabel';

const TooltipChartComponents = [
  <TooltipAdvancedComponent />,
  <TooltipCustomlabelComponent />,
  <TooltipDefaultComponent />,
  <TooltipFormatterComponent />,
  <TooltipIconsComponent />,
  <TooltipLabelFormatterComponent />,
  <TooltipLineIndicatorComponent />,
  <TooltipNoIndicatorComponent />,
  <TooltipNoLabelComponent />,
];

export const AllTooltipChartObject = {
  title: 'Tooltip Charts',
  Components: TooltipChartComponents,
  Additional: null,
};
