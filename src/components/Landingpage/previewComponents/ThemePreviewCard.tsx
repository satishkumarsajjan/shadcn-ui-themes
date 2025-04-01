'use client';
import Buttons from '@/components/displayComponents/simpletons/Buttons';
import { SliderDemo } from '@/components/displayComponents/simpletons/SliderDemo';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { motion } from 'framer-motion';

import { RadioGroupDemo } from '@/components/displayComponents/simpletons/RadioGroupDemo';
interface ThemePreviewCardProps {
  classname: string;
  title: string;
  colors: string[];
}

const ThemePreviewCard = ({
  classname,
  colors,
  title,
}: ThemePreviewCardProps) => {
  return (
    <Card className={classname}>
      <CardHeader>
        <CardTitle className='flex items-center justify-between'>
          <span className='inline-flex items-center rounded-md px-3 py-1 bg-neutral-300 bg-opacity-10'>
            <span className='text-xs font-medium'> {title}</span>
          </span>
          <div className='flex gap-1.5'>
            <div className='h-3 w-3 rounded-full bg-red-500' />
            <div className='h-3 w-3 rounded-full bg-yellow-500' />
            <div className='h-3 w-3 rounded-full bg-green-500' />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col items-center justify-center gap-4'>
        <Buttons />
        <span className='flex gap-4 w-full'>
          <SliderDemo />
          <RadioGroupDemo />
        </span>
      </CardContent>
      <CardFooter>
        <div className='flex flex-wrap gap-2'>
          {colors.map((color, index) => (
            <motion.div
              key={index}
              className='group flex flex-col items-center'
              whileHover={{ y: -2 }}
            >
              <div
                className='h-8 w-8 rounded-md'
                style={{
                  backgroundColor: color,
                  opacity: index === 3 ? 0.5 : 1,
                }}
              />
            </motion.div>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ThemePreviewCard;
