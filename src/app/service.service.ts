import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private apiUrl = 'http://localhost:8000/api/';
  constructor(private http: HttpClient) { }

  registerUser(userData: any): Observable<any> {
    return this.http.post(this.apiUrl + 'user/register', userData);
  }

  loginUser(userData: any): Observable<any> {
    return this.http.post(this.apiUrl + 'user/login', userData);
  }

  GetAllCategory(): Observable<any> {
    return this.http.get(this.apiUrl + 'category/getAllCategories');

  }
  getCategory(): Observable<any> {
    return this.http.get(this.apiUrl + 'product/getProductsByCategory/Vegetables');
  }

  GetlatestProduct(): Observable<any> {
    return this.http.get(this.apiUrl + 'product/getLatestProducts');
  }
  GetbestProduct(): Observable<any> {
    return this.http.get(this.apiUrl + 'product/getBestProducts');
  }
  GetnewProduct(): Observable<any> {
    return this.http.get(this.apiUrl + 'product/getNewProducts');
  }
  GethighOfferProduct(): Observable<any> {
    return this.http.get(this.apiUrl + 'product/getHighOfferProducts');
  }
  productdetail(id: any) {
    return this.http.get(this.apiUrl + 'getProductsById/' + id);
  }
  addCart(data: any) {
    return this.http.post(this.apiUrl + 'cart/addtoCart', data);
  }

  GetCart(id: any) {
    return this.http.get(this.apiUrl + 'getmyCart/' + id);

  }
}


