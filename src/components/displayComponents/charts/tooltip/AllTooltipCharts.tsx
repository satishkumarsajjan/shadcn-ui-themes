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
  <TooltipAdvancedComponent key='tooltip-advanced' />,
  <TooltipCustomlabelComponent key='tooltip-customlabel' />,
  <TooltipDefaultComponent key='tooltip-default' />,
  <TooltipFormatterComponent key='tooltip-formatter' />,
  <TooltipIconsComponent key='tooltip-icons' />,
  <TooltipLabelFormatterComponent key='tooltip-label-formatter' />,
  <TooltipLineIndicatorComponent key='tooltip-line-indicator' />,
  <TooltipNoIndicatorComponent key='tooltip-no-indicator' />,
  <TooltipNoLabelComponent key='tooltip-no-label' />,
];

// Export the components array for use in other files
export const AllTooltipChartObject = {
  title: 'Radial Charts',
  Components: TooltipChartComponents,
  Additional: null,
};
