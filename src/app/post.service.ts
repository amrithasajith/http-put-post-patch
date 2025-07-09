import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, switchMap } from 'rxjs/operators';
import { throwError, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PostService {

  private baseUrl = 'http://localhost:3000/posts';

  constructor(private http: HttpClient) {}

  getPosts() {
    return this.http.get<any[]>(this.baseUrl).pipe(
      catchError(err => {
        console.error('Error fetching posts:', err);
        return throwError(() => err);
      })
    );
  }

  deletePost(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`).pipe(
      catchError(err => {
        console.error('Error deleting post:', err);
        return throwError(() => err);
      })
    );
  }

  updatePost(id: number, updatedPost: any) {
    // Full Update
    return this.http.put(`${this.baseUrl}/${id}`, updatedPost).pipe(
      catchError(err => {
        console.error('Error updating post:', err);
        return throwError(() => err);
      })
    );
  }

  patchPost(id: number, partialData: any) {
    // Partial Update
    return this.http.patch(`${this.baseUrl}/${id}`, partialData).pipe(
      catchError(err => {
        console.error('Error patching post:', err);
        return throwError(() => err);
      })
    );
  }

  // Example switchMap: get post details and then its author
  getPostWithAuthor(postId: number) {
    return this.http.get<any>(`${this.baseUrl}/${postId}`).pipe(
      switchMap(post =>
        this.http.get(`http://localhost:3000/users/${post.userId}`).pipe(
          catchError(err => {
            console.error('Error fetching author:', err);
            return throwError(() => err);
          })
        )
      )
    );
  }
}
