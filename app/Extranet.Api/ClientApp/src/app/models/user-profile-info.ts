import { RecipeCard } from "./recipe-card";

export class UserProfileInfo {
  public name: string;
  public login: string;
  public description: string;
  public password: string;
  public recipesCount: number;
  public likesCount: number;
  public favoritesCount: number;
  public recipes: RecipeCard[];
}
