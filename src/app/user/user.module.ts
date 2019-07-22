import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailComponent } from './user-detail/user-detail.component';
import {Routes, RouterModule} from '@angular/router';
import { UserComponent } from './user.component';
import { AuthGuard } from '../auth/shared/auth.guard';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../auth/shared/auth.service';
import { FormsModule } from '@angular/forms';

const route: Routes = [
  {path: 'users', component: UserComponent,
children: [
  {path: 'profile', canActivate: [AuthGuard], component: UserDetailComponent}
]}
];

@NgModule({
  declarations: [UserDetailComponent, UserComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    HttpClientModule,
    FormsModule
  ],
  providers: [AuthService]
})
export class UserModule { }
