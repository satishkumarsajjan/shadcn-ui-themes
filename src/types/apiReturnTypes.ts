export interface ThemeMode {
  id: string;
  mode: string;
  themeId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Theme {
  id: string;
  title: string;
  description?: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  modes: ThemeMode[];
  _count: {
    likes: number;
    dislikes: number;
    bookmarks: number;
  };
  isLiked: boolean;
  isDisliked: boolean;
  isBookmarked: boolean;
}

export interface ThemesResponse {
  themes: Theme[];
  totalCount: number;
}