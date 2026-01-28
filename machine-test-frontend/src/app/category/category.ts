import { Component } from '@angular/core';
import { ApiService } from '../api';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './category.html',
  styleUrls: ['./category.css']
})
export class CategoryComponent {
  name = '';
  categories: any[] = [];

  constructor(private api: ApiService) {
    this.loadCategories();
  }

  loadCategories() {
    this.api.getCategories().subscribe((res: any) => {
      this.categories = res;
    });
  }

  addCategory() {
    this.api.addCategory({ CategoryName: this.name }).subscribe(() => {
      this.name = '';
      this.loadCategories();
    });
  }

  deleteCategory(id: number) {
    this.api.deleteCategory(id).subscribe(() => {
      this.loadCategories();
    });
  }
}
