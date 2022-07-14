import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { AuthModule } from './auth/auth.module';
import { ClinicModule } from './clinic/clinic.module';

const routes: Routes = [{ path: '', redirectTo: 'login', pathMatch: 'full' }];

@NgModule({
  imports: [
    AuthModule,
    ClinicModule,
    RouterModule.forRoot(routes),
    SweetAlert2Module.forRoot({
      provideSwal: () =>
        import('sweetalert2').then(({ default: swal }) =>
          swal.mixin({
            customClass: {
              confirmButton: 'btn btn-primary btn-round btn-lg',
              cancelButton: 'btn btn-gray btn-round btn-lg',
            },
            buttonsStyling: false,
          })
        ),
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
