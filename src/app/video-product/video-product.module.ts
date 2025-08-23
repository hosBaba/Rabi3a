import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VideoProductPageRoutingModule } from './video-product-routing.module';

import { VideoProductPage } from './video-product.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VideoProductPageRoutingModule,ReactiveFormsModule
  ],
  declarations: [VideoProductPage]
})
export class VideoProductPageModule {}
