import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router'
import { FirebaseError } from '@angular/fire/app';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent{
  signupForm!: FormGroup;
  errorMessage: string='';
  loading: boolean = false;
  errorCode: string = '';

  constructor(private router: Router, private authService: AuthService, private fb: FormBuilder) { }

  ngOnInit(): void { 
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    });

  }

  async signup() {
    try{
      this.loading=true;
      const email=this.signupForm.value.email;
      const password = this.signupForm.value.password;
      const confirmPassword=this.signupForm.value.confirmPassword;
      if(confirmPassword === password){
        await this.authService.signup(email,password)
        this.router.navigateByUrl('/main');
      }
      else{
        this.errorMessage="Nem egyezik meg a két jelszó"
      }
    } catch(error){
      this.errorCode=(error as FirebaseError).code;
      if(this.errorCode === 'auth/invalid-email'){
        this.errorMessage="Az email formátuma nem megfelelő"
      }else if(this.errorCode === 'auth/missing-password'){
        this.errorMessage="Ne hagyja üresen a jelsző mezőket"
      }else if(this.errorCode === 'auth/weak-password'){
        this.errorMessage="Gyenge jelszó, legalább 6 karakter legyen"
      }else if(this.errorCode === 'auth/email-already-in-use'){
        this.errorMessage="Ezt az email már regisztrálták"
      }
      
      else{
        this.errorMessage="Váratlan hiba"
      }

    } finally {
      this.loading=false;
    }
  }

}
