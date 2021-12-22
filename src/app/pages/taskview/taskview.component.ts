import { Component, HostListener, OnInit, PipeTransform } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { List } from 'src/app/models/list.model';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/service/task.service';

@Component({
  selector: 'app-taskview',
  templateUrl: './taskview.component.html',
  styleUrls: ['./taskview.component.scss']
})
export class TaskviewComponent implements OnInit {

  lists: List[] = [];
  tasks: Task[] = [];
  mobile: boolean = false;
  currentWindowWidth: number = 0;
  isModalActive: boolean = false;

  @HostListener('window:resize')
  onResize() {
    this.mobile = window.innerWidth <= 500 ? true : false;
  }

  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.mobile = window.innerWidth <= 500 ? true : false;
    this.route.params.subscribe((params: Params) => {
      if (params['listId'] !== undefined && params['listId'] !=='newtask') {
        this.taskService.getTasks(params['listId']).subscribe((tasks: Task[]) => {
          this.tasks = tasks;
        });
      }
    });

    this.taskService.getLists().subscribe((lists: List[]) => {
      this.lists = lists;
    });
  }

  onTaskClick(task: Task) {
    this.taskService.complete(task).subscribe(() => {
      task.completed = !task.completed;
      task.completed ? this.toastr.success('Task Completed') : this.toastr.error('Task incomplete');
    });
  }

  onListClick(listId: string) {
    this.taskService.getTasks(listId).subscribe((tasks: Task[]) => {
      this.tasks = tasks;
      this.tasks.length > 0 ? this.toggleModal() : this.toastr.info('There are no tasks to display');
    });
  }

  toggleModal() {
    this.isModalActive = !this.isModalActive;
  }

}
