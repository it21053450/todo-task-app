import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css'
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  loading = false;
  error: string | null = null;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.loading = true;
    this.error = null;
    this.taskService.getTasks().subscribe({
      next: (data) => {
        this.tasks = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load tasks';
        this.loading = false;
        console.error('Error loading tasks:', err);
      }
    });
  }

  onComplete(id: number): void {
    this.taskService.completeTask(id).subscribe({
      next: () => {
        this.tasks = this.tasks.filter(task => task.id !== id);
      },
      error: (err) => {
        this.error = 'Failed to complete task';
        console.error('Error completing task:', err);
      }
    });
  }
}