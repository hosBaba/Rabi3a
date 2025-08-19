import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowProductPageRoutingModule } from './show-product-routing.module';

import { ShowProductPage } from './show-product.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowProductPageRoutingModule
  ],
  declarations: [ShowProductPage],
          schemas: [ CUSTOM_ELEMENTS_SCHEMA]

})
export class ShowProductPageModule {}
