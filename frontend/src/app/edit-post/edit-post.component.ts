import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../models/Post';
import { PostComponent } from '../post/post.component';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  errors = [];
  post: Post = {
    id: 0,
    title: '',
    description: ''
  };

  errorMessage: string = '';
  successMessage: string = null;
  Updated:boolean =false;

  constructor(private router: Router, private route: ActivatedRoute, private postService: PostService) { 
    this.post.id = this.route.snapshot.params['id'];
  }

  ngOnInit() {
   this.postService.getSelectedPost(this.post.id)
   .subscribe(
      post => {
        this.post = post
        console.log('post => ', this.post);
      },
      error => {
        this.errorMessage = <any>error
        console.log('error => ', this.errorMessage);
      }
    );
  }

  editPost(post:Post) {
    this.postService.updatePost(post, post.id).subscribe(
      result => {
        this.successMessage = result.message;
        this.Updated =true;
        console.log('result => ', this.successMessage);

      // this.router.navigate(['/posts']);

    }, editError => this.errors = editError);

  }

}
