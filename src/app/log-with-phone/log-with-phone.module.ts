import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LogWithPhonePageRoutingModule } from './log-with-phone-routing.module';

import { LogWithPhonePage } from './log-with-phone.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LogWithPhonePageRoutingModule
  ],
  declarations: [LogWithPhonePage]
})
export class LogWithPhonePageModule {}
