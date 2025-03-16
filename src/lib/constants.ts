import { ThemeSortBy, ThemeTimeframe } from "@/types/ThemeFilters"

export const DEFAULT_THEME = `
--background: 20 14.3% 4.1%;
--foreground: 60 9.1% 97.8%;
--card: 20 14.3% 4.1%;
--card-foreground: 60 9.1% 97.8%;
--popover: 20 14.3% 4.1%;
--popover-foreground: 60 9.1% 97.8%;
--primary: 60 9.1% 97.8%;
--primary-foreground: 24 9.8% 10%;
--secondary: 12 6.5% 15.1%;
--secondary-foreground: 60 9.1% 97.8%;
--muted: 12 6.5% 15.1%;
--muted-foreground: 24 5.4% 63.9%;
--accent: 12 6.5% 15.1%;
--accent-foreground: 60 9.1% 97.8%;
--destructive: 0 62.8% 30.6%;
--destructive-foreground: 60 9.1% 97.8%;
--border: 12 6.5% 15.1%;
--input: 12 6.5% 15.1%;
--ring: 24 5.7% 82.9%;
--chart-1: 220 70% 50%;
--chart-2: 160 60% 45%;
--chart-3: 30 80% 55%;
--chart-4: 280 65% 60%;
--chart-5: 340 75% 55%;
--sidebar-background: 240 5.9% 10%;
--sidebar-foreground: 240 4.8% 95.9%;
--sidebar-primary: 224.3 76.3% 48%;
--sidebar-primary-foreground: 0 0% 100%;
--sidebar-accent: 240 3.7% 15.9%;
--sidebar-accent-foreground: 240 4.8% 95.9%;
--sidebar-border: 240 3.7% 15.9%;
--sidebar-ring: 217.2 91.2% 59.8%;
`

// Updated sort options to match the ThemeSortBy type
export const ThemeSortByValues: ThemeSortBy[] = ["newest", "oldest", "popular", "alphabetical"]

// Updated timeframe options to match the ThemeTimeframe type
export const ThemeTimeFrameValues: ThemeTimeframe[] = ["all", "today", "week", "month", "year"]

export const DEFAULT_THEME_COLORS = ['#0c0a09','#fafaf9','#292524','#a8a29e','#292524','#d6d3d1']