/**
 * Utility to generate aesthetic theme modes from a base hex color.
 *
 * Each generated mode (light, dark, pastel, vivid) returns an object 
 * with keys defined in the format: "H S% L%".
 *
 * NOTE: The conversion from hex to HSL returns values:
 *   - hue in [0, 360)
 *   - saturation and lightness in percentages (0-100)
 *
 * You can adjust the transformation parameters to achieve the desired aesthetics.
 */

/**
 * Converts a hex color (e.g. "#af52de") to an { h, s, l } object.
 */
function hexToHSL(hex: string): { h: number; s: number; l: number } {
  // Remove any leading '#' if present
  hex = hex.replace(/^#/, '');
  if (hex.length === 3) {
    hex = hex.split('').map(ch => ch + ch).join('');
  }
  const num = parseInt(hex, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;
  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const delta = max - min;
    s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);
    if (max === rNorm) {
      h = (gNorm - bNorm) / delta + (gNorm < bNorm ? 6 : 0);
    } else if (max === gNorm) {
      h = (bNorm - rNorm) / delta + 2;
    } else {
      h = (rNorm - gNorm) / delta + 4;
    }
    h *= 60;
  }
  return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) };
}

/**
 * Helper to format a theme property into the "H S% L%" string.
 */
function formatHSL(h: number, s: number, l: number): string {
  return `${h} ${s}% ${l}%`;
}

/**
 * Generates four aesthetic theme modes from a base hex color.
 *
 * The returned object has four properties: light, dark, pastel, vivid.
 */
