import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Post } from 'src/app/shared/interfaces/interfaces';
import { PostsService } from 'src/app/shared/services/posts.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  public posts: Post[] = [];
  private postServiceSub!: Subscription;

  constructor(private postsServices: PostsService) {}

  ngOnInit(): void {
    this.postServiceSub = this.postsServices.getAll().subscribe((posts) => {
      this.posts = posts;
    });
  }

  ngOnDestroy() {
    if (this.postServiceSub) this.postServiceSub.unsubscribe();
  }

  remove(postId: string) {
    throw new Error('Method not implemented.');
  }
}
