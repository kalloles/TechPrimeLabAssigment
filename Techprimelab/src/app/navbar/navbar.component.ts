import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  location: string;

  constructor(private router: Router) {
    this.location = this.router.url;
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.location = event.url;
        
      }
    });
  }

  handleLogout(): void {
    this.router.navigate(['/login']);
    console.log('Logout clicked');
  }
}
