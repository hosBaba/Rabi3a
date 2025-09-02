import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from '../services.service';
import { ImageProduct } from '../image-product';
import { RealtimedataService } from '../realtimedata.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  products: ImageProduct[] = [];

private router=inject(Router);
private authService=inject(ServicesService);
private real=inject(RealtimedataService);


  ngOnInit(): void {
this.real.getItems('produit').subscribe({
    next: (items) => {
            console.log('Items reçus:', items); // هل يظهر شيء في الكونسول؟

      this.products = items.reverse();
    },
    error: (err) => console.error('Firebase error:', err)
  });
  }




 onlogout() {
  this.authService.logout();
  this.router.navigateByUrl('/login')
}




  

}
