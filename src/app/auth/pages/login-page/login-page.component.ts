import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '@shared/utils/forms-utils';
import { AuthService } from '@auth/services/auth.service';

@Component({
  selector: 'login-page',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  isLoading = signal(false);

  hasError = signal(false);
  isPosting = signal(false);

  loginForm = this.fb.group({
    email: [
      '',
      [
        Validators.required,
        Validators.email,
        Validators.pattern(FormUtils.emailPattern),
      ],
    ],
    password: ['', [Validators.required]],
  });

  onSubmit() {
    if (this.loginForm.invalid) {
      return this.hasErrorResponse();
    }

    const { email = '', password = '' } = this.loginForm.value;
    this.isLoading.set(true);
    this.authService.login(email!, password!).subscribe({
      next: (isAuthenticated) => {
        if (isAuthenticated) {
          this.router.navigateByUrl('/');
          this.loginForm.reset();
          return;
        }
        return this.hasErrorResponse();
      },
      complete: () => {
        this.isLoading.set(false);
      },
    });
  }

  hasErrorResponse() {
    this.hasError.set(true);
    setTimeout(() => {
      this.hasError.set(false);
    }, 2000);
    return;
  }
}
