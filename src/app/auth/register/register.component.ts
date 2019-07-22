import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  formData: any = { username: 'Fabio' };
  errors: any[] = [];
  constructor(private auth: AuthService, private route: Router) { }

  ngOnInit() {
  }

  register() {
    this.auth.register(this.formData)
      .subscribe((msg) => {
        this.route.navigate(['/login', { registered: 'success' }]);
      }, (errorReponse) => {
        this.errors = errorReponse.error.errors;
      });
  }

}
