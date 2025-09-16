import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserinfoPageRoutingModule } from './userinfo-routing.module';

import { UserinfoPage } from './userinfo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserinfoPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [UserinfoPage]
})
export class UserinfoPageModule {}
