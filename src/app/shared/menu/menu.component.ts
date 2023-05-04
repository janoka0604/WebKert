import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  activeRoute: string='';
  
  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(() => {
      this.setActiveRoute();
    });
  }

  setActiveRoute() {
    const path = this.router.url;
    this.activeRoute = path ? path.substr(1) : '';
  }
}
