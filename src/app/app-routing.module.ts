import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoogleTagManagerModule } from 'angular-google-tag-manager';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { ClinicModule } from './clinic/clinic.module';
import { ContactFormModule } from './contact-form/contact-form.module';
import { StaticModule } from './static/static.module';

const routes: Routes = [];

@NgModule({
  imports: [
    AuthModule,
    AdminModule,
    ClinicModule,
    ContactFormModule,
    StaticModule,
    RouterModule.forRoot(routes),
    GoogleTagManagerModule.forRoot({
      id: 'G-TJ7D8V74DY',
    }),
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
