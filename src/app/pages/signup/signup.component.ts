import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router'
import { FirebaseError } from '@angular/fire/app';
import { User } from '../../shared/models/User';
import { getAuth, createUserWithEmailAndPassword} from '@angular/fire/auth'
import { UserService } from '../../shared/services/user.service';
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

  constructor(private router: Router, private authService: AuthService, private fb: FormBuilder, private userService: UserService) { }

  ngOnInit(): void { 
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    });

  }

  async signup() {
      this.loading=true;
      const auth=getAuth();
      const email=this.signupForm.value.email;
      const password = this.signupForm.value.password;
      const confirmPassword=this.signupForm.value.confirmPassword;
      
      if(confirmPassword === password){
        await createUserWithEmailAndPassword(auth,email,password).then(cred =>{
          //console.log(cred);
          const user: User={
            id: cred.user.uid as string,
            email: this.signupForm.value.email,
            username: this.signupForm.value.email.split('@')[0]
          };
          this.userService.create(user).then( _=>{

          }).catch(error => {

          })
          this.router.navigateByUrl('/main');
        }).catch(error =>{
          console.error();
          this.errorCode=(error as FirebaseError).code;
          if(this.errorCode === 'auth/invalid-email'){
            this.errorMessage="Az email formátuma nem megfelelő"
          }else if(this.errorCode === 'auth/missing-password'){
            this.errorMessage="Ne hagyja üresen a jelszó mezőket"
          }else if(this.errorCode === 'auth/weak-password'){
            this.errorMessage="Gyenge jelszó, legalább 6 karakter legyen"
          }else if(this.errorCode === 'auth/email-already-in-use'){
            this.errorMessage="Ezt az emailt már regisztrálták"
          }
          
          else{
            this.errorMessage="Váratlan hiba"
          }
          this.loading=false;
        })
      }
      else{
        this.errorMessage="Nem egyezik meg a két jelszó"
        this.loading=false;
      }
  }

}
