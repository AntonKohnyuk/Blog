import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from 'src/app/shared/interfaces/interfaces';
import { PostsService } from 'src/app/shared/services/posts.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  public posts$!: Observable<Post[]>;

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.posts$ = this.postsService.getAll();
  }

  trackByFn(index, item: Post) {
    return item!.id + item.title + item.author;
  }
}
