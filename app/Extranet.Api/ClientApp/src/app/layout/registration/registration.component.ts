import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { UserRegister } from '../../models/user-register';
import { UserService } from '../../services/user.service';
import { AuthorizationComponent } from '../authorization/authorization.component';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  public userRegister: UserRegister = new UserRegister();
  public repeatedPassword: string;

  constructor(private userService: UserService, public dialog: MatDialog) { }

  ngOnInit() {
  }

  public openAuthorization() {
    this.dialog.open(AuthorizationComponent, { panelClass: 'custom-dialog-container' });
  }

  register() {
    if (this.userRegister.password == this.repeatedPassword) {
      this.userService.userRegister(this.userRegister).subscribe();
    }
  }

}
