import { Component } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor(private userService: UserService) {}

  ngOnInit() {
    if (localStorage.getItem('userName') != null) {
      this.userService.userVerifyToken().subscribe(data => {
        if (data.status != 403) {
          localStorage.removeItem('userName');
          localStorage.removeItem('token');
        }
      });;
    }
  }
}
