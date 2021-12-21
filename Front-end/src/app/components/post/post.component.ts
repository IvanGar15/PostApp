import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PostService } from 'src/app/services/post.service';
import { AuthService } from 'src/app/services/auth.service';
import { Post } from 'src/app/models/Post';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  posts$!: Observable<Post[]>;
  userId!: Pick<User, "id">;
  userName!: Pick<User, "user">;
  constructor(private postService: PostService, private authService: AuthService) {}

  ngOnInit(): void {
    this.posts$ = this.findAll();
    this.userId = this.authService.userId;
    this.userName = this.authService.userName;
  }

  findAll(): Observable<Post[]>{
    return this.postService.findAll();
  }

  createPost(): void {
    this.posts$ = this.findAll()
  }

  delete(postId: any): void{
    this.postService.deletePost(postId).subscribe(() => (this.posts$ = this.findAll()))
  }

}
