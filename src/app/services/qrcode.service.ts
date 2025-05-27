import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QrcodeService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  generateQRCode(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/qrcode/generate`);
  }

  validateQRCode(qrData: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/qrcode/validate`, { qr_data: qrData });
  }
}