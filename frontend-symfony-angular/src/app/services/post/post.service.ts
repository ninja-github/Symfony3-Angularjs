import { Injectable } from '@angular/core';
// added
import { Http, Response, Headers } from '@angular/http';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs/Observable';
import { Post } from '../../models/Post';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';


@Injectable()
export class PostService {

  private uri = 'http://127.0.0.1:8000/api/posts';


  constructor(private http: Http, private authenticationService: AuthService) { }

  getPosts(): Observable<any[]> {
    const headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
    return this.http
          .get(this.uri, { headers: headers })
          .map(res => <Post[]>res.json())
          .catch(this.handelError);
  }

  addPost(post: Post) {
    const headers = new Headers();
    headers.append('content-type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.authenticationService.token);
    return this.http
          .post(this.uri, JSON.stringify(post), { headers: headers })
          .map(res => res.json())
          .catch(this.handelError);
  }



  updatePost(post: Post, id) {
    const headers = new Headers();
    headers.append('content-type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.authenticationService.token);
    return this.http
          .put(this.uri + '/' + id, JSON.stringify(post), { headers: headers })
          .map(res => res.json())
          .catch(this.handelError);
  }


  deletePost(id: any) {
    const headers = new Headers();
    headers.append('Authorization', 'Bearer ' + this.authenticationService.token);
    return this.http
          .delete(this.uri + '/' + id, { headers: headers })
          .map(res => res.json());
  }


  private handelError(error: Response) {
    return Observable.throw(error.json().errors || 'server error');
  }

}
