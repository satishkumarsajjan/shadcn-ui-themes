'use client';

import { components } from '@/lib/components';
import Editor from './Editor';
import { useEffect, useState } from 'react';

interface ComponentGridProps {}

const ComponentGrid = ({}: ComponentGridProps) => {
  const [mounted, setMounted] = useState(false);

  // This ensures the animation runs after initial render
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 
                 gap-4 m-4 overflow-hidden'
    >
      {components.map((component, index) => (
        <div
          key={index}
          className={`transform ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          } 
                     transition-all duration-500 ease-in-out`}
          style={{
            transitionDelay: `${index * 50}ms`,
          }}
        >
          <Editor initialCode={component.initialCode} scope={component.scope} />
        </div>
      ))}
    </div>
  );
};

export default ComponentGrid;
