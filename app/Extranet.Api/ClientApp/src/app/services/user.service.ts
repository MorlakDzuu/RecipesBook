import { HttpResponse } from '@angular/common/http';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { User } from '../models/user';
import { UserLogin } from '../models/user-login';
import { UserProfileInfo } from '../models/user-profile-info';
import { UserRegister } from '../models/user-register';
import { UserSettings } from '../models/user-settings';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private basePath: string = 'user/';

  constructor(private http: HttpClient) { }

  public editProfile(user: User): Observable<any> {
    var path: string = this.basePath + 'edit';
    return this.http.post(path, user, { observe: 'response' });
  }

  public getUserInfo(): Observable<UserProfileInfo> {
    var path: string = this.basePath + 'info';
    return this.http.get<UserProfileInfo>(path);
  }

  public userLogin(user: UserLogin): Observable<UserSettings> {
    var path: string = this.basePath + 'login';
    return this.http.post<UserSettings>(path, user);
  }

  public userRegister(user: UserRegister): Observable<any> {
    var path: string = this.basePath + 'register';
    return this.http.post(path, user);
  }

  public userVerifyToken() {
    var path: string = this.basePath + 'verify';
    return this.http.get(path, { observe: 'response' });
  }

  public logout() {
    var path: string = this.basePath + 'logout';
    return this.http.get(path, { observe: 'response' });
  }

  public isLoggedIn(): boolean {
    if (localStorage.getItem('userName') != null)
      return true;
    return false;
  }
}
