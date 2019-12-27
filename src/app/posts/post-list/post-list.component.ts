import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

export class PostListComponent implements OnInit, OnDestroy {

  // posts = [
  //   { title: 'First Post', content: `This is second post's content`},
  //   { title: 'Second Post', content: `This is second post's content`},
  //   { title: 'Third Post', content: `This is third post's content`}
  // ];

  posts: Post[] = [];
  private postSub: Subscription;
  isLoading = false;
  constructor(public postsService: PostsService) { }

  ngOnInit() {
    this.isLoading = true;

    this.postsService.getPosts();
    this.postSub = this.postsService.getPostUpdateListner()
      .subscribe((posts: Post[]) => {
        this.isLoading = false;
        this.posts = posts;
      });
  }

  onDelete(id: string) {
    this.postsService.deletePost(id);
  }

  ngOnDestroy() {
    this.postSub.unsubscribe();
  }
}
