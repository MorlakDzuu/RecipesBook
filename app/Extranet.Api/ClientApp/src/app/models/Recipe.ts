import { Ingredient } from "./ingredient";
import { Stage } from "./stage";

export class Recipe {
  id: number;
  title: string;
  description: string;
  authorLogin: string;
  likesCount: number;
  favoritesCount: number;
  cookingDuration: number;
  portionsCount: number;
  isLiked: boolean;
  isFavorite: boolean;
  isMyRecipe: boolean;
  tags: string[];
  photoUrl: string;
  ingredients: Ingredient[];
  stages: Stage[];
}
