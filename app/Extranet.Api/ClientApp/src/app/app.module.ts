import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { RecipeOfDayComponent } from './pages/home/recipe-of-day/recipe-of-day.component';
import { SearchRecipesComponent } from './pages/home/search-recipes/search-recipes.component';
import { SortingByTagsComponent } from './pages/home/sorting-by-tags/sorting-by-tags.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { NavMenuComponent } from './layout/nav-menu/nav-menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { LoggedInComponent } from './layout/nav-menu/logged-in/logged-in.component';
import { LoginButtonComponent } from './layout/nav-menu/login-button/login-button.component';
import { RecipesFeedComponent } from './pages/recipes-feed/recipes-feed.component';
import { RecipesLabelComponent } from './pages/recipes-feed/recipes-label/recipes-label.component';
import { RecipeCardComponent } from './pages/recipes-feed/recipes-label/recipe-card/recipe-card.component';
import { SearchComponent } from './pages/recipes-feed/search/search.component';
import { RecipePageComponent } from './pages/recipe-page/recipe-page.component';
import { StepComponent } from './pages/recipe-page/step/step.component';
import { RecipeAddButtonComponent } from './pages/recipes-feed/recipe-add-button/recipe-add-button.component';
import { RecipesSortingByTagsComponent } from './pages/recipes-feed/recipes-sorting-by-tags/recipes-sorting-by-tags.component';
import { RecipeAddPageComponent } from './pages/recipe-add-page/recipe-add-page.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { RegistrationComponent } from './layout/registration/registration.component';
import { AuthorizationComponent } from './layout/authorization/authorization.component';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    FooterComponent,
    SortingByTagsComponent,
    RecipeOfDayComponent,
    SearchRecipesComponent,
    LoggedInComponent,
    LoginButtonComponent,
    RecipesFeedComponent,
    RecipesLabelComponent,
    RecipeCardComponent,
    SearchComponent,
    RecipePageComponent,
    StepComponent,
    RecipeAddButtonComponent,
    RecipesSortingByTagsComponent,
    RecipeAddPageComponent,
    ProfileComponent,
    FavoritesComponent,
    RegistrationComponent,
    AuthorizationComponent
  ],
  entryComponents: [AuthorizationComponent, RegistrationComponent],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatChipsModule,
    MatSnackBarModule,
    MatDialogModule,
    MatIconModule,
    MatMenuModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'recipes', component: RecipesFeedComponent },
      { path: 'recipe/:id', component: RecipePageComponent },
      { path: 'recipes/search/:searchString', component: RecipesFeedComponent,  },
      { path: 'recipeadd', component: RecipeAddPageComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'favorites', component: FavoritesComponent },
      { path: 'recipe/edit/:id', component: RecipeAddPageComponent }
    ], { onSameUrlNavigation: 'reload' }),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
