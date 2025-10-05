import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task';
import { CreateTask } from '../../models/task';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css'
})
export class TaskFormComponent {
  @Output() taskCreated = new EventEmitter<void>();

  task: CreateTask = {
    title: '',
    description: ''
  };

  submitting = false;
  error: string | null = null;

  constructor(private taskService: TaskService) { }

  onSubmit(): void {
    if (!this.task.title.trim() || !this.task.description.trim()) {
      this.error = 'Please fill in all fields';
      return;
    }

    this.submitting = true;
    this.error = null;
    this.taskService.createTask(this.task).subscribe({
      next: () => {
        this.task = { title: '', description: '' };
        this.submitting = false;
        this.taskCreated.emit();
      },
      error: (err) => {
        this.error = 'Failed to create task';
        this.submitting = false;
        console.error('Error creating task:', err);
      }
    });
  }
}