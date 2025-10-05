import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TaskService } from './task';
import { Task, CreateTask } from '../models/task';

describe('TaskService', () => {
  let service: TaskService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TaskService]
    });
    service = TestBed.inject(TaskService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get tasks', (done) => {
    const mockTasks: Task[] = [
      { id: 1, title: 'Task 1', description: 'Description 1', createdAt: new Date() }
    ];

    service.getTasks().subscribe((tasks: Task[]) => {
      expect(tasks.length).toBe(1);
      expect(tasks).toEqual(mockTasks);
    });

    const req = httpMock.expectOne('http://localhost:5000/api/tasks');
    expect(req.request.method).toBe('GET');
    req.flush(mockTasks);
    done();
  });

  it('should create task', (done) => {
    const newTask: CreateTask = { title: 'New Task', description: 'New Description' };
    const createdTask: Task = { id: 1, ...newTask, createdAt: new Date() };

    service.createTask(newTask).subscribe((task: Task) => {
      expect(task).toEqual(createdTask);
    });

    const req = httpMock.expectOne('http://localhost:5000/api/tasks');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newTask);
    req.flush(createdTask);
    done();
  });

  it('should complete task', (done) => {
    const taskId = 1;

    service.completeTask(taskId).subscribe();

    const req = httpMock.expectOne(`http://localhost:5000/api/tasks/${taskId}/complete`);
    expect(req.request.method).toBe('PUT');
    req.flush({});
    done();
  });
});