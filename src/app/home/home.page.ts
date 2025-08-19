import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  constructor(private router:Router) {}
  products = [
    {
      title: 'Womens Long Sweater',
      price: 30,
      oldPrice: 35.99,
      image: 'assets/bag.jpg',
      favorite: true
    },
    {
      title: "Men's Sleeve T-Shirt",
      price: 50,
      oldPrice: 65.9,
      image: 'assets/imgs/product2.jpg',
      favorite: false
    },
    {
      title: 'Triple Zip Pocket La',
      price: 45,
      oldPrice: 55.5,
      image: 'assets/imgs/product3.jpg',
      favorite: true
    },
    {
      title: 'Apple Watch Resin',
      price: 95,
      oldPrice: 100,
      image: 'assets/imgs/product4.jpg',
      favorite: false
    },
    {
      title: 'Bracelet Elegant',
      price: 20,
      oldPrice: 30,
      image: 'assets/imgs/product5.jpg',
      favorite: true
    },
    {
      title: 'Women Shoes',
      price: 40,
      oldPrice: 60,
      image: 'assets/imgs/product6.jpg',
      favorite: false
    }
  ];

  addBalance() {
    console.log("تزويد الرصيد");
    this.router.navigate(['/add-balance']);
  }

 
  openProfile() {
    console.log("الملف الشخصي");
    this.router.navigate(['/profile']);
  }

  logout() {
    console.log("تسجيل الخروج");
    // هنا ضع كود الخروج من الحساب
  }

  deleteAccount() {
    console.log("حذف الحساب");
    // هنا كود حذف الحساب
  }

}
