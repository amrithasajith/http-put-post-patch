import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupserviceService {
  private httpUrl ='http://localhost:3000'
  
  constructor(private httpClient : HttpClient ) { }
  userSignUp(data:any){
    localStorage.setItem('user', JSON.stringify(data));
    return this.httpClient.post(`${this.httpUrl}/user`,data,{observe:'response'})
}


}