'use client';
import { useState, useEffect, useRef, memo } from 'react';
import { HslColor, HslColorPicker } from 'react-colorful';
import { Label } from '../ui/label';
import { Input } from '../ui/input';

interface ColorPickerProps {
  swatchColor: string; // Now expects a hex color string like "#ff0000"
  onChange?: (hexColor: string) => void; // Now returns a hex color string
}

// Convert Hex to HSL
const hexToHsl = (hex: string): HslColor => {
  try {
    // Remove # if present
    hex = hex.replace(/^#/, '');

    // Parse the hex values
    let r = 0,
      g = 0,
      b = 0;
    if (hex.length === 3) {
      r = parseInt(hex[0] + hex[0], 16);
      g = parseInt(hex[1] + hex[1], 16);
      b = parseInt(hex[2] + hex[2], 16);
    } else if (hex.length === 6) {
      r = parseInt(hex.substring(0, 2), 16);
      g = parseInt(hex.substring(2, 4), 16);
      b = parseInt(hex.substring(4, 6), 16);
    }

    // Convert RGB to HSL
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0,
      s = 0,
      l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }

      h *= 60;
    }

    return { h, s: s * 100, l: l * 100 };
  } catch (error) {
    console.error('Failed to parse hex color:', error);
    return { h: 0, s: 0, l: 0 }; // Default color
  }
};

// Convert HSL to Hex
const hslToHex = (h: number, s: number, l: number): string => {
  s /= 100;
  l /= 100;

  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
};

// Convert HslColor object to HSL string format (for display purposes)
const hslColorToString = (color: HslColor): string => {
  return `${Math.round(color.h)} ${Math.round(color.s)}% ${Math.round(
    color.l
  )}%`;
};

// Validate and format hex color
const formatHexColor = (hex: string): string => {
  // Ensure hex starts with #
  if (!hex.startsWith('#')) {
    hex = '#' + hex;
  }

  // If it's a short hex (#RGB), convert to full form (#RRGGBB)
  if (hex.length === 4) {
    const r = hex[1];
    const g = hex[2];
    const b = hex[3];
    hex = `#${r}${r}${g}${g}${b}${b}`;
  }

  return hex;
};

// Check if a string is a valid hex color
const isValidHex = (hex: string): boolean => {
  return /^#?([0-9A-Fa-f]{3}){1,2}$/.test(hex);
};

const ColorPickerHex = memo(({ swatchColor, onChange }: ColorPickerProps) => {
  // Use a ref to track if this is the initial render
  const isInitialRender = useRef(true);

  // Format and validate the initial hex color
  const formattedInitialHex = isValidHex(swatchColor)
    ? formatHexColor(swatchColor)
    : '#000000'; // Default to black if invalid

  // Convert hex to HSL for the color picker
  const initialHslColor = hexToHsl(formattedInitialHex);

  // Set up local state for the color
  const [color, setColor] = useState<HslColor>(initialHslColor);

  // Set up state for hex value
  const [hexValue, setHexValue] = useState(formattedInitialHex);

  // Update local state when prop changes, but only if it's not from our own onChange
  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    // Only update if the hex value is valid and different from current
    if (isValidHex(swatchColor) && formatHexColor(swatchColor) !== hexValue) {
      const formattedHex = formatHexColor(swatchColor);
      setHexValue(formattedHex);
      setColor(hexToHsl(formattedHex));
    }
  }, [swatchColor, hexValue]);

  // Handle color change from the picker
  const handleColorChange = (newColor: HslColor) => {
    setColor(newColor);
    const newHex = hslToHex(newColor.h, newColor.s, newColor.l);
    setHexValue(newHex);

    // Notify parent component with the hex value
    if (onChange) {
      onChange(newHex);
    }
  };

  // Handle hex input change
  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHex = e.target.value;
    setHexValue(newHex);

    // Only update the HSL color if the hex value is valid
    if (isValidHex(newHex)) {
      const formattedHex = formatHexColor(newHex);
      const newHslColor = hexToHsl(formattedHex);
      setColor(newHslColor);

      // Notify parent component with the formatted hex value
      if (onChange) {
        onChange(formattedHex);
      }
    }
  };

  return (
    <div>
      <HslColorPicker color={color} onChange={handleColorChange} />
      <div className='mt-2 space-y-1'>
        <Label>HSL: {hslColorToString(color)}</Label>
      </div>
      <div className='mt-2'>
        <Label htmlFor='hex-color'>Hex:</Label>
        <Input
          id='hex-color'
          type='text'
          value={hexValue}
          onChange={handleHexChange}
          className='mt-1'
          placeholder='#000000'
        />
      </div>
    </div>
  );
});

ColorPickerHex.displayName = 'ColorPickerHex';

export default ColorPickerHex;
