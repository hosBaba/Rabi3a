import { Component, OnInit } from '@angular/core';
import { IonicSlides } from '@ionic/angular';



@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],

  standalone:false,
})


export class AddProductPage implements OnInit {
    swiperModules = [IonicSlides];


  constructor() { }

  ngOnInit() {
  }

}
