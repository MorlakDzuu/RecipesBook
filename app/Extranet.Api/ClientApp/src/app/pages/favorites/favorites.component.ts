import { Component, OnInit } from '@angular/core';
import { RecipeCard } from '../../models/recipe-card';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  public recipes: RecipeCard[];
  public isEmpty: boolean = true;
  public canLoadMore: boolean = false;
  public pageNumber: number = 1;


  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.recipeService.getFavorites(this.pageNumber).subscribe(val => {
      if (val.length != 0) {
        this.recipes = val;
        this.isEmpty = false;
        this.canLoadMore = true;
      }
    });
  }

  addMore() {
    this.pageNumber++;

    this.recipeService.getFavorites(this.pageNumber).subscribe(val => {
      if (val.length != 0) {
        val.forEach(card => this.recipes.push(card));
      } else {
        this.canLoadMore = false;
      }
    });
  }

}
