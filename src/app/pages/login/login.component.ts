import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
}) 
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  loading: boolean = false;
  error: string ='';

  constructor(private router: Router, private authService: AuthService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async login() {
    try {
      this.loading = true;
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;
      await this.authService.login(email, password);
      this.router.navigateByUrl('/main')
    } catch(error){
      console.log(error);
    }

    finally {
      this.loading = false;
    }
  }

}
