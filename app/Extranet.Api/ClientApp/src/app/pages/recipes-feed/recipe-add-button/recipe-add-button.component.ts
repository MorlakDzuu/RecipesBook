import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-recipe-add-button',
  templateUrl: './recipe-add-button.component.html',
  styleUrls: ['./recipe-add-button.component.css']
})
export class RecipeAddButtonComponent implements OnInit {

  constructor(private router: Router, private userService: UserService, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  addRecipe() {
    console.log(this.userService.isLoggedIn());
    if (this.userService.isLoggedIn()) {
      this.router.navigate(['/recipeadd']);
    } else {
      this.snackBar.open('Вы незарегестрированны!', '', { duration: 2000, verticalPosition: 'top', horizontalPosition: 'right' });
    }
  }

}
