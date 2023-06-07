import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

const accessTokenOptions = {
  secure: true,
  sameSite: 'none',
  maxAge: 31536000000,
};
const refreshTokenOptions = {
  ...accessTokenOptions,
  httpOnly: true,
};

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  error: any;

  constructor(
    private formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.userLogin(this.loginForm.value).subscribe({
      next: (res: any) => {
        if (res) {
          this.cookieService.set('access_token_user', res.access_token_user);
          this.cookieService.set('refresh_token_user', res.refresh_token_user);
          this.cookieService.set('userId', res.userId);
        }
        this.router.navigate(['user-list']);
      },
      error: (err) => {
        this.error = err.error;
        setTimeout(() => {
          this.error = {};
          this.loginForm.reset();
        }, 2000);
      },
    });
  }

  navigateToRegister() {
    this.router.navigate(['register']);
  }
}
