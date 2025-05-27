import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient, private router: Router) {
    const storedUser = localStorage.getItem('userData');
    this.currentUserSubject = new BehaviorSubject<any>(storedUser ? JSON.parse(storedUser) : null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<any> {
    const deviceName = 'Mobile App'; // Vous pouvez personnaliser ceci
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password, device_name: deviceName })
      .pipe(
        tap(response => {
          if (response && response.token) {
            const userData = {
              token: response.token,
              ...response.user
            };
            localStorage.setItem('userData', JSON.stringify(userData));
            this.currentUserSubject.next(userData);
          }
        })
      );
  }

  logout(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/logout`, {}).pipe(
      tap(() => {
        localStorage.removeItem('userData');
        this.currentUserSubject.next(null);
        this.router.navigate(['/login']);
        // this.router.navigate(['/login']);
      })
    );
  }

  getUserInfo(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user`);
  }

  isAuthenticated(): boolean {
    return !!this.currentUserValue && !!this.currentUserValue.token;
  }
}