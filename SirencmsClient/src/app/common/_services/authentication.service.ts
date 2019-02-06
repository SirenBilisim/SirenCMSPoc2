import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocalUser } from "../_models/local.user";
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<LocalUser>;
  public currentUser: Observable<LocalUser>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<LocalUser>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): LocalUser {
    return this.currentUserSubject.value;
  }


  login(username: string, password: string) {

    return this.http.post<any>(environment.apiUrl + '/Auth/Login', { username, password })
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes

          let jwtData = user.token.split('.')[1];
          let decodedJwtJsonData = window.atob(jwtData);
          let decodedJwtData = JSON.parse(decodedJwtJsonData);
          user.roleList = decodedJwtData.role;
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}