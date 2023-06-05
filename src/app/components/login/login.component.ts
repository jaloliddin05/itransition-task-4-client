import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

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
    private readonly router: Router
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
      next: (response) => {
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
