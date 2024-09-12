import { Environment } from './../../../base/Environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { loginData, UserData } from '../../interfaces/user-data';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData:BehaviorSubject<any> = new BehaviorSubject(null);
  constructor(private _HttpClient:HttpClient, private _router:Router) {
    if(typeof localStorage !== 'undefined'){
      if(localStorage.getItem('userToken') !== null){
        this.decodeData();
        _router.navigate([localStorage.getItem('currentPage')])
      }
    }
   }

  sendRegister(userData:UserData):Observable<any>{
    return this._HttpClient.post(`${Environment.baseUrl}/api/v1/auth/signup`,userData)
  }
  sendLogin(userData:loginData):Observable<any>{
    return this._HttpClient.post(`${Environment.baseUrl}/api/v1/auth/signin`,userData)
  }
  decodeData(){

    let token = localStorage.getItem('userToken')
    this.userData.next(jwtDecode(JSON.stringify(token)))

  }

  sendEmailApi(email:string):Observable<any>
  {
    return this._HttpClient.post(`${Environment.baseUrl}/api/v1/auth/forgotPasswords`,email)
  }
  sendCodeApi(code:string):Observable<any>
  {
    return this._HttpClient.post(`${Environment.baseUrl}/api/v1/auth/verifyResetCode`,code)
  }
  resetDataApi(userData:any):Observable<any>
  {
    return this._HttpClient.put(`${Environment.baseUrl}/api/v1/auth/resetPassword`,userData)
  }
}
