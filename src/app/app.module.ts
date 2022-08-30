import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GoogleTagManagerModule } from 'angular-google-tag-manager';
import { NavbarComponent } from './common/navbar/navbar.component';
import { FooterComponent } from './common/footer/footer.component';
import { BookingDemoModule } from './common/booking-demo/booking-demo.module';

@NgModule({
  declarations: [AppComponent, NavbarComponent, FooterComponent],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    GoogleTagManagerModule.forRoot({
      id: 'G-TJ7D8V74DY',
    }),
    BookingDemoModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
