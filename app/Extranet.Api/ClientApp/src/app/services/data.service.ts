import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  userNameValue = new BehaviorSubject(this.userName);

  set userName(value) {
    if (value == "" || value == null) {
      localStorage.removeItem("userName");
    } else {
      localStorage.setItem('userName', value);
    }
    this.userNameValue.next(value);
  }

  get userName() {
    return localStorage.getItem('userName');
  }
}
