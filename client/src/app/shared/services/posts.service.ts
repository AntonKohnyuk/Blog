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
}
