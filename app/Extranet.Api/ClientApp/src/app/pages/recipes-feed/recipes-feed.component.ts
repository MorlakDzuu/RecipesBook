import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-recipes-feed',
  templateUrl: './recipes-feed.component.html',
  styleUrls: ['./recipes-feed.component.css']
})
export class RecipesFeedComponent implements OnInit {

  public searchString: string = '';

  constructor(private activateRoute: ActivatedRoute) {
    this.activateRoute.params.subscribe(routeParams => {
      this.searchString = routeParams.searchString;
    });
  }

  ngOnInit() {
  }

}
