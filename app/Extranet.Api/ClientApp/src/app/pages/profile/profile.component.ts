import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { RecipeCard } from '../../models/recipe-card';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public recipes: RecipeCard[];
  public author: User;
  public authorOld: User;

  public recipesCount: number;
  public likesCount: number;
  public favoritesCount: number;

  isVisible: boolean = false;
  isEdit: boolean = false;

  constructor(private userService: UserService, private location: Location) { }

  ngOnInit(): void {
    this.userService.getUserInfo().subscribe(data => {
      this.author = {
        name: data.name,
        login: data.login,
        password: data.password,
        description: data.description
      };
      this.authorOld = {
        name: data.name,
        login: data.login,
        password: data.password,
        description: data.description
      }
      this.recipesCount = data.recipesCount;
      this.likesCount = data.likesCount;
      this.favoritesCount = data.favoritesCount;
      this.recipes = data.recipes;
    });
  }

  goBack() {
    this.location.back();
  }

  saveEditing() {
    this.userService.editProfile(this.author).subscribe(data => {
      if (data.status == 200) {
        this.authorOld = this.author;
        this.showEditing();
      }
    });
  }

  cancelEditing() {
    this.author.name = this.authorOld.name;
    this.author.login = this.authorOld.login;
    this.author.description = this.authorOld.description;
    this.author.password = this.authorOld.password;
    this.showEditing();
  }

  showEditing() {
    this.isEdit = !this.isEdit;
  }

  showHidePassword() {
    this.isVisible = !this.isVisible;
  }
}
