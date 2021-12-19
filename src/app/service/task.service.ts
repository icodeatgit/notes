import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { List } from '../models/list.model';
import { Task } from '../models/task.model';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private webRequestService: WebRequestService) { }

  getLists(): Observable<Object> {
    debugger;
    return this.webRequestService.get(`lists`);
  }

  createList(title: string): Observable<List> {
    return this.webRequestService.post(`lists`, { title });
  }

  getTasks(listId: string): Observable<Object> {
    debugger;
    return this.webRequestService.get(`lists/${listId}/tasks`);
  }

  createTask(title: string, listId: string): Observable<Task> {
    return this.webRequestService.postTask(`lists/${listId}/tasks`, { title });
  }

}
