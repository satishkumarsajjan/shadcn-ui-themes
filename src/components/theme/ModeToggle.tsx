'use client';

import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { customThemes, customThemeType } from '@/lib/themes';
import { useEffect, useState } from 'react';

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState<customThemeType | null>(
    customThemes[0] || {}
  );

  // Find and update the current theme whenever the theme changes
  useEffect(() => {
    if (theme) {
      const themeIndex = customThemes.findIndex((t) => t.mode === theme);
      if (themeIndex !== -1) {
        setCurrentTheme(customThemes[themeIndex]);
      } else {
        setCurrentTheme(null);
      }
    }
  }, [theme]);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='outline'
          size='sm'
          className='flex w-full justify-between px-2'
        >
          {currentTheme ? <span>{currentTheme.icon}</span> : <span>🖥️</span>}
          <span>
            {theme === 'system' ? 'System' : currentTheme?.label || theme}
          </span>
          <span className='sr-only'>Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        {customThemes.map((theme, index) => (
          <DropdownMenuItem key={index} onClick={() => setTheme(theme.mode)}>
            {theme.label}
          </DropdownMenuItem>
        ))}
        <DropdownMenuItem onClick={() => setTheme('system')}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
