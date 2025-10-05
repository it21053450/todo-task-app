import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskFormComponent } from './task-form/task-form';
import { TaskListComponent } from './task-list/task-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TaskFormComponent, TaskListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  @ViewChild(TaskListComponent) taskList!: TaskListComponent;

  title = 'Todo Task Application';

  onTaskCreated(): void {
    this.taskList.loadTasks();
  }
}