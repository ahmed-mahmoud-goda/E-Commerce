import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from '../../../base/Environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _httpClient: HttpClient) { }

  getAllProducts(): Observable<any> {
    return this._httpClient.get(`${Environment.baseUrl}/api/v1/products`)
  }
  getSpecproduct(productId:string): Observable<any> {
    return this._httpClient.get(`${Environment.baseUrl}/api/v1/products/${productId}`)
  }
}
