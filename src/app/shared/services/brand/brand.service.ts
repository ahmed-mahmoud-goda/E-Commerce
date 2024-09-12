import { Environment } from './../../../base/Environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private _HttpClient:HttpClient) { }

  getAllBrands():Observable<any>{
    return this._HttpClient.get(`${Environment.baseUrl}/api/v1/brands`)
  }

  getSpecBrand(bId:string):Observable<any>{
    return this._HttpClient.get(`${Environment.baseUrl}/api/v1/brands/${bId}`)
  }
}
