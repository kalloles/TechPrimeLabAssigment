import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  showPassword: boolean = false;
  loading: boolean = false;
  message: string = '';

  constructor(private fb: FormBuilder, private router: Router,   private httpService : ApiServiceService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loading = true;
      const { email, password } = this.loginForm.value;
      this.httpService.login({ email, password }).subscribe(
        (response) => {
          console.log('Server Response:', response);
          this.loading = false;
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          this.loading = false;
          this.message = error;
        }
      );
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  isInvalid(controlName: string): boolean {
    const control = this.loginForm.get(controlName);
    return control ? (control.invalid && control.touched) : false;
  }
}