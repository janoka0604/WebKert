import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit{
  currentTime = new Date();
  loggedInUser?: firebase.default.User | null;

  constructor(private authService : AuthService){}

  ngOnInit() {
    setInterval(() => {
      this.currentTime = new Date();
    }, 1000);
    this.authService.isUserLoggedIn().subscribe(user =>{
      console.log(user)
      this.loggedInUser=user;
      localStorage.setItem('user', JSON.stringify(this.loggedInUser));
    }, error =>{
      localStorage.setItem('user', JSON.stringify('null'));
      console.error(error);
    });
  }

  logOut(){
    this.authService.logout().then(() =>{
      console.log("Kijelentkezve")
    }).catch((error) =>{
      console.error(error);
    });
  }
}
