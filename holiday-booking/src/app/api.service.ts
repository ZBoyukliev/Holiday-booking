import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root',
})
export class ApiService {
    constructor(private http: HttpClient) { }

    // userRegister(
    //     email: string,
    //     password: string,
    //     username: string
    // ): Observable<any> {
    //     return this.http.post(`http://localhost:3030/users/register`, {
    //         email: email,
    //         password: password,
    //         username: username,
    //     });
    // }

    // login(email: string, password: string): Observable<any> {
    //     return this.http.post(`http://localhost:3030/users/login`, { email: email, password: password });
    // }

    // setToken(key: string, value: string): void {
    //     localStorage.setItem(key, value);
    // }

    // clearToken(): void {
    //     localStorage.removeItem('accessToken');
    // }
}