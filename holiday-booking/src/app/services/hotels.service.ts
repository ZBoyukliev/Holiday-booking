import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HotelsService {

  private apiUrl = 'http://localhost:3030/data/items';

  constructor(private http: HttpClient) { }

  getHotels(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
