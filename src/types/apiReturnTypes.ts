import { Theme, ThemeMode } from '@prisma/client';

// Tag model
export interface Tag {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export type ThemeTagWithDetails = {
  tag: {
    name: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
  };
} & {
  id: string;
  themeId: string;
  tagId: string;
  createdAt: Date;
  updatedAt: Date;
};

// Junction table between themes and tags
export interface ThemeTag {
  id: string;
  themeId: string;
  tagId: string;
  createdAt: Date;
  updatedAt: Date;
}
// Base theme type from the database with counts
export type ThemeWithCounts = Theme & {
  modes: ThemeMode[];
  _count: {
    likes: number;
    dislikes: number;
    bookmarks: number;
  };
  tags: Tag[]; 
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

export interface UpdateModeResponse {
  message: string;
  mode: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    mode: string;
    themeId: string;
    content: string;
  };
}
