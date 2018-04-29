import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { Post } from '../models/Post';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Http, Headers, Response } from '@angular/http';

@Injectable()
export class AuthGuard implements CanActivate {
  // tokenNotExpired: boolean;
  
  private uri = 'http://127.0.0.1:8000/api/posts';
  constructor(private router: Router,
    private authService: AuthService,
    private http: Http,
  ) {
     // check if JWT Token has been Expired
    // const headers = new Headers({ 'Authorization': 'Bearer ' + this.authService.token });
    // this.http.get(this.uri, { headers: headers }).map(res => <any[]>res.json()).subscribe(
    //   res => this.tokenNotExpired = true ,
    //   error => this.tokenNotExpired = false
    // );
  }
  canActivate() {
    
    
    // check if is logged in
    if (localStorage.getItem('currentUser')) {
      return true;
      // console.log('User that is connecting know is : ', JSON.parse(localStorage.getItem('currentUser')).username);
      // console.log('check boolean => ', this.tokenNotExpired);
      // if(this.tokenNotExpired) return true;
      // else {
      //   // not logged in so redirect to login page
      //   this.router.navigate(['/login']);
      //   return false;
      // }
    }
    return false;
  
  }

  private handelError(error: Response) {
    return Observable.throw(error.json().errors || ' auth server error');
  }
}