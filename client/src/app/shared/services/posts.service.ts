import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { FbCreateResponse, Post } from '../interfaces/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient) {}

  create(post: Post): Observable<Post> {
    return this.http
      .post<any>(`${environment.fireBaseDbUrl}/posts.json`, post)
      .pipe(
        map((response: FbCreateResponse) => {
          return { ...post, id: response.name, date: new Date(post.date) };
        })
      );
  }
}
