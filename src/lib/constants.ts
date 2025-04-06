import { ThemeSortBy, ThemeTimeframe } from "@/types/ThemeFilters"

export const DEFAULT_THEME = `
--background: 33 100% 98%;
--foreground: 20 73% 16%;
--card: 33 100% 97%;
--card-foreground: 20 73% 16%;
--popover: 33 100% 97%;
--popover-foreground: 20 73% 16%;
--primary: 24 94% 53%;
--primary-foreground: 60 9.1% 97.8%;
--secondary: 33 100% 94%;
--secondary-foreground: 20 63% 30%;
--muted: 33 50% 94%;
--muted-foreground: 20 33% 44.7%;
--accent: 15 80% 91%;
--accent-foreground: 20 63% 30%;
--destructive: 0 84.2% 60.2%;
--destructive-foreground: 60 9.1% 97.8%;
--border: 33 30% 90%;
--input: 33 30% 90%;
--ring: 24 94% 53%;
--chart-1: 24 94% 53%;
--chart-2: 15 80% 45%;
--chart-3: 20 73% 28%;
--chart-4: 33 90% 55%;
--chart-5: 27 87% 67%;
--sidebar-background: 33 100% 97%;
--sidebar-foreground: 20 63% 25%;
--sidebar-primary: 24 94% 53%;
--sidebar-primary-foreground: 60 9.1% 97.8%;
--sidebar-accent: 15 80% 91%;
--sidebar-accent-foreground: 20 63% 30%;
--sidebar-border: 33 40% 88%;
--sidebar-ring: 24 94% 53%;
--radius: 0.5rem;
`

// Updated sort options to match the ThemeSortBy type
export const ThemeSortByValues: ThemeSortBy[] = ["newest", "oldest", "popular", "alphabetical"]

// Updated timeframe options to match the ThemeTimeframe type
export const ThemeTimeFrameValues: ThemeTimeframe[] = ["all", "today", "week", "month", "year"]

export const DEFAULT_THEME_COLORS = ['#0c0a09','#fafaf9','#292524','#a8a29e','#292524','#d6d3d1']