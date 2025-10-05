import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TaskFormComponent } from './task-form';
import { TaskService } from '../../services/task';
import { of, throwError } from 'rxjs';
import { CreateTask, Task } from '../../models/task';

describe('TaskFormComponent', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;
  let taskService: jasmine.SpyObj<TaskService>;

  beforeEach(async () => {
    const taskServiceSpy = jasmine.createSpyObj('TaskService', ['createTask']);

    await TestBed.configureTestingModule({
      imports: [TaskFormComponent, HttpClientTestingModule],
      providers: [
        { provide: TaskService, useValue: taskServiceSpy }
      ]
    }).compileComponents();

    taskService = TestBed.inject(TaskService) as jasmine.SpyObj<TaskService>;
    fixture = TestBed.createComponent(TaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show error when submitting empty form', () => {
    component.task = { title: '', description: '' } as CreateTask;
    component.onSubmit();
    expect(component.error).toBe('Please fill in all fields');
  });

  it('should create task successfully', (done) => {
    const mockTask: Task = { id: 1, title: 'Test', description: 'Test Desc', createdAt: new Date() };
    const newTask: CreateTask = { title: 'Test', description: 'Test Desc' };
    taskService.createTask.and.returnValue(of(mockTask));

    component.task = newTask;
    component.onSubmit();

    expect(taskService.createTask).toHaveBeenCalledWith(newTask);
    fixture.detectChanges();
    expect(component.task).toEqual({ title: '', description: '' });
    expect(component.submitting).toBeFalse();
    done();
  });

  it('should handle error when creating task fails', (done) => {
    taskService.createTask.and.returnValue(throwError(() => new Error('Error')));

    component.task = { title: 'Test', description: 'Test Desc' } as CreateTask;
    component.onSubmit();

    expect(component.error).toBe('Failed to create task');
    expect(component.submitting).toBeFalse();
    done();
  });
});