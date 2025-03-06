import { Theme, ThemeMode } from '@prisma/client';

// Base theme type from the database with counts
export type ThemeWithCounts = Theme & {
  modes: ThemeMode[];
  _count: {
    likes: number;
    dislikes: number;
    bookmarks: number;
  };
};

// Theme with user interaction data
export type ThemeWithUserActions = ThemeWithCounts & {
  isLiked: boolean;
  isDisliked: boolean;
  isBookmarked: boolean;
};

// Response types for the getThemeById API
export type GetThemeByIdResponse = {
  theme: ThemeWithCounts | ThemeWithUserActions;
};
// export interface ThemeMode {
//   id: string;
//   mode: string;
//   themeId: string;
//   content: string;
//   createdAt: Date;
//   updatedAt: Date;
// }

// export interface Theme {
//   id: string;
//   title: string;
//   description?: string;
//   userId: string;
//   createdAt: Date;
//   updatedAt: Date;
//   modes: ThemeMode[];
//   _count: {
//     likes: number;
//     dislikes: number;
//     bookmarks: number;
//   };
//   isLiked: boolean;
//   isDisliked: boolean;
//   isBookmarked: boolean;
// }

export interface ThemesResponse {
  themes: ThemeWithUserActions[];
  totalCount: number;
}