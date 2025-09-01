import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
            canActivate: [authGuard] // 🛡️ محمي

  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
 
  
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule),
        canActivate: [authGuard] // 🛡️ محمي

  },
  {
    path: 'add-product',
    loadChildren: () => import('./add-product/add-product.module').then( m => m.AddProductPageModule),
            canActivate: [authGuard] // 🛡️ محمي

  },
  {
    path: 'show-product',
    loadChildren: () => import('./show-product/show-product.module').then( m => m.ShowProductPageModule),
  },
  {
    path: 'image-product',
    loadChildren: () => import('./image-product/image-product.module').then( m => m.ImageProductPageModule)
  },
  {
    path: 'video-product',
    loadChildren: () => import('./video-product/video-product.module').then( m => m.VideoProductPageModule)
  },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
