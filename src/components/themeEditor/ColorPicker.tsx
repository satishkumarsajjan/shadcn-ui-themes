'use client';
import { useState, useEffect, useRef, memo } from 'react';
import { HslColor, HslColorPicker } from 'react-colorful';
import { Label } from '../ui/label';

interface ColorPickerProps {
  swatchColor: string;
  onChange?: (color: HslColor) => void;
}

// Parse HSL string to HslColor object
const parseHslString = (hslString: string): HslColor => {
  // Handle HSL strings in format "hsl(h s% l%)" or just "h s% l%"
  const cleanHsl = hslString.replace('hsl(', '').replace(')', '');
  const [h, s, l] = cleanHsl.split(' ').map((part) => {
    // Remove percentage sign and convert to number
    return parseFloat(part.replace('%', ''));
  });

  return { h, s, l };
};

// Convert HslColor object to HSL string format
const hslColorToString = (color: HslColor): string => {
  return `${Math.round(color.h)} ${Math.round(color.s)}% ${Math.round(
    color.l
  )}%`;
};

const ColorPicker = memo(({ swatchColor, onChange }: ColorPickerProps) => {
  // Use a ref to track if this is the initial render
  const isInitialRender = useRef(true);

  // Parse the initial color from the string
  const initialColor = parseHslString(swatchColor);

  // Set up local state for the color
  const [color, setColor] = useState<HslColor>(initialColor);

  // Update local state when prop changes, but only if it's not from our own onChange
  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    // Compare current color with new prop to avoid unnecessary updates
    const parsedColor = parseHslString(swatchColor);
    const currentColorStr = hslColorToString(color);
    const newColorStr = hslColorToString(parsedColor);

    // Only update if the colors are different
    if (currentColorStr !== newColorStr) {
      setColor(parsedColor);
    }
  }, [swatchColor]);

  // Handle color change from the picker
  const handleColorChange = (newColor: HslColor) => {
    setColor(newColor);

    // Notify parent component if callback exists
    if (onChange) {
      onChange(newColor);
    }
  };

  return (
    <div>
      <HslColorPicker color={color} onChange={handleColorChange} />
      <div className='mt-2 space-y-1'>
        <Label>HSL: {hslColorToString(color)}</Label>
      </div>
    </div>
  );
});

ColorPicker.displayName = 'ColorPicker';

export default ColorPicker;
