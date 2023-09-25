import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Task } from 'src/models/task';

const initialTasks: Task[] = [
  { id: 'a', status: 'pending', title: 'A-p' },
  { id: 'b', status: 'pending', title: 'C-p' },
  { id: 'c', status: 'pending', title: 'B-p' },
  { id: 'd', status: 'completed', title: 'D-p' },
  { id: 'e', status: 'completed', title: 'E-p' },
];
// prettier-ignore
const initialTasksMap: [string, Task][] =
  initialTasks.map((task) => [task.id, task]);

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly taskCollection: Map<string, Task>;
  tasks: BehaviorSubject<Task[]>;

  constructor() {
    this.taskCollection = new Map(initialTasksMap);
    this.tasks = new BehaviorSubject<Task[]>([]);
    this.emitTasks();
  }

  private emitTasks(): void {
    this.tasks.next([...this.taskCollection.values()]);
  }

  updateTask(task: Task): void {
    this.taskCollection.set(task.id, task);
    this.emitTasks();
  }

  updateTaskStatus(task: Task, status: Task['status']): void {
    this.updateTask({ ...task, status });
  }

  deleteTask(task: Task): void {
    this.taskCollection.delete(task.id);
    this.emitTasks();
  }
}
