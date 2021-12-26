import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'logged-in',
  templateUrl: './logged-in.component.html',
  styleUrls: ['./logged-in.component.css']
})

export class LoggedInComponent implements OnInit {

  @Output() myEvent = new EventEmitter<boolean>();
  name: string;

  constructor(private dataService: DataService) { }

  toggleLoginStatus(_isLogIn: any) {
      this.myEvent.emit(_isLogIn);
  }

  ngOnInit(): void {
    this.dataService.userNameValue.subscribe(val => this.name = val);
  }

}
