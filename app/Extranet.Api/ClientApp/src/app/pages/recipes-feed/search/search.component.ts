import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public tags: string[] = ['Мясо', 'Деликатесы', 'Пироги', 'Рыба'];
  public searchString: string = '';

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  search() {
    let seacrh: any = document.getElementById('seacrhInput');
    let path: string = '/recipes/search/' + seacrh.value;

    this.router.navigate([path], { relativeTo: this.route });
  }

}
