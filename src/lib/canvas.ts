// src/lib/canvas.ts
import { createCanvas, loadImage, Canvas } from 'canvas';
import { siteConfig } from '@/config/site';
import path from 'path';
import { JSDOM } from 'jsdom';
import OgImageGenerator from '@/components/OgImageGenerator';
import { renderToStaticMarkup } from 'react-dom/server';

export async function generateImage(title: string, description: string) {
  const width = 1200;
  const height = 630;

  // Create a new JSDOM instance
  const dom = new JSDOM('<!DOCTYPE html><html><head></head><body></body></html>');
  global.document = dom.window.document;
  global.window = dom.window as any;
  global.navigator = dom.window.navigator;

  // Render the OgImageGenerator component to static markup
  const element = OgImageGenerator({ title, description });
  const markup = renderToStaticMarkup(element);

  // Create a new canvas
  const canvas = createCanvas(width, height);
  const context = canvas.getContext('2d');

  // Draw the markup onto the canvas
  const drawMarkup = (markup: string, canvas: Canvas, context: any) => {
    const dom = new JSDOM(`<!DOCTYPE html><html><head></head><body>${markup}</body></html>`);
    const body = dom.window.document.body;

    const style = dom.window.document.createElement('style');
    style.textContent = `
      body {
        margin: 0;
        padding: 0;
      }
      * {
        box-sizing: border-box;
      }
    `;
    dom.window.document.head.appendChild(style);

    const div = body.querySelector('div');
    const computedStyle = dom.window.getComputedStyle(div);
    const styles = Object.fromEntries(
      Object.values(computedStyle).map((key) => [key, computedStyle.getPropertyValue(key)])
    );
    const backgroundColor = styles.backgroundColor;
    const backgroundImage = styles.backgroundImage;

    if (backgroundColor && backgroundColor !== 'rgba(0, 0, 0, 0)') {
      context.fillStyle = backgroundColor;
      context.fillRect(0, 0, width, height);
    }

    if (backgroundImage && backgroundImage !== 'none') {
      const gradient = context.createLinearGradient(0, 0, width, height);
      const colors = backgroundImage.match(/#([0-9a-fA-F]{6})/g) || [];
      const stops = [0, 0.14, 0.28, 0.42, 0.56, 0.70, 0.84, 1];
      for (let i = 0; i < colors.length; i++) {
        gradient.addColorStop(stops[i], colors[i]);
      }
      context.fillStyle = gradient;
      context.fillRect(0, 0, width, height);
    }
  };
  drawMarkup(markup, canvas, context);

  // Convert the canvas to a PNG buffer
  const buffer = canvas.toBuffer('image/png');
  return buffer;
}
