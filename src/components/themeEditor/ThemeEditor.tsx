'use client';

import { useEffect, useRef, useState } from 'react';
import ComponentGrid from '@/components/Editor/ComponentGrid';

function ThemeEditor({ id }: { id: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const inputString = `
    --background: 37 97.1% 98.48%;
    --foreground: 37 4.2% 0.96%;

    --muted: 37 4.2% 92.4%;
    --muted-foreground: 37 2.1% 42.4%;

    --popover: 37 56.4% 92.4%;
    --popover-foreground: 37 4.2% 1.2%;

    --card: 37 56.4% 92.4%;
    --card-foreground: 37 4.2% 1.2%;

    --border: 37 9.2% 89.96%;
    --input: 37 9.2% 89.96%;

    --primary: 37 42% 24%;
    --primary-foreground: 37 0.84% 92.4%;

    --secondary: 37 2.1% 96.2%;
    --secondary-foreground: 37 3.52% 12.4%;

    --accent: 37 2.1% 96.2%;
    --accent-foreground: 37 3.52% 12.4%;

    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;

    --ring: 37 42% 24%;

    --radius: 0.5rem;
    --chart-1: 12 76% 61%;
    --chart-2: 173 58% 39%;
    --chart-3: 197 37% 24%;
    --chart-4: 43 74% 66%;
    --chart-5: 27 87% 67%;
`;

    const convertToJSON = (str: string) => {
      const regex = /(--[\w-]+):\s([^;]+);/g;
      let match;
      const result: { [key: string]: string } = {};

      while ((match = regex.exec(str)) !== null) {
        const key = match[1]; // Keep the -- prefix in the key
        const value = match[2].trim();

        result[key] = value;
      }

      return result;
    };

    const jsonResult = convertToJSON(inputString);

    // Create a style element for scoped styles
    const styleElement = document.createElement('style');

    // Generate CSS with higher specificity using the container's class
    let cssText = `.theme-editor-${id} {`;
    for (const [key, value] of Object.entries(jsonResult)) {
      cssText += `\n  ${key}: ${value};`;
    }
    cssText += '\n}';

    // Add styles that will override any card styles within this component
    cssText += `\n.theme-editor-${id} .card {
      border-color: hsl(var(--border)) !important;
    }`;

    styleElement.textContent = cssText;
    document.head.appendChild(styleElement);

    // Cleanup function to remove the style element when component unmounts
    return () => {
      document.head.removeChild(styleElement);
    };
  }, [id]);

  return (
    <div ref={containerRef} className={`theme-editor-${id}`}>
      <ComponentGrid />
    </div>
  );
}

export default ThemeEditor;
