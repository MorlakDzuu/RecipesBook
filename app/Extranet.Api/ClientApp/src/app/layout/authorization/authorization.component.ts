import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { UserLogin } from '../../models/user-login';
import { DataService } from '../../services/data.service';
import { UserService } from '../../services/user.service';
import { RegistrationComponent } from '../registration/registration.component';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})
export class AuthorizationComponent implements OnInit {

  public userLogin: UserLogin = new UserLogin();

  constructor(
    private router: Router,
    private userService: UserService,
    private dialog: MatDialog,
    private dataService: DataService) {
    this.userLogin.login = '';
    this.userLogin.password = '';
  }

  public openRegistration() {
    this.dialog.open(RegistrationComponent, { panelClass: 'custom-dialog-container' });
  }

  public authorize() {
    if (this.userLogin.login != '' && this.userLogin.password != '') {
      this.userService.userLogin(this.userLogin).subscribe(data => {
        this.dataService.userName = data.name;
      });
    }
  }

  ngOnInit() {
  }

}
