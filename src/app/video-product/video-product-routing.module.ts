import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VideoProductPage } from './video-product.page';

const routes: Routes = [
  {
    path: '',
    component: VideoProductPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VideoProductPageRoutingModule {}
