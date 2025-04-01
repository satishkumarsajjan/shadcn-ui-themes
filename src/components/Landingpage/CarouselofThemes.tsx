import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { CardsActivityGoal } from '../displayComponents/activity-goal';
import { CardsCalendar } from '../displayComponents/calendar';
import { AreaChartGradientComponent } from '../displayComponents/charts/area-chart/AreaChartGradient';
import { BarChartLabelComponent } from '../displayComponents/charts/bar-chart/BarChartLabel';
import { PieChartInteractiveComponent } from '../displayComponents/charts/pie-chart/PieChartInteractive';
import { RadarChartGridCircleFilledComponent } from '../displayComponents/charts/radar-chart/RadarChartGridCircleFilled';
import { RadialChartComponent } from '../displayComponents/charts/radial-chart/RadialChart';
import { CardsChat } from '../displayComponents/chat';
import { MenubarDemo } from '../displayComponents/simpletons/MenubarDemo';
import { RadioGroupDemo } from '../displayComponents/simpletons/RadioGroupDemo';
import { SeparatorDemo } from '../displayComponents/simpletons/SeparatorDemo';
import { ToggleGroupDemo } from '../displayComponents/simpletons/ToggleGroupDemo';

export function CarouselofThemes() {
  return (
    <Carousel
      className='w-full'
      plugins={[
        Autoplay({
          delay: 3000,
        }),
      ]}
    >
      <CarouselContent>
        <CarouselItem className='flex items-center justify-center'>
          <div className='mb-6 rounded-lg border p-4 bg-card grid grid-cols-2 gap-4'>
            <RadialChartComponent />
            <BarChartLabelComponent />
          </div>
        </CarouselItem>
        <CarouselItem className='flex items-center justify-center'>
          <div className='mb-6 rounded-lg border p-4 bg-card grid grid-cols-2 gap-4'>
            <RadioGroupDemo />
            <SeparatorDemo />
            <MenubarDemo />
            <ToggleGroupDemo />
          </div>
        </CarouselItem>
        <CarouselItem className='flex items-center justify-center'>
          <div className='mb-6 rounded-lg border p-4 bg-card grid grid-cols-2 gap-4'>
            <CardsActivityGoal />
            <CardsCalendar />
          </div>
        </CarouselItem>
        <CarouselItem className='flex items-center justify-center'>
          <div className='mb-6 rounded-lg border p-4 bg-card grid grid-cols-2 gap-4'>
            <PieChartInteractiveComponent />
            <AreaChartGradientComponent />
          </div>
        </CarouselItem>
        <CarouselItem className='flex items-center justify-center'>
          <div className='mb-6 rounded-lg border p-4 bg-card grid grid-cols-2 gap-4'>
            <RadarChartGridCircleFilledComponent />
            <CardsChat />
          </div>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
}
