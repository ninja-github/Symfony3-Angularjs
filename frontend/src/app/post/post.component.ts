import { Component, OnInit } from '@angular/core';
import { Post } from '../models/Post';
import { PostService } from '../services/post/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  posts: Post[] = [];
  errorMessage: string = '';
  constructor(private postService: PostService) { 
    // console.log(JSON.parse(localStorage.getItem('currentUser')).username);
  }

  post: Post;
  ngOnInit() {
    this.getPosts();
    // console.log('Post Init => ',this.post);
    
  }

  getPosts() {
    this.postService.getPosts().subscribe(
      posts => { 
        console.log('getPosts result => ', posts);
        this.posts = posts
      },      
      error => { this.errorMessage = <any>error }
    );
  }
  
  deletePost(id) {
    this.postService.deletePost(id).subscribe(
      result => { 
        window.location.reload();
        // this.errorMessage = result.message;
        console.log('deleted');
        
      },
      error => { 
        this.errorMessage = <any>error;
        console.log(this.errorMessage);
      }
    );
  }

}
