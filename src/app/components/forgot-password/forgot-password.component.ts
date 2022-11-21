import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  constructor(
    private authService: AuthService,
    private toast: HotToastService,
    private router: Router,
    private fb: NonNullableFormBuilder
  ) {}
  ngOnInit() {}
  get email() {
    return this.forgotPasswordForm.get('email');
  }

  submit() {
    const { email } = this.forgotPasswordForm.value;

    if (!this.forgotPasswordForm.valid || !email) {
      return;
    }

    this.authService.forgotPassword(email).pipe(
      this.toast.observe({
        success: 'Un mail vous à été envoyé',
        loading: 'Envoie en cours',
        error: ({ message }) => `Une érreur c'est produite: ${message} `,
      })
    );
  }
}
