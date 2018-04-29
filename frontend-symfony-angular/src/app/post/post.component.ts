import { Component, OnInit } from '@angular/core';
import { Post } from '../models/Post';
import { PostService } from '../services/post/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  posts: Array<Post> = [];
  errorMessage: string = '';
  constructor(private _postService: PostService) { }

  
  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this._postService.getPosts().subscribe(
      posts => this.posts = posts,      
      error => this.errorMessage = <any>error
    );
  }
  
  deletePost(id) {
    this._postService.deletePost(id).subscribe(
      result => {
        window.location.reload();
      }
    );
  }

}
