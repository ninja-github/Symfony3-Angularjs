import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../models/Post';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  title: string = '';
  description: string = '';
  public id: number;
  errors = [];
  // post: Post;
  // errorMessage: string = '';
  constructor(private router: Router, private route: ActivatedRoute, private postService: PostService) { 
    this.id = this.route.snapshot.params['id'];
    // console.log('id => ',this.id);

    // this.postService.getSelectedPost(this.id).subscribe(
    //   post => {
    //     this.post = post,
    //   },
    //   error => {
    //     this.errorMessage = <any>error
    //     console.log('error => ', this.errorMessage);

    //   }
    // );
    
  }

  ngOnInit() {
    
    // console.log('ini post => ',this.post);
  }

  
  editPost(title, description) {
    let post: any;
    post = { title: title, description: description };
    this.postService.updatePost(post, this.id).subscribe((result => {
      console.log('updeted');
      this.router.navigate(['/posts']);

    }), editError => this.errors = editError);

  }

}
