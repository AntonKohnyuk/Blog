import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import {
  FireBaseAuthResponse,
  User,
} from 'src/app/shared/interfaces/interfaces';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  get token(): string | null {
    const expDate = new Date(localStorage.getItem('fb-token-exp')!);
    if (new Date() > expDate) {
      this.logout();
      return null;
    }
    return localStorage.getItem('fb-token');
  }

  login(user: User): Observable<any> {
    user.returnSecureToken = true;
    return this.http
      .post<FireBaseAuthResponse>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`,
        user
      )
      .pipe(tap(this.setToken));
  }

  logout() {
    this.setToken(null);
  }

  isLogin(): boolean {
    return !!this.token;
  }

  private setToken(response: FireBaseAuthResponse | null) {
    if (response) {
      const expDate = new Date(
        new Date().getTime() + +response.expiresIn * 1000
      );
      localStorage.setItem('fb-token', response.idToken);
      localStorage.setItem('fb-token-exp', expDate.toString());
    } else {
      localStorage.clear();
    }
  }
}
