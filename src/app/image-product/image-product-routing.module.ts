import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImageProductPage } from './image-product.page';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: ImageProductPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),
    ReactiveFormsModule,FormsModule],
  exports: [RouterModule],
})
export class ImageProductPageRoutingModule {}
