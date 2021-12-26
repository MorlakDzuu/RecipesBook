import { Component, Input, OnInit } from '@angular/core';
import { RecipeCard } from '../../../../models/recipe-card';
import { RecipeService } from '../../../../services/recipe.service';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.css']
})
export class RecipeCardComponent implements OnInit {

  @Input() card: RecipeCard;
  @Input() displayLink: boolean;
  @Input() displayTitle: boolean;

  constructor(private userService: UserService, private recipeService: RecipeService) { }

  ngOnInit() {
  }

  selectFavourite() {
    if (this.userService.isLoggedIn()) {
      if (this.card.isFavorite) {
        this.recipeService.deleteFavoriteToRecipe(this.card.id).then(() => {
          this.card.isFavorite = false;
          this.card.favoritesCount--;
        });
      } else {
        this.recipeService.addFavoriteToRecipe(this.card.id).then(() => {
          this.card.isFavorite = true;
          this.card.favoritesCount++;
        });
      }
    }
  }

  selectLiked() {
    if (this.userService.isLoggedIn()) {
      if (this.card.isLiked) {
        this.recipeService.deleteLikeToRecipe(this.card.id).then(() => {
          this.card.isLiked = false;
          this.card.likesCount--;
        });
      } else {
        this.recipeService.addLikeToRecipe(this.card.id).then(() => {
          this.card.isLiked = true;
          this.card.likesCount++;
        });
      }
    }
  }
}
