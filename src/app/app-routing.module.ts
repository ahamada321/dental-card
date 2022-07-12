import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { AuthModule } from './auth/auth.module';

const routes: Routes = [{ path: '', redirectTo: 'login', pathMatch: 'full' }];

@NgModule({
  imports: [
    AuthModule,
    RouterModule.forRoot(routes),
    SweetAlert2Module.forRoot({
      // buttonsStyling: false,
      // confirmButtonClass: 'btn btn-primary btn-round btn-lg',
      // cancelButtonClass: 'btn btn-gray btn-lg',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
