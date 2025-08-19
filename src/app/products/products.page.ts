import { Component, OnInit } from '@angular/core';
interface Product {
  name: string;
  price: number;
  image: string;
  tags: string[];
}
@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
      standalone: false,

})
export class ProductsPage  {

selectedSize = 'S';
  quantity = 2;

  selectSize(size: string) {
    this.selectedSize = size;
  }

  increaseQty() {
    this.quantity++;
  }

  decreaseQty() {
    if (this.quantity > 1) this.quantity--;
  }

  addToCart() {
    console.log(`Added ${this.quantity} of size ${this.selectedSize}`);
  }
}
