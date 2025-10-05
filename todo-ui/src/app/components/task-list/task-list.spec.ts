import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TaskListComponent } from './task-list';
import { TaskService } from '../../services/task';
import { of, throwError } from 'rxjs';
import { Task } from '../../models/task';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let taskService: jasmine.SpyObj<TaskService>;

  beforeEach(async () => {
    const taskServiceSpy = jasmine.createSpyObj('TaskService', ['getTasks', 'completeTask']);

    await TestBed.configureTestingModule({
      imports: [TaskListComponent, HttpClientTestingModule],
      providers: [
        { provide: TaskService, useValue: taskServiceSpy }
      ]
    }).compileComponents();

    taskService = TestBed.inject(TaskService) as jasmine.SpyObj<TaskService>;
    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load tasks on init', (done) => {
    const mockTasks: Task[] = [
      { id: 1, title: 'Task 1', description: 'Desc 1', createdAt: new Date() }
    ];
    taskService.getTasks.and.returnValue(of(mockTasks));

    component.ngOnInit();

    expect(taskService.getTasks).toHaveBeenCalled();
    expect(component.tasks).toEqual(mockTasks);
    expect(component.loading).toBeFalse();
    done();
  });

  it('should handle error when loading tasks fails', (done) => {
    taskService.getTasks.and.returnValue(throwError(() => new Error('Error')));

    component.loadTasks();

    expect(component.error).toBe('Failed to load tasks');
    expect(component.loading).toBeFalse();
    done();
  });

  it('should complete task successfully', (done) => {
    const mockTask: Task = { 
      id: 1, 
      title: 'Task 1', 
      description: 'Desc 1', 
      createdAt: new Date()
    };
    component.tasks = [mockTask];
    taskService.completeTask.and.returnValue(of(void 0));

    component.onComplete(1);

    expect(taskService.completeTask).toHaveBeenCalledWith(1);
    expect(component.tasks.length).toBe(0);
    done();
  });

  it('should handle error when completing task fails', (done) => {
    taskService.completeTask.and.returnValue(throwError(() => new Error('Error')));

    component.onComplete(1);

    expect(component.error).toBe('Failed to complete task');
    done();
  });
});