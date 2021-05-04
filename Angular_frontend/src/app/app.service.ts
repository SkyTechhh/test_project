import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private _url                = "http://localhost:5000/api/v1/products/"
  private _createProduct      = "http://localhost:5000/api/v1/products/create"

  constructor(private http: HttpClient,) {}


  getAll(page: number): Observable<any> {
    return this.http.get(`${this._url}list?page=${page}`)
  }

  create(content): Observable<any> {
    return this.http.post(this._createProduct, content)
  }

  getProduct(id: number): Observable<any> {
    let _productDetailUrl = `${this._url}${id}/`
    return this.http.get(_productDetailUrl)
  }

  productEdit(content, id: number): Observable<any> {
    console.log(content,'content');

    let _productEditUrl = `${this._url }${id}/update/`
    return this.http.put(_productEditUrl, content)
  }

  productDelete(id: number): Observable<any> {
    let _productDeleteUrl = `${this._url}${id}/delete/`
    return this.http.delete(_productDeleteUrl)
  }

}
