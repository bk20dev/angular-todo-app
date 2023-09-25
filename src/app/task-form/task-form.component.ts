import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'src/models/task';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
})
export class TaskFormComponent implements OnInit {
  private task: Task | undefined;
  taskTitle: string = '';

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const taskId = params.get('id');
      if (!taskId) return;

      this.task = this.taskService.getTask(taskId);

      if (this.task) this.loadTask(this.task);
      else this.clear();
    });
  }

  private loadTask(task: Task): void {
    this.taskTitle = task.title;
  }

  private clear(): void {
    this.task = undefined;
    this.taskTitle = '';
  }

  submit(): void {
    if (this.task) {
      const updatedTask: Task = { ...this.task, title: this.taskTitle };
      this.taskService.updateTask(updatedTask);
    } else {
      const newTask: Omit<Task, 'id'> = {
        title: this.taskTitle,
        status: 'pending',
      };
      this.taskService.createTask(newTask);
    }
    this.router.navigate(['']);
  }
}
