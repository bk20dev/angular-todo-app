import { Component } from '@angular/core';
import { Task } from 'src/models/task';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent {
  pendingTasks: Task[] = [];
  completedTasks: Task[] = [];

  constructor(private taskService: TaskService) {
    taskService.tasks.subscribe((tasks) => {
      this.pendingTasks = tasks.filter((task) => task.status === 'pending');
      this.completedTasks = tasks.filter((task) => task.status === 'completed');
    });
  }

  markTaskCompleted(task: Task): void {
    this.taskService.updateTaskStatus(task, 'completed');
  }

  markTaskPending(task: Task): void {
    this.taskService.updateTaskStatus(task, 'pending');
  }

  deleteTask(task: Task): void {
    this.taskService.deleteTask(task);
  }
}
