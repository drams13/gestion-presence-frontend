import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  scanQRCode(qrData: string, latitude: number, longitude: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/attendance/scan`, {
      qr_data: qrData,
      latitude,
      longitude
    });
  }

  clockIn(latitude: number, longitude: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/attendance/clock-in`, {
      latitude,
      longitude
    });
  }

  clockOut(latitude: number, longitude: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/attendance/clock-out`, {
      latitude,
      longitude
    });
  }

  getAttendanceHistory(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/attendance/history`);
  }

  getAttendanceStatus(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/attendance/status`);
  }
}