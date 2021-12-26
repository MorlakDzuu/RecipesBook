import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { RecipeCard } from '../../../models/recipe-card';
import { RecipeService } from '../../../services/recipe.service';

@Component({
  selector: 'app-recipes-label',
  templateUrl: './recipes-label.component.html',
  styleUrls: ['./recipes-label.component.css']
})
export class RecipesLabelComponent implements OnInit {

  @Input() searchString: string = null;

  public cards: RecipeCard[];
  public pageNumber: number;
  public canLoadMore: boolean;

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.init();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.searchString = changes.searchString.currentValue;
    this.init();
  }

  init() {
    this.pageNumber = 1;
    if ((this.searchString == null) || (this.searchString == '')) {
      this.recipeService.getRecipeFeed(this.pageNumber).subscribe(val => this.cards = val);
    } else {
      this.recipeService.getRecipesFeedBySearchString(this.pageNumber, this.searchString).subscribe(val => this.cards = val);
    }
    this.canLoadMore = true;
  }

  addMore() {
    this.pageNumber++;

    if ((this.searchString == null) || (this.searchString == '')) {
      this.recipeService.getRecipeFeed(this.pageNumber).subscribe(val => {
        if (val.length != 0) {
          val.forEach(card => this.cards.push(card));
        } else {
          this.canLoadMore = false;
        }
      });
    } else {
      this.recipeService.getRecipesFeedBySearchString(this.pageNumber, this.searchString).subscribe(val => {
        if (val.length != 0) {
          val.forEach(card => this.cards.push(card));
        } else {
          this.canLoadMore = false;
        }
      });
    }
  }

}
