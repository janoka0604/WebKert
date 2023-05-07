import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { FirebaseError } from '@angular/fire/app';
import { getAuth, signInWithEmailAndPassword} from '@angular/fire/auth'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
}) 
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  loading: boolean = false;
  errorMessage: string ='';
  errorCode: string = '';

  constructor(private router: Router, private authService: AuthService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async login() {
    this.loading=true;
    const auth=getAuth();
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    signInWithEmailAndPassword(auth,email,password).then(cred =>{
      this.loading=false;
      this.router.navigateByUrl('/main');
    }).catch(error =>{
      this.errorCode=(error as FirebaseError).code;
      if(this.errorCode === 'auth/invalid-email'){
        this.errorMessage="Az email formátuma nem megfelelő"
      }else if(this.errorCode === 'auth/missing-password'){
        this.errorMessage="Ne hagyja üresen a jelsző mezőket"
      }else if(this.errorCode === 'auth/wrong-password' || this.errorCode === 'auth/user-not-found'){
        this.errorMessage="Nem megfelelő email/jelszó kombináció"
      }
      else{
        this.errorMessage="Váratlan hiba"
      }
    })
    this.loading=false;
  }

}
