import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LikesService {
  private baseUrl = 'http://localhost:3030/data/likes';
  likesCount: [] = [];

  constructor(private http: HttpClient) { }

  private createHeadersWithAccessToken(): HttpHeaders {
    return new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('X-Authorization', '' + localStorage.getItem('accessToken'));
  }

  getAllLikes(): Observable<any> {
    const headers = this.createHeadersWithAccessToken();
    return this.http.get(`${this.baseUrl}`, { headers });
  }

  likeHotel(hotelId: string): Observable<any> {
    const headers = this.createHeadersWithAccessToken();
    return this.http.post(`${this.baseUrl}`, { hotelId }, { headers });
  }

  getLikesByHotelId(hotelId: string): Observable<any> {
    const headers = this.createHeadersWithAccessToken();
    return this.http.get(`${this.baseUrl}?where=hotelId%3D%22${hotelId}%22&distinct=_ownerId&count`, { headers });
  }

  getMyLikeByHotelId(hotelId: string, userId: string): Observable<any> {
    const headers = this.createHeadersWithAccessToken();
    return this.http.get(`${this.baseUrl}?where=hotelId%3D%22${hotelId}%22%20and%20_ownerId%3D%22${userId}%22&count`, { headers });
  }

  dislikeHotel(likeId: string): Observable<any> {
    const headers = this.createHeadersWithAccessToken();
    return this.http.delete(`${this.baseUrl}/${likeId}`, { headers });
  }

  onLikeHotel(hotelId: string): Observable<any> {
    const headers = this.createHeadersWithAccessToken();
    return this.http.post(`${this.baseUrl}`, { hotelId }, { headers });
  }

  onDislikeHotel(likeId: string): Observable<any> {
    const headers = this.createHeadersWithAccessToken();
    return this.http.delete(`${this.baseUrl}/${likeId}`, { headers });
  }
}

