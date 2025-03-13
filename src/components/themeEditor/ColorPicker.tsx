'use client';
import { useState, useEffect, useRef, memo } from 'react';
import { HslColor, HslColorPicker } from 'react-colorful';
import { Label } from '../ui/label';
import { Input } from '../ui/input';

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

// Convert Hex to HSL
const hexToHsl = (hex: string): HslColor => {
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
};

const ColorPicker = memo(({ swatchColor, onChange }: ColorPickerProps) => {
  // Use a ref to track if this is the initial render
  const isInitialRender = useRef(true);

  // Parse the initial color from the string
  const initialColor = parseHslString(swatchColor);

  // Set up local state for the color
  const [color, setColor] = useState<HslColor>(initialColor);

  // Set up state for hex value
  const [hexValue, setHexValue] = useState(() =>
    hslToHex(initialColor.h, initialColor.s, initialColor.l)
  );

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
      setHexValue(hslToHex(parsedColor.h, parsedColor.s, parsedColor.l));
    }
  }, [swatchColor]);

  // Handle color change from the picker
  const handleColorChange = (newColor: HslColor) => {
    setColor(newColor);
    setHexValue(hslToHex(newColor.h, newColor.s, newColor.l));

    // Notify parent component if callback exists
    if (onChange) {
      onChange(newColor);
    }
  };

  // Handle hex input change
  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHex = e.target.value;
    setHexValue(newHex);

    // Only update the HSL color if the hex value is valid
    if (/^#[0-9A-Fa-f]{6}$/.test(newHex)) {
      const newHslColor = hexToHsl(newHex);
      setColor(newHslColor);

      // Notify parent component if callback exists
      if (onChange) {
        onChange(newHslColor);
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
          pattern='^#[0-9A-Fa-f]{6}$'
        />
      </div>
    </div>
  );
});

ColorPicker.displayName = 'ColorPicker';

export default ColorPicker;
