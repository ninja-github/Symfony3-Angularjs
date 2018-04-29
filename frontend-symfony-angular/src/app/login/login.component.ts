import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  error: string;

  constructor(private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
       
    this.authService.logout();
  }

  login(e) {

    e.preventDefault();
   
    
    if (this.username != null || this.password != null ) {
    
      this.authService.login(this.username, this.password)
        .subscribe(result => {

          this.router.navigate(['/home']);

        }, loginError => this.error = loginError.message + ' : verify  your username or password !  ');
    } else this.error =' verify  your username or password !  '
    
  }

}
