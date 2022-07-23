import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { AuthModule } from './auth/auth.module';
import { ClinicModule } from './clinic/clinic.module';
import { StaticModule } from './static/static.module';

const routes: Routes = [];

@NgModule({
  imports: [
    AuthModule,
    ClinicModule,
    StaticModule,
    RouterModule.forRoot(routes),
    SweetAlert2Module.forRoot({
      provideSwal: () =>
        import('sweetalert2').then(({ default: swal }) =>
          swal.mixin({
            customClass: {
              confirmButton: 'btn btn-primary btn-round btn-lg',
              cancelButton: 'btn btn-secondary btn-round btn-lg',
            },
            buttonsStyling: false,
          })
        ),
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