function generateAestheticThemes(baseHex: string) {
  // Convert the base hex color to HSL
  const baseHSL = hexToHSL(baseHex);
  const baseHue = baseHSL.h;
  const baseSat = baseHSL.s;

  // Define helper adjustments for each mode.
  // Adjustments can be refined to achieve a beautifully contrasting set of themes.
  // For example, for the light mode we boost the lightness for backgrounds, 
  // whereas for dark mode we lower the lightness dramatically.

  // Light theme: vivid backgrounds and dark text
  const light = {
    '--background': formatHSL(baseHue, Math.round(baseSat * 0.3), 98),
    '--foreground': formatHSL((baseHue + 5) % 360, 90, 5),
    '--card': formatHSL(baseHue, Math.round(baseSat * 0.3), 98),
    '--card-foreground': formatHSL((baseHue + 5) % 360, 90, 5),
    '--popover': formatHSL(baseHue, Math.round(baseSat * 0.3), 98),
    '--popover-foreground': formatHSL((baseHue + 5) % 360, 90, 5),
    '--primary': formatHSL((baseHue + 6) % 360, 96, 60),
    '--primary-foreground': formatHSL(baseHue, Math.round(baseSat * 0.3), 98),
    '--secondary': formatHSL((baseHue + 5) % 360, 30, 90),
    '--secondary-foreground': formatHSL((baseHue + 5) % 360, 90, 5),
    '--muted': formatHSL((baseHue + 5) % 360, 30, 90),
    '--muted-foreground': formatHSL((baseHue + 5) % 360, 40, 40),
    '--accent': formatHSL((baseHue + 5) % 360, 30, 90),
    '--accent-foreground': formatHSL((baseHue + 5) % 360, 90, 5),
    '--destructive': '0 85% 60%',
    '--destructive-foreground': formatHSL(baseHue, Math.round(baseSat * 0.3), 98),
    '--border': formatHSL((baseHue + 5) % 360, 30, 85),
    '--input': formatHSL((baseHue + 5) % 360, 30, 85),
    '--ring': formatHSL((baseHue + 6) % 360, 96, 60),
    '--chart-1': formatHSL((baseHue + 6) % 360, 96, 60),
    '--chart-2': formatHSL((baseHue + 320) % 360, 70, 60),
    '--chart-3': '30 80% 60%',
    '--chart-4': formatHSL((baseHue + 280) % 360, 70, 65),
    '--chart-5': '200 75% 60%'
  };

  // Dark theme: low lightness for all backgrounds and high lightness for text
  const dark = {
    '--background': formatHSL(baseHue, Math.round(baseSat * 0.3), 10),
    '--foreground': formatHSL((baseHue + 5) % 360, 90, 95),
    '--card': formatHSL(baseHue, Math.round(baseSat * 0.3), 10),
    '--card-foreground': formatHSL((baseHue + 5) % 360, 90, 95),
    '--popover': formatHSL(baseHue, Math.round(baseSat * 0.3), 10),
    '--popover-foreground': formatHSL((baseHue + 5) % 360, 90, 95),
    '--primary': formatHSL((baseHue + 6) % 360, 96, 40),
    '--primary-foreground': formatHSL(baseHue, Math.round(baseSat * 0.3), 98),
    '--secondary': formatHSL((baseHue + 5) % 360, 30, 20),
    '--secondary-foreground': formatHSL((baseHue + 5) % 360, 90, 95),
    '--muted': formatHSL((baseHue + 5) % 360, 30, 20),
    '--muted-foreground': formatHSL((baseHue + 5) % 360, 40, 50),
    '--accent': formatHSL((baseHue + 5) % 360, 30, 20),
    '--accent-foreground': formatHSL((baseHue + 5) % 360, 90, 95),
    '--destructive': '0 85% 60%',
    '--destructive-foreground': formatHSL(baseHue, Math.round(baseSat * 0.3), 98),
    '--border': formatHSL((baseHue + 5) % 360, 30, 25),
    '--input': formatHSL((baseHue + 5) % 360, 30, 25),
    '--ring': formatHSL((baseHue + 6) % 360, 96, 40),
    '--chart-1': formatHSL((baseHue + 6) % 360, 96, 40),
    '--chart-2': formatHSL((baseHue + 320) % 360, 70, 40),
    '--chart-3': '30 80% 40%',
    '--chart-4': formatHSL((baseHue + 280) % 360, 70, 45),
    '--chart-5': '200 75% 40%'
  };

  // Pastel theme: very light with soft saturation
  const pastel = {
    '--background': formatHSL(baseHue, Math.round(baseSat * 0.2), 95),
    '--foreground': formatHSL((baseHue + 5) % 360, 80, 15),
    '--card': formatHSL(baseHue, Math.round(baseSat * 0.2), 95),
    '--card-foreground': formatHSL((baseHue + 5) % 360, 80, 15),
    '--popover': formatHSL(baseHue, Math.round(baseSat * 0.2), 95),
    '--popover-foreground': formatHSL((baseHue + 5) % 360, 80, 15),
    '--primary': formatHSL((baseHue + 6) % 360, 80, 70),
    '--primary-foreground': formatHSL(baseHue, Math.round(baseSat * 0.2), 95),
    '--secondary': formatHSL((baseHue + 5) % 360, 20, 85),
    '--secondary-foreground': formatHSL((baseHue + 5) % 360, 80, 15),
    '--muted': formatHSL((baseHue + 5) % 360, 20, 85),
    '--muted-foreground': formatHSL((baseHue + 5) % 360, 30, 50),
    '--accent': formatHSL((baseHue + 5) % 360, 20, 85),
    '--accent-foreground': formatHSL((baseHue + 5) % 360, 80, 15),
    '--destructive': '0 85% 60%',
    '--destructive-foreground': formatHSL(baseHue, Math.round(baseSat * 0.2), 95),
    '--border': formatHSL((baseHue + 5) % 360, 20, 80),
    '--input': formatHSL((baseHue + 5) % 360, 20, 80),
    '--ring': formatHSL((baseHue + 6) % 360, 80, 70),
    '--chart-1': formatHSL((baseHue + 6) % 360, 80, 70),
    '--chart-2': formatHSL((baseHue + 320) % 360, 70, 70),
    '--chart-3': '30 80% 70%',
    '--chart-4': formatHSL((baseHue + 280) % 360, 70, 75),
    '--chart-5': '200 75% 70%'
  };

  // Vivid theme: saturated colors with medium lightness
  const vivid = {
    '--background': formatHSL(baseHue, Math.min(Math.round(baseSat * 1.2), 100), 50),
    '--foreground': formatHSL((baseHue + 5) % 360, 100, 10),
    '--card': formatHSL(baseHue, Math.min(Math.round(baseSat * 1.2), 100), 50),
    '--card-foreground': formatHSL((baseHue + 5) % 360, 100, 10),
    '--popover': formatHSL(baseHue, Math.min(Math.round(baseSat * 1.2), 100), 50),
    '--popover-foreground': formatHSL((baseHue + 5) % 360, 100, 10),
    '--primary': formatHSL((baseHue + 6) % 360, 100, 60),
    '--primary-foreground': formatHSL(baseHue, Math.min(Math.round(baseSat * 1.2), 100), 50),
    '--secondary': formatHSL((baseHue + 5) % 360, 40, 90),
    '--secondary-foreground': formatHSL((baseHue + 5) % 360, 100, 10),
    '--muted': formatHSL((baseHue + 5) % 360, 40, 90),
    '--muted-foreground': formatHSL((baseHue + 5) % 360, 50, 40),
    '--accent': formatHSL((baseHue + 5) % 360, 40, 90),
    '--accent-foreground': formatHSL((baseHue + 5) % 360, 100, 10),
    '--destructive': '0 85% 60%',
    '--destructive-foreground': formatHSL(baseHue, Math.min(Math.round(baseSat * 1.2), 100), 50),
    '--border': formatHSL((baseHue + 5) % 360, 40, 85),
    '--input': formatHSL((baseHue + 5) % 360, 40, 85),
    '--ring': formatHSL((baseHue + 6) % 360, 100, 60),
    '--chart-1': formatHSL((baseHue + 6) % 360, 100, 60),
    '--chart-2': formatHSL((baseHue + 320) % 360, 70, 60),
    '--chart-3': '30 80% 60%',
    '--chart-4': formatHSL((baseHue + 280) % 360, 70, 65),
    '--chart-5': '200 75% 60%'
  };

  return {
    light,
    dark,
    pastel,
    vivid
  };
}

function convertCssObjectToStringConcise(obj: Record<string, string>): string {
  return Object.entries(obj)
    .map(([key, value]) => `${key.replace(/['"]/g, '')}: ${value.toString().replace(/['"]/g, '')};`)
    .join('\n\n');
}

// Example usage:
const themes = generateAestheticThemes("#6A9113");
console.log("LIGHT:", convertCssObjectToStringConcise(themes.light));
// console.log("DARK:", themes.dark);
// console.log("PASTEL:", themes.pastel);
// console.log("VIVID:", themes.vivid);