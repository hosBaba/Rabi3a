import { Component, inject, OnInit } from '@angular/core';
import { RealtimedataService } from '../realtimedata.service';
import { ImageProduct } from '../image-product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-show-product',
  templateUrl: './show-product.page.html',
  styleUrls: ['./show-product.page.scss'],
  standalone:false,
})
export class ShowProductPage implements OnInit {
 product?: ImageProduct;

  private route = inject(ActivatedRoute);
  private real = inject(RealtimedataService);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('Product ID from route:', id);

    if (id) {
      this.real.getProductById('produit', id).subscribe((prod) => {
        console.log('Product loaded:', prod);
        this.product = prod || undefined;
      });
    }
  }

}
