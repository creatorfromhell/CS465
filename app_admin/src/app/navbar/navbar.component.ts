import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  imports: [NgIf],
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  constructor(
  private authenticationService: AuthenticationService
) { }

ngOnInit() { }

public isLoggedIn(): boolean {
  return this.authenticationService.isLoggedIn();
}

public onLogout(): void {
  return this.authenticationService.logout();
}
}