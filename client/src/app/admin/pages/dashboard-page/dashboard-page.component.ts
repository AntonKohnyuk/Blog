import { Component, OnDestroy, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/shared/interfaces/interfaces';
import { PostsService } from 'src/app/shared/services/posts.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  public posts: Post[] = [];
  private postServiceSubG!: Subscription;
  private postServiceSubD!: Subscription;

  public sortedData!: Post[];
  public search = '';
  constructor(private postsServices: PostsService) {}

  ngOnInit(): void {
    this.postServiceSubG = this.postsServices.getAll().subscribe((posts) => {
      this.posts = posts;
      this.sortedData = this.posts.slice();
    });
  }

  ngOnDestroy() {
    if (this.postServiceSubG) this.postServiceSubG.unsubscribe();
    if (this.postServiceSubD) this.postServiceSubD.unsubscribe();
  }

  remove(postId: string) {
    this.postServiceSubD = this.postsServices.remove(postId).subscribe(() => {
      this.sortedData = this.sortedData.filter((post) => post.id !== postId);
    });
  }

  sortData(sort: Sort) {
    const data = this.posts.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'author':
          return compare(a.author, b.author, isAsc);
        case 'title':
          return compare(a.title, b.title, isAsc);
        case 'date':
          return compare(a.date.getTime(), b.date.getTime(), isAsc);
        default:
          return 0;
      }
    });

    function compare(a: number | string, b: number | string, isAsc: boolean) {
      return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }
  }
}
