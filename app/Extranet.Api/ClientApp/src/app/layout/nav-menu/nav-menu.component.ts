import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DataService } from '../../services/data.service';
import { UserService } from '../../services/user.service';
import { AuthorizationComponent } from '../authorization/authorization.component';

@Component({
  selector: 'nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {

  isLogIn: boolean = false;

  constructor(private userService: UserService, public dialog: MatDialog, private dataService: DataService) { }

  async toggleLoginStatus(_isLogIn: any) {
    if (!_isLogIn) {
      this.dialog.open(AuthorizationComponent, { panelClass: 'custom-dialog-container' });
    }

    if (_isLogIn) {
      this.userService.logout().subscribe(data => {
        if (data.status == 200) {
          this.dataService.userName = '';
          this.isLogIn = !_isLogIn;
        }
      });
    }
  }

  ngOnInit(): void {
    this.dataService.userNameValue.subscribe(val => {
      if (this.userService.isLoggedIn()) {
        this.isLogIn = true;
      } else {
        this.isLogIn = false;
      }
    });
  }

}
