import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
//added
import { HomeComponent } from './home/home.component';
import { PostComponent } from './post/post.component';
import { AddPostComponent } from './add-post/add-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { DeletePostComponent } from './delete-post/delete-post.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth/auth.service';
import { AuthGuard } from './guard/auth.guard';
import { PostService } from './services/post/post.service';
import { RouterModule } from '@angular/router';
import { routes } from './routes/routes';



@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    AddPostComponent,
    EditPostComponent,
    DeletePostComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [AuthService, PostService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
