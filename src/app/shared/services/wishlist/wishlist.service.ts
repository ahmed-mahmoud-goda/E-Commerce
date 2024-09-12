import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from '../../../base/Environment';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private _HttpClient:HttpClient) { }

  addToWishlist(pId:string):Observable<any>{
    return this._HttpClient.post(`${Environment.baseUrl}/api/v1/wishlist`,{
      "productId": pId
    })
  }

  removeProduct(pId:string):Observable<any>{
    return this._HttpClient.delete(`${Environment.baseUrl}/api/v1/wishlist/${pId}`)
  }

  getWishlist():Observable<any>{
    return this._HttpClient.get(`${Environment.baseUrl}/api/v1/wishlist`)
  }

}
