import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LogWithPhonePage } from './log-with-phone.page';

const routes: Routes = [
  {
    path: '',
    component: LogWithPhonePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LogWithPhonePageRoutingModule {}
