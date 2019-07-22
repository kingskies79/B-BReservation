import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {  NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {Routes, RouterModule} from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { RentalModule } from './rental/rental.module';
import { AuthModule } from './auth/auth/auth.module';
import { UserComponent } from './user/user.component';
import { UserModule } from './user/user.module';

import { ManageModule } from './manage/manage.module';
import { HeaderComponent } from './common/header/header.component';





const routes: Routes = [
  {path: '', redirectTo: '/rentals', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    RentalModule,
    NgbModule.forRoot(),
    AuthModule,
    UserModule,
    ManageModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
