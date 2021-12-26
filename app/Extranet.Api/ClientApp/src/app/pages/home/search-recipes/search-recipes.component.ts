import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'search-recipes',
  templateUrl: './search-recipes.component.html',
  styleUrls: ['./search-recipes.component.css']
})
export class SearchRecipesComponent implements OnInit {

  tags: string[] = ['Мясо', 'Деликатесы', 'Пироги', 'Рыба'];

  constructor() { }

  ngOnInit(): void {
  }

}
