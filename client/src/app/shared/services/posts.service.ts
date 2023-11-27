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

  getAll(): Observable<Post[]> {
    return this.http.get(`${environment.fireBaseDbUrl}/posts.json`).pipe(
      map((repsonse: { [key: string]: any }) => {
        return Object.keys(repsonse).map((key) => ({
          ...repsonse[key],
          id: key,
          date: new Date(repsonse[key].date),
        }));
      })
    );
  }

  getPostById(id: string): Observable<Post> {
    return this.http
      .get<Post>(`${environment.fireBaseDbUrl}/posts/${id}.json`)
      .pipe(
        map((post: Post) => {
          return { ...post, id: id, date: new Date(post.date) };
        })
      );
  }

  update(post: Post): Observable<Post> {
    return this.http.patch<Post>(
      `${environment.fireBaseDbUrl}/posts/${post.id}.json`,
      post
    );
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(
      `${environment.fireBaseDbUrl}/posts/${id}.json`
    );
  }
}
