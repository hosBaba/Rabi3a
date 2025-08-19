import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddProductPageRoutingModule } from './add-product-routing.module';

import { AddProductPage } from './add-product.page';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddProductPageRoutingModule
  ],
  declarations: [AddProductPage],
        schemas: [ CUSTOM_ELEMENTS_SCHEMA]



})
export class AddProductPageModule {}
