import { AuthService } from './../../shared/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/interfaces/interfaces';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  public loginForm!: FormGroup;
  public submitted: boolean = false;
  public message!: string;

  constructor(
    private fb: FormBuilder,
    public auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['needLogin']) {
        this.message = 'Please, log in again!';
      } else if (params['sessionEnd']) {
        this.message = 'The session has expired. Log in again!';
      }
    });

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  submit() {
    if (this.loginForm.invalid) return;
    this.submitted = true;
    const user: User = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };
    console.log('hgere0');
    this.auth.login(user).subscribe({
      next: (v) => {
        this.loginForm.reset();
        this.router.navigate(['/admin', 'dashboard']);
        this.submitted = false;
      },
      error: (e) => {
        this.submitted = false;
      },
    });
  }
}
