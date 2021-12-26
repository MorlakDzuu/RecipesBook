export class RecipeCard {
  id: number;
  title: string;
  description: string;
  cookingDuration: number;
  portionsCount: number;
  photoUrl: string;
  favoritesCount: number;
  likesCount: number;
  tags: string[];
  isLiked: boolean;
  isFavorite: boolean;
  authorLogin: string;

  constructor() { }
}
