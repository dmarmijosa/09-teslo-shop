import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
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
      this.hasError.set(true);
      setTimeout(() => {
        this.hasError.set(false);
      }, 2000);
      return;
    }

    const { email = '', password = '' } = this.loginForm.value;
    this.authService.login(email!, password!).subscribe((resp) => {
      console.log(resp);
    });
  }
}
