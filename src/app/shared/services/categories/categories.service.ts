import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from '../../../base/Environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private _HttpClient:HttpClient) { }

  getAllCategories():Observable<any>{
    return this._HttpClient.get(`${Environment.baseUrl}/api/v1/categories`)
  }

  getSpecCategory(cId:string):Observable<any>{
    return this._HttpClient.get(`${Environment.baseUrl}/api/v1/categories/${cId}`)
  }
  getSubcategory(cId:string):Observable<any>{
    return this._HttpClient.get(`${Environment.baseUrl}/api/v1/categories/${cId}/subcategories`)
  }
}
