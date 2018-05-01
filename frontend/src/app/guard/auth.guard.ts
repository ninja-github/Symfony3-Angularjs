import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { Post } from '../models/Post';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Http, Headers, Response } from '@angular/http';
import { PostService } from '../services/post/post.service';

@Injectable()
export class AuthGuard implements CanActivate {
  // tokenNotExpired: boolean;
  private uri       = 'http://127.0.0.1:8000/api/posts'; 
  private check_uri = 'http://127.0.0.1:8000/api/check_token'; 

  constructor(private router: Router,
    private authService: AuthService,
    private postsService: PostService,
    private http: Http,
  ) {
    console.log('auth guard');
    
     // check if JWT Token has been Expired
    this.checkTokenExpiration().subscribe(
      access => {
        console.log('check => ', access);
      },
      error => {
        if (error == 401) {
          console.log('check => ', error);
          this.router.navigate(['/login']);
        }
      }
    );
  }
  canActivate() {
    // check if is logged in
    if (localStorage.getItem('currentUser')) {
      return true;
    }
      this.router.navigate(['/login']);
    return false;
  }

  checkTokenExpiration(): Observable<any[]> {
    const headers = new Headers({ 'Authorization': 'Bearer ' + this.authService.token });
    return this.http
      .get(this.check_uri, { headers: headers })
      .map(res => <any[]>res.json())
      .catch(this.handelError);
  }

  private handelError(error: Response | any) {
    let errMsg = (error.message) ? error.message :
      error.status ? error.status + " - " + error.statusText : 'Server error';
    return Observable.throw(error.status);
  }
}