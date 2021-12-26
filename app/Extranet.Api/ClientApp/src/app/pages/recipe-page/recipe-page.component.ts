import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../../models/Recipe';
import { RecipeCard } from '../../models/recipe-card';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-recipe-page',
  templateUrl: './recipe-page.component.html',
  styleUrls: ['./recipe-page.component.css']
})
export class RecipePageComponent implements OnInit {

  private recipeId: number;
  recipe: Recipe;
  recipeCard: RecipeCard = new RecipeCard();
  isMyRecipe: boolean;

  constructor(private activateRoute: ActivatedRoute, private recipeService: RecipeService, private location: Location) {
    this.recipeId = activateRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.recipeService.getRecipeById(this.recipeId).subscribe(val => {
      this.recipe = val;
      this.recipe.stages.sort((stage1, stage2) => stage1.serialNumber - stage2.serialNumber);
      this.recipeCard.id = this.recipeId;
      this.recipeCard.cookingDuration = this.recipe.cookingDuration;
      this.recipeCard.title = this.recipe.title;
      this.recipeCard.description = this.recipe.description;
      this.recipeCard.portionsCount = this.recipe.portionsCount;
      this.recipeCard.photoUrl = this.recipe.photoUrl;
      this.recipeCard.favoritesCount = this.recipe.favoritesCount;
      this.recipeCard.likesCount = this.recipe.likesCount;
      this.recipeCard.tags = this.recipe.tags;
      this.recipeCard.isLiked = this.recipe.isLiked;
      this.recipeCard.isFavorite = this.recipe.isFavorite;
      this.recipeCard.authorLogin = this.recipe.authorLogin;

      this.isMyRecipe = this.recipe.isMyRecipe;
    });
  }

  goBack() {
    this.location.back();
  }

  delete() {
    this.recipeService.deleteRecipe(this.recipeId).subscribe(() => this.goBack());
  }
}
