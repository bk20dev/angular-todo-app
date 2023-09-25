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

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  tasks: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>(initialTasks);

  constructor() {}
}
