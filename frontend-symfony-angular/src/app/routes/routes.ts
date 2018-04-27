import { Routes } from "@angular/router";
import { HomeComponent } from "../home/home.component";
import { LoginComponent } from "../login/login.component";
import { PostComponent } from "../post/post.component";
import { AddPostComponent } from "../add-post/add-post.component";
import { EditPostComponent } from "../edit-post/edit-post.component";
import { DeletePostComponent } from "../delete-post/delete-post.component";
import { AuthGuard } from "../guard/auth.guard";


export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'posts', component: PostComponent, canActivate: [AuthGuard] },
    { path: 'add-post', component: AddPostComponent, canActivate: [AuthGuard] },
    { path: 'edit-post', component: EditPostComponent, canActivate: [AuthGuard] },
    { path: 'delete-post', component: DeletePostComponent, canActivate: [AuthGuard] },
];