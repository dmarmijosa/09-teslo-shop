import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { FormUtils } from '../../../shared/utils/forms-utils';

@Component({
  selector: 'register-page',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {
  formuUtils = FormUtils;
  private router = inject(Router);
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  hasError = signal(false);
  isLoading = signal(false);

  registerForm = this.fb.group(
    {
      fullName: [
        '',
        [Validators.required, Validators.pattern(FormUtils.namePattern)],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern(FormUtils.emailPattern),
        ],
        [],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(FormUtils.notOnlySpacesPattern),
          Validators.min(6),
        ],
      ],
      password2: [
        '',
        [
          Validators.required,
          Validators.pattern(FormUtils.notOnlySpacesPattern),
          Validators.min(6),
        ],
      ],
    },
    {
      validators: [FormUtils.isFieldOneEqualFieldTwo('password', 'password2')],
    }
  );

  onRegister() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return this.hasErrorResponse();
    }

    const {
      email = '',
      password = '',
      fullName = '',
    } = this.registerForm.value;

    this.isLoading.set(true);
    this.authService.register(email!, password!, fullName!).subscribe({
      next: (isAuthenticated) => {
        if (isAuthenticated) {
          this.router.navigateByUrl('/', {
            replaceUrl: true,
          });
          this.registerForm.reset();
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
