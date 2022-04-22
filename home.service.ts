import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  baseURL: string = "http://localhost:3000/";     //fill in as per the used url

  constructor(private http: HttpClient) { }

  //to send data to the backend to be handled
  jsonObject(worksheet: any): Observable<any> {
    const headers = { 'content-type': 'application/json'} 
    const body=worksheet;
    console.log(worksheet)
    return this.http.post(this.baseURL + 'data', body,{'headers':headers})
  }
}
