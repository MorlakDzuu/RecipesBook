import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { RecipeAdd } from '../../models/recipe-add';
import { MatChipInputEvent } from '@angular/material/chips';
import { ENTER } from '@angular/cdk/keycodes';
import { FileService } from '../../services/file.service';
import { RecipeService } from '../../services/recipe.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-add-page',
  templateUrl: './recipe-add-page.component.html',
  styleUrls: ['./recipe-add-page.component.css']
})
export class RecipeAddPageComponent implements OnInit {

  public recipe: RecipeAdd;
  public recipeId: number = 0;
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER];
  file: File = null;
  isImageLoaded: boolean = false;
  isEditMode: boolean = false;

  constructor(
    private fileService: FileService,
    private recipeService: RecipeService,
    private location: Location,
    private activateRoute: ActivatedRoute) {
    if (activateRoute.snapshot.params['id'] != undefined) {
      this.recipeId = activateRoute.snapshot.params['id'];
      this.isEditMode = true;
    }
  }

  goBack() {
    this.location.back();
  }

  onChange(event) {
    this.file = event.target.files[0];
    this.fileService.upload(this.file).subscribe(val => {
      this.recipe.photoUrl = val;
      this.isImageLoaded = true;
    });
  }

  public send() {
    console.log(this.recipe);
    if (!this.isEditMode) {
      this.recipeService.addNewRecipe(this.recipe).subscribe(val => this.goBack());
    } else {
      this.recipeService.editRecipe(this.recipe, this.recipeId).subscribe(val => this.goBack());
    }
  }

  public addTitle(): void {
    this.recipe.ingredients.push({
      title: '',
      description: ''
    });
  }

  public deleteTitle(block: number): void {
    this.recipe.ingredients.splice(block, 1);
  }

  public addStage(): void {
    this.recipe.stages.push({
      serialNumber: this.recipe.stages.length + 1,
      description: ''
    });
  }

  public deleteStage(stage: number): void {
    this.recipe.stages.splice(stage, 1);
    for (var i = 1; i <= this.recipe.stages.length; i++) {
      this.recipe.stages[i - 1].serialNumber = i;
    }
  }

  addTag(event: MatChipInputEvent): void {
    const tag: string = (event.value || '').trim();
    if (tag) {
      this.recipe.tags.push(tag);
    }
    event.input.value = '';
  }

  removeTag(tag: string): void {
    const index = this.recipe.tags.indexOf(tag);
    if (index >= 0) {
      this.recipe.tags.splice(index, 1);
    }
  }


  ngOnInit(): void {
    console.log(this.recipeId);
    if (this.recipeId == 0) {
      this.recipe = {
        title: '',
        description: '',
        cookingDuration: 0,
        portionsCount: 0,
        tags: [],
        photoUrl: '',
        ingredients: [
          {
            title: '',
            description: ''
          }
        ],
        stages: [
          {
            serialNumber: 1,
            description: ''
          }
        ]
      }
    } else {
      this.recipeService.getRecipeById(this.recipeId).subscribe(val => {
        this.recipe = {
          title: val.title,
          description: val.description,
          cookingDuration: val.cookingDuration,
          portionsCount: val.portionsCount,
          tags: val.tags,
          photoUrl: val.photoUrl,
          ingredients: val.ingredients,
          stages: val.stages
        };

        if (this.recipe.photoUrl != null && this.recipe.photoUrl != "") {
          this.isImageLoaded = true;
        }
      });
    }
  }
}
