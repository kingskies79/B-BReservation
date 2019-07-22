import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(public auth: AuthService,
              private router: Router) {}

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  search(city: string) {
    city ? this.router.navigate([`/rentals/${city}/homes`]) : this.router.navigate(['/rentals']);
  }
}
