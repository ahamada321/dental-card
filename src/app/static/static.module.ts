import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TopComponent } from './top/top.component';
import { LandingComponent } from './landing/landing.component';
import { LandingSaasComponent } from './landing-saas/landing-saas.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { Page404Component } from './page404/page404.component';
import { Page422Component } from './page422/page422.component';
import { Page500Component } from './page500/page500.component';
import { TermsComponent } from './terms/terms.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { TermsTextModule } from './terms/helpers/terms-text/terms-text.module';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BookingDemoModule } from '../common/booking-demo/booking-demo.module';

const routes: Routes = [
  // { path: '', component: TopComponent },
  { path: 'landing', component: LandingComponent },
  { path: 'saas', component: LandingSaasComponent },
  { path: 'aboutus', component: AboutusComponent },
  { path: 'terms', component: TermsComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: 'maintenance', component: MaintenanceComponent },
  { path: '', redirectTo: 'register', pathMatch: 'full' },
  // { path: '**', component: Page404Component },
];

@NgModule({
  declarations: [
    TopComponent,
    LandingComponent,
    LandingSaasComponent,
    AboutusComponent,
    MaintenanceComponent,
    Page404Component,
    Page422Component,
    Page500Component,
    TermsComponent,
    PrivacyComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    JwBootstrapSwitchNg2Module,
    TermsTextModule,
    NgbModule,
    BookingDemoModule,
  ],
  exports: [],
  providers: [],
})
export class StaticModule {}
