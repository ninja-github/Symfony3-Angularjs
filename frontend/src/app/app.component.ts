import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  sessionActive: boolean = false;

  constructor(private authService: AuthService) { 
    console.log('app const ');
  }
  ngOnInit() {
    if (localStorage.getItem('currentUser')) this.sessionActive = true;
    else this.sessionActive = false;
    console.log('app oninit ');
  }
  
  
}
