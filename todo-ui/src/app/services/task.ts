import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Task, CreateTask } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:7115/api/tasks'; // Make sure this matches your backend URL

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  createTask(task: CreateTask): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task)
      .pipe(
        catchError(this.handleError)
      );
  }

  completeTask(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/complete`, {})
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}