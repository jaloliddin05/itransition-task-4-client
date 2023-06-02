import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  registrationForm!: FormGroup;
  error: any;

  constructor(
    private formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
    console.log(this.registrationForm.get('password')?.getError);
  }

  onSubmit(): void {
    if (this.registrationForm.invalid) {
      return;
    }
    this.authService.userRegister(this.registrationForm.value).subscribe({
      next: (response) => {
        console.log(response);

        this.router.navigate(['login']);
      },
      error: (err) => {
        console.log(err);
        this.error = err.error;
        setTimeout(() => {
          this.error = {};
          this.registrationForm.reset();
        }, 2000);
      },
    });
  }

  navigateToLogin() {
    this.router.navigate(['login']);
  }
}
