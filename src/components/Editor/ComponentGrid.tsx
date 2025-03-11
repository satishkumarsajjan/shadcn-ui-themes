'use client';

import { components } from '@/lib/components';
import Editor from './Editor';
import { useEffect, useState, useRef } from 'react';

const ComponentGrid = () => {
  const [mounted, setMounted] = useState(false);
  const [columns, setColumns] = useState(3);
  const containerRef = useRef<HTMLDivElement>(null);

  // This ensures the animation runs after initial render
  useEffect(() => {
    setMounted(true);
  }, []);

  // Adjust grid columns based on container width
  useEffect(() => {
    if (!containerRef.current) return;

    // Store the current value of the ref in a variable
    const currentContainer = containerRef.current;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect.width;

        if (width < 768) {
          setColumns(1);
        } else if (width < 1200) {
          setColumns(2);
        } else {
          setColumns(3);
        }
      }
    });

    resizeObserver.observe(currentContainer);

    return () => {
      // Use the stored reference in the cleanup function
      resizeObserver.unobserve(currentContainer);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`grid gap-4 m-4 overflow-hidden`}
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
      }}
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
