import { Component } from '@angular/core';
import { ApiService } from '../api';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product.html',
  styleUrls: ['./product.css']
})
export class ProductComponent {

  name = '';
  categoryId = '';
  categories: any[] = [];
  products: any[] = [];

  page = 1;
  limit = 5;

  constructor(private api: ApiService) {
    this.loadCategories();
    this.loadProducts();
  }

  loadCategories() {
    this.api.getCategories().subscribe((res: any) => {
      this.categories = res;
    });
  }

  loadProducts() {
    this.api.getProducts(this.page, this.limit).subscribe((res: any) => {
      this.products = res.data;   // IMPORTANT
    });
  }

  addProduct() {
    const data = {
      ProductName: this.name,
      CategoryId: this.categoryId
    };

    this.api.addProduct(data).subscribe(() => {
      this.name = '';
      this.categoryId = '';
      this.loadProducts();
    });
  }

  nextPage() {
    this.page++;
    this.loadProducts();
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.loadProducts();
    }
  }
}
