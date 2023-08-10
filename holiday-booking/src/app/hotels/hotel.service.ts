import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:3030/data/hotels';

  getHotels(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  };

  getHotelById(id: string): Observable<any> {
    
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createHotel(inputData: {}): Observable<any> {
    let requestData: any = inputData;
    requestData['_ownerId'] = localStorage.getItem('userId');
    requestData['username'] = localStorage.getItem('username');

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('X-Authorization', '' + localStorage.getItem('accessToken'));

    return this.http.post(`${this.apiUrl}`, requestData, {
      headers: headers,
    });
  };

  deleteHotel(hotelId: string): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('X-Authorization', '' + localStorage.getItem('accessToken'));
  
    return this.http.delete(`${this.apiUrl}/${hotelId}`, {
      headers: headers,
    });
  }
  
}
