import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { List } from '../models/list.model';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class WebRequestService {

  constructor(private http: HttpClient) { }

  get(uri: string) {
    return this.http.get(`${environment.ROOT_URL}/${uri}`);
  }

  post(uri:string, payload: object): Observable<List> {
    return this.http.post<List>(`${environment.ROOT_URL}/${uri}`,payload);
  }

  patch(uri:string, payload: object) {
    return this.http.patch(`${environment.ROOT_URL}/${uri}`,payload);
  }

  delete(uri: string) {
    return this.http.delete(`${environment.ROOT_URL}/${uri}`);
  }

  postTask(uri:string, payload: object): Observable<Task> {
    return this.http.post<Task>(`${environment.ROOT_URL}/${uri}`,payload);
  }
}
