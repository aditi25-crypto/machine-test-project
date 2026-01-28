import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ApiService {
  baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // CATEGORY
  getCategories() {
    return this.http.get(`${this.baseUrl}/categories`);
  }

  addCategory(data: any) {
    return this.http.post(`${this.baseUrl}/categories`, data);
  }

  deleteCategory(id: number) {
    return this.http.delete(`${this.baseUrl}/categories/${id}`);
  }

  // PRODUCT
  getProducts(page: number, size: number) {
    return this.http.get(`${this.baseUrl}/products?page=${page}&size=${size}`);
  }

  addProduct(data: any) {
    return this.http.post(`${this.baseUrl}/products`, data);
  }
}
