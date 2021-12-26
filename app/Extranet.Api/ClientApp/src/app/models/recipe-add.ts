import { Ingredient } from "./Ingredient";
import { Stage } from "./stage";

export class RecipeAdd {
  title: string;
  description: string;
  cookingDuration: number;
  portionsCount: number;
  tags: string[];
  photoUrl: string;
  ingredients: Ingredient[];
  stages: Stage[];
}
